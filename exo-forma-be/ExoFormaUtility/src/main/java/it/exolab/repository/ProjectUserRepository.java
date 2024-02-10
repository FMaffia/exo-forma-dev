package it.exolab.repository;

import it.exolab.model.ProjectUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProjectUserRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public ProjectUser getLastStep(String idProject, String idUser) {
        Query q = new Query();
        q.addCriteria(Criteria.where("idUser").is(idUser).and("idProject").is(idProject));
        q.fields().include("lastStep");
        return mongoTemplate.findOne(q, ProjectUser.class);
    }

    public List<ProjectUser> getProjectsByUser(String idUser) {
        Query q = new Query();
        q.fields().exclude("idUser");
        q.addCriteria(Criteria.where("idUser").is(idUser));
        return mongoTemplate.find(q, ProjectUser.class);
    }

    public ProjectUser updateLastStep(ProjectUser requestBody) {
        Query q = new Query();
        q.addCriteria((Criteria.where("idUser").is(requestBody.getIdUser()).and("idProject").is(requestBody.getIdProject())));
        ProjectUser docToUpdate = mongoTemplate.findOne(q, ProjectUser.class);
        if (Objects.isNull(docToUpdate)) {
            return mongoTemplate.save(requestBody);
        }
        if (requestBody.getLastStep() <= docToUpdate.getLastStep()) {
            docToUpdate.setLastStep(requestBody.getLastStep() + 1);
            return mongoTemplate.save(docToUpdate);
        }
        return null;
    }


}
