package it.exolab.repository;

import it.exolab.model.document.ProjectDocument;
import it.exolab.model.dto.StepDto;
import it.exolab.model.request.IdRequest;
import it.exolab.model.request.ProjectRequest;
import it.exolab.model.view.ProjectCard;
import it.exolab.model.view.StepView;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ProjectRepository {
    @Autowired
    MongoTemplate mongoTemplate;


    public List<ProjectCard> findAll() {
        return this.mongoTemplate.findAll(ProjectCard.class, "projects");
    }


    public ProjectDocument getProjectById(IdRequest project) {
        return this.mongoTemplate.findById(new ObjectId(project.getId()), ProjectDocument.class);
    }

    public ProjectDocument save(ProjectRequest project) {
        return this.mongoTemplate.save(project);
    }

    public ProjectDocument update(ProjectRequest project) {
        Query query = new Query(new Criteria("_id").is(new ObjectId(project.getIdString())));
        project.setIdString(null);
        return this.mongoTemplate.findAndReplace(query, project);
    }

    public void insertStep(StepDto stepRequest) {
        Query query = new Query(new Criteria("_id").is(new ObjectId(stepRequest.getIdProject())));
        Update update = new Update().push("steps", new StepView(stepRequest));
        this.mongoTemplate.updateFirst(query, update, ProjectDocument.class);

    }
}
