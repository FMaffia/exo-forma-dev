package it.exolab.access;

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
        Aggregation agg = Aggregation.newAggregation(ProjectCard.class,
                Aggregation.addFields()
                        .addField("stepsCount")
                        .withValueOf(
                                ArrayOperators.Size.lengthOfArray("steps")
                        ).build(),
                Aggregation
                        .project()
                        .andExclude("steps"));

        AggregationResults<ProjectCard> aggRes = mongoTemplate.aggregate(agg, Project.class, ProjectCard.class);
        return aggRes.getMappedResults();

    }

    public List<ProjectCard> findAllWithLastStep() {
        AddFieldsOperation stageAddIdString = Aggregation.addFields()
                .addField("idString")
                .withValue(ConvertOperators.ToString.toString("_id")).build();
        Aggregation agg = Aggregation.newAggregation(stageAddIdString);
        List<ProjectCard> a = mongoTemplate.aggregate(agg, Project.class, ProjectCard.class).getMappedResults();
        return a;
    }

    public Project getStepsByIdProject(String id) {
        Query q = new Query();
        q.addCriteria(Criteria.where("id").is(id));
        q.fields().include("steps.title");
        q.fields().include("steps.index");
        q.fields().include("steps.number");
        return mongoTemplate.findOne(q, Project.class);
    }


}
