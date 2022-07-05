package it.exolab.services;

import it.exolab.access.ProjectRepository;
import it.exolab.model.StepProject;
import it.exolab.model.view.ProjectCard;
import it.exolab.model.view.StepView;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/projects")
@Slf4j
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepo;

    @GetMapping("/test")
    public ResponseEntity<List<ProjectCard>> getTest() {
        log.debug("-----> PROJECT_SERVICES: GetTest");
        return ResponseEntity.ok(this.projectRepo.findAllWithLastStep());
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProjectCard>> getAll() {
        log.debug("-----> PROJECT_SERVICES: GetAll");
        return ResponseEntity.ok(this.projectRepo.findAll());
    }

    @GetMapping(value = "/getSteps/{projectId}")
    public ResponseEntity<List<StepView>> getSteps(@PathVariable String projectId) {
        log.debug("-----> PROJECT_SERVICES: Get steps by projectId:" + projectId);
        List<StepView> stepsFull = this.projectRepo.getStepsByIdProject(projectId).getSteps();
        stepsFull.forEach(s -> s.setCompleted(s.getIndex() < 5));
        return ResponseEntity.ok(stepsFull);
    }

    @GetMapping(value = "/getStep/{projectId}/step/{stepIndex}")
    public ResponseEntity<StepProject> getStepByIndex(@PathVariable String projectId, @PathVariable int stepIndex) {
/*
        log.debug("-----> PROJECT_SERVICES: Get step: " + stepIndex + "by projectId:" + projectId);
        List<StepProject> stepsFull = this.projectRepo.getStepsByIdProject(projectId).getSteps();
        return ResponseEntity.ok(stepsFull.get(stepIndex));
*/
        return null;
    }
}
