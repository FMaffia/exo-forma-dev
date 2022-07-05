package it.exolab.access;

import it.exolab.model.ProjectUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectUserRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<ProjectUser> getProjectsByUser(String idUser) {
        Query q = new Query();
        q.fields().exclude("idUser");
        q.addCriteria(Criteria.where("idUser").is(idUser));
        return mongoTemplate.find(q, ProjectUser.class);
    }

}
