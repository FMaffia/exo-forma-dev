package it.exolab.access;

import it.exolab.aggregationoperations.CustomProjectAggregationOperation;
import it.exolab.model.Project;
import it.exolab.model.view.ProjectCard;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ProjectRepository {
    @Autowired
    MongoTemplate mongoTemplate;

//    public List<ProjectCard> findAll() {
//        Query q = new Query();
//        q.fields().exclude("steps");
//        List<ProjectCard> result = mongoTemplate.find(q, ProjectCard.class);
//        //result.forEach(p -> p.setStepsCount(stepsCount(p.getId())));
//        return result;
//    }



    public List<ProjectCard> findAll() {

        String idUser = "62a85bce9512066fdab1bfb7";

        AddFieldsOperation stageAddIdString = Aggregation.addFields()
                .addField("idString")
                .withValue(ConvertOperators.ToString.toString("$_id"))
                .addField("stepsCount")
                .withValueOf(
                        ArrayOperators.Size.lengthOfArray("steps")
                ).build();
        CustomProjectAggregationOperation lookupOperation = new CustomProjectAggregationOperation(computeLookupJson(idUser));
        UnwindOperation unwindOperation = Aggregation.unwind("$userProject",true);
        AddFieldsOperation addLastStep = Aggregation.addFields().addField("lastStep").withValue("$userProject.lastStep").build();
        ProjectionOperation projection = Aggregation.project().andExclude("userProject","steps","idString");
        //userProject: 0,
        //  steps: 0,
        //  idString: 0

        Aggregation agg = Aggregation.newAggregation(ProjectCard.class,stageAddIdString, lookupOperation, unwindOperation, addLastStep, projection);


        AggregationResults<ProjectCard> aggRes = mongoTemplate.aggregate(agg, Project.class, ProjectCard.class);
        return aggRes.getMappedResults();
    }

    public Project getStepsByIdProject(String id) {
        Query q = new Query();
        q.addCriteria(Criteria.where("id").is(id));
        q.fields().include("steps.title");
        q.fields().include("steps.index");
        q.fields().include("steps.number");
        return mongoTemplate.findOne(q, Project.class);
    }

    private String computeLookupJson(String idUser){
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
                "         '"+idUser+"'\n" +
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

}
