package it.exolab.access;

import it.exolab.aggregationoperations.CustomProjectAggregationOperation;
import it.exolab.model.ImageCover;
import it.exolab.model.Project;
import it.exolab.model.StepProject;
import it.exolab.model.request.StepRequest;
import it.exolab.model.view.ProjectCard;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class ProjectRepository {
    @Autowired
    MongoTemplate mongoTemplate;


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

    public List<ProjectCard> findAll(String idUser) {


        //escludiamo le cose non necessarie dal risultato
        ProjectionOperation projection = Aggregation.project().andExclude("userProject", "steps", "idString");

        ArrayList<AggregationOperation> pipelineOperations = new ArrayList<>(aggregateProjectJoins(idUser, true));
        pipelineOperations.add(projection);

        //assemblaggio, l'ordine è importante
        Aggregation agg = Aggregation.newAggregation(ProjectCard.class, pipelineOperations);


        AggregationResults<ProjectCard> aggRes = mongoTemplate.aggregate(agg, Project.class, ProjectCard.class);
        return aggRes.getMappedResults();
    }


    public ProjectCard findProjectByPath(String path, String idUser) {


        //escludiamo le cose non necessarie dal risultato
        ProjectionOperation projection = Aggregation.project().andExclude("userProject", "steps", "idString");
        MatchOperation matchOperation = Aggregation.match(Criteria.where("path").is(path));


        ArrayList<AggregationOperation> pipelineOperations = new ArrayList<>();
        pipelineOperations.add(matchOperation);
        pipelineOperations.addAll(aggregateProjectJoins(idUser, true));
        pipelineOperations.add(projection);

        //assemblaggio, l'ordine è importante
        Aggregation agg = Aggregation.newAggregation(ProjectCard.class, pipelineOperations);


        AggregationResults<ProjectCard> aggRes = mongoTemplate.aggregate(agg, Project.class, ProjectCard.class);
        return aggRes.getUniqueMappedResult();
    }

    public Project getStepsByIdProject(String id, String idUser) {
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
        ProjectionOperation projection2 = Aggregation.project().andExclude("lastStep", "steps.desc");
        //escludiamo la desc
        UnsetOperation unsetOperation = UnsetOperation.unset("steps.desc");
        pipelineOperations.add(projection2);
        pipelineOperations.add(unsetOperation);
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


    public Project getProjectById(Project project) {
        if (Objects.isNull(project.getId())) {
            return this.mongoTemplate.insert(new Project());
        }
        return this.mongoTemplate.findById(new ObjectId(project.getId()), Project.class);
    }

    public Project save(Project project) {
        project.setPath(project.getTitle().replace(" ", ""));
        return this.mongoTemplate.save(project);
    }

    public void addImage(ImageCover image) {
        Query query = new Query(new Criteria("id").is(new ObjectId(image.getId())));
        Update update = new Update().set("image", image.getImage());
        this.mongoTemplate.updateFirst(query, update, Project.class);
    }

    public void saveStep(StepRequest stepRequest) {
        Query query = new Query(new Criteria("id").is(new ObjectId(stepRequest.getIdProject())));
        StepProject stepToUpdated = new StepProject(stepRequest);
        Update update;
        if (!stepRequest.getUpdate()) {
            update = new Update().push("steps", stepToUpdated);
        } else {
            query.addCriteria(new Criteria("steps.number").is(stepRequest.getNumber()));
            update = new Update().set("steps.$", stepToUpdated);
        }
        this.mongoTemplate.updateFirst(query, update, Project.class);
    }
}
