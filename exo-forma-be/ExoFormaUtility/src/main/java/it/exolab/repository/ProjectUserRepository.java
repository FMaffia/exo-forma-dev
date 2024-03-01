package it.exolab.repository;

import it.exolab.model.document.ProjectUserDocument;
import it.exolab.model.request.MyProjectRequest;
import it.exolab.model.view.MyProjectCard;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectUserRepository {

    @Autowired
    MongoTemplate mongoTemplate;


    public List<MyProjectCard> getProjectsByUser(String idUser) {
        MatchOperation matchOperation = new MatchOperation(Criteria.where("idUser").is(idUser));
        AddFieldsOperation addFieldsOperation = Aggregation.addFields().addFieldWithValueOf("idProjectObj",
                ConvertOperators.ToObjectId.toObjectId("$idProject")).build();
        LookupOperation lookupOperation = LookupOperation.newLookup().
                from("projects").
                localField("idProjectObj").
                foreignField("_id").as("result");
        UnwindOperation unwindOperation = Aggregation.unwind("result", true);
        AddFieldsOperation addFieldsOperation2 = Aggregation.addFields().addField("result.lastStep").withValue("$lastStep").build();

//TODO
        ReplaceRootOperation replaceRootOperation = Aggregation.replaceRoot("$$ROOT.result");
        Aggregation aggregation = Aggregation.newAggregation(matchOperation, addFieldsOperation, lookupOperation, unwindOperation, addFieldsOperation2, replaceRootOperation);
        return mongoTemplate.aggregate(aggregation, ProjectUserDocument.class, MyProjectCard.class).getMappedResults();
    }

    public long updateLastStep(ProjectUserDocument requestBody) {
        Query q = new Query();
        q.addCriteria((Criteria.where("idUser").is(requestBody.getIdUser()).and("_id").is(new ObjectId(requestBody.getId()))));
        Update update = new Update().set("lastStep", requestBody.getLastStep());
        return this.mongoTemplate.updateFirst(q, update, ProjectUserDocument.class).getModifiedCount();
    }


    public ProjectUserDocument insertMyProject(MyProjectRequest project) {
        return this.mongoTemplate.save(project);
    }

}
