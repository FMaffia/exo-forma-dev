package it.exolab.repository;

import it.exolab.model.document.StepDocument;
import it.exolab.model.dto.StepDto;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class StepRepository {
    @Autowired
    MongoTemplate mongoTemplate;

    public StepDocument getStepById(String idString) {
        return this.mongoTemplate.findById(new ObjectId(idString), StepDocument.class);
    }

    public List<StepDocument> getStepsByIdProject(String idProject) {
        Query query = new Query(new Criteria("idProject").is(idProject));
        return this.mongoTemplate.find(query, StepDocument.class);
    }


    public StepDto updateStep(StepDto stepRequest) {
        Query query = new Query(new Criteria("_id").is(new ObjectId(stepRequest.getIdString())));
        stepRequest.setIdString(null);
        return this.mongoTemplate.findAndReplace(query, stepRequest);
    }

    public StepDto insertStep(StepDto stepRequest) {
        return this.mongoTemplate.save(stepRequest);
    }

}
