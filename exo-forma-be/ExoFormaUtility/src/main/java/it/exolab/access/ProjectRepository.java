package it.exolab.access;

import it.exolab.aggregationoperations.CustomProjectAggregationOperation;
import it.exolab.model.Project;
import it.exolab.model.StepProject;
import it.exolab.model.view.ProjectCard;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class ProjectRepository {
    @Autowired
    MongoTemplate mongoTemplate;


    public Project getStepByIndexAndIdProject2(String projectId, int indexStep) {

        Query query = new Query()
                .addCriteria(Criteria.where("_id").is(projectId));
        query.fields().elemMatch("steps", Criteria.where("number").is(indexStep));

        return mongoTemplate.findOne(query, Project.class);
    }

    public StepProject getStepByIndexAndIdProject(String projectId, int indexStep) {
        MatchOperation matchOperation = Aggregation.match(Criteria.where("_id").is(projectId));

        ProjectionOperation projectionOperation = Aggregation.project()
                .andExclude("_id")
                .and(ArrayOperators.Filter.filter("steps")
                        .as("item")
                        .by(ComparisonOperators.valueOf("item.number").equalToValue(indexStep)))
                .as("steps");
        ReplaceRootOperation replaceRootOperation = Aggregation.replaceRoot(ArrayOperators.First.firstOf("steps"));


        Aggregation agg = Aggregation.newAggregation(Project.class, matchOperation, projectionOperation, replaceRootOperation);
        AggregationResults<StepProject> aggRes = mongoTemplate.aggregate(agg, Project.class, StepProject.class);
        return aggRes.getUniqueMappedResult();
    }

    public List<ProjectCard> findAll() {

        String idUser = "62a85bce9512066fdab1bfb7";

        //escludiamo le cose non necessarie dal risultato
        ProjectionOperation projection = Aggregation.project().andExclude("userProject", "steps", "idString");

        ArrayList<AggregationOperation> pipelineOperations = new ArrayList<>(aggregateProjectJoins(idUser, true));
        pipelineOperations.add(projection);

        //assemblaggio, l'ordine è importante
        Aggregation agg = Aggregation.newAggregation(ProjectCard.class, pipelineOperations);


        AggregationResults<ProjectCard> aggRes = mongoTemplate.aggregate(agg, Project.class, ProjectCard.class);
        return aggRes.getMappedResults();
    }

    public ProjectCard findProjectByPath(String path) {

        String idUser = "62a85bce9512066fdab1bfb7";

        //escludiamo le cose non necessarie dal risultato
        ProjectionOperation projection = Aggregation.project().andExclude("userProject", "steps", "idString");
        MatchOperation matchOperation = Aggregation.match(Criteria.where("path").is("/" + path));


        ArrayList<AggregationOperation> pipelineOperations = new ArrayList<>();
        pipelineOperations.add(matchOperation);
        pipelineOperations.addAll(aggregateProjectJoins(idUser, true));
        pipelineOperations.add(projection);

        //assemblaggio, l'ordine è importante
        Aggregation agg = Aggregation.newAggregation(ProjectCard.class, pipelineOperations);


        AggregationResults<ProjectCard> aggRes = mongoTemplate.aggregate(agg, Project.class, ProjectCard.class);
        return aggRes.getUniqueMappedResult();
    }

    public Project getStepsByIdProject(String id) {
        String idUser = "62a85bce9512066fdab1bfb7";
        ArrayList<AggregationOperation> pipelineOperations = new ArrayList<>();

        //prendiamo solo il progetto richiesto
        MatchOperation matchOperation = Aggregation.match(Criteria.where("_id").is(id));
        pipelineOperations.add(matchOperation);
        //aggiungiamo le pipeline comuni per la join con l'utente
        pipelineOperations.addAll(aggregateProjectJoins(idUser, false));
        //escludiamo le cose non necessarie dal risultato
        ProjectionOperation projection = Aggregation.project().andInclude("steps", "lastStep");
        pipelineOperations.add(projection);
        //aggiungiamo il mergesteps per calcolare se i singoli step sono completati
        pipelineOperations.add(new CustomProjectAggregationOperation(computeAddFieldMergeSteps()));
        //escludiamo lastStep perché nn ci serve più
        ProjectionOperation projection2 = Aggregation.project().andExclude("lastStep");
        pipelineOperations.add(projection2);

        //assemblaggio, l'ordine è importante
        Aggregation agg = Aggregation.newAggregation(pipelineOperations);

        AggregationResults<Project> aggRes = mongoTemplate.aggregate(agg, Project.class, Project.class);
        return aggRes.getUniqueMappedResult();
    }

    private List<AggregationOperation> aggregateProjectJoins(String idUser, boolean addStepsCount) {


        //aggiungiamo l'idString come campo per fare l'uguaglianza tra stringhe
        //aggiungiamo anche il totale degli step con un size
        AddFieldsOperation.AddFieldsOperationBuilder stageAddIdStringBuilder = Aggregation.addFields()
                .addField("idString")
                .withValue(ConvertOperators.ToString.toString("$_id"));
        if (addStepsCount) {
            stageAddIdStringBuilder.addField("stepsCount")
                    .withValueOf(
                            ArrayOperators.Size.lengthOfArray("steps")
                    );
        }
        AddFieldsOperation stageAddIdString = stageAddIdStringBuilder.build();

        //aggiungiamo tutto il json del lookup con pipeline non supportato dal template
        CustomProjectAggregationOperation lookupOperation = new CustomProjectAggregationOperation(computeLookupJson(idUser));
        //effettuiamo l'appiattimento del nuovo campo userProject
        UnwindOperation unwindOperation = Aggregation.unwind("$userProject", true);
        //ci prendiamo solo lastStep e lo mettiamo a primo livello
        AddFieldsOperation addLastStep = Aggregation.addFields().addField("lastStep").withValue("$userProject.lastStep").build();
        return Arrays.asList(stageAddIdString, lookupOperation, unwindOperation, addLastStep);
    }

    private String computeAddFieldMergeSteps() {
        return "{\n" +
                " $addFields: {\n" +
                "  steps: {\n" +
                "   $map: {\n" +
                "    input: '$steps',\n" +
                "    as: 'currStep',\n" +
                "    'in': {\n" +
                "     $mergeObjects: [\n" +
                "      '$$currStep',\n" +
                "      {\n" +
                "       completed: {\n" +
                "        $lt: [\n" +
                "         '$$currStep.number',\n" +
                "         '$lastStep'\n" +
                "        ]\n" +
                "       }\n" +
                "      }\n" +
                "     ]\n" +
                "    }\n" +
                "   }\n" +
                "  }\n" +
                " }\n" +
                "}";
    }

    private String computeLookupJson(String idUser) {
        return " {\n" +
                " $lookup: {\n" +
                "  from: 'projectsUsers',\n" +
                "  'let': {\n" +
                "   pid: '$idString'\n" +
                "  },\n" +
                "  pipeline: [\n" +
                "   {\n" +
                "    $match: {\n" +
                "     $expr: {\n" +
                "      $and: [\n" +
                "       {\n" +
                "        $eq: [\n" +
                "         '$idUser',\n" +
                "         '" + idUser + "'\n" +
                "        ]\n" +
                "       },\n" +
                "       {\n" +
                "        $eq: [\n" +
                "         '$idProject',\n" +
                "         '$$pid'\n" +
                "        ]\n" +
                "       }\n" +
                "      ]\n" +
                "     }\n" +
                "    }\n" +
                "   }\n" +
                "  ],\n" +
                "  as: 'userProject'\n" +
                " }\n" +
                "}";
    }

    public void insert(Project newProject) {
        this.mongoTemplate.insert(newProject);
    }
}
