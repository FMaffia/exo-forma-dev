package it.exolab.services;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import it.exolab.access.ProjectRepository;
import it.exolab.model.Project;
import it.exolab.model.StepProject;
import it.exolab.model.view.ProjectCard;
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

//    @GetMapping("/test")
//    public ResponseEntity<List<StepView>> getTest() {
//        log.debug("-----> PROJECT_SERVICES: GetTest");
//        return ResponseEntity.ok(this.projectRepo.getStepsByIdProject("62bcb592aa4ab15c340bdbbb").getSteps());
//    }

    @GetMapping(ApiConstants.Project.ALL_PROJECT)
    public ResponseEntity<List<ProjectCard>> getAll() {
        log.debug("-----> PROJECT_SERVICES: GetAll");
        return ResponseEntity.ok(this.projectRepo.findAll());
    }

    @GetMapping(ApiConstants.Project.PROJECT_DETAILS)
    public ResponseEntity<ProjectCard> getProjectByPath(@PathVariable String path) {
        log.debug("-----> PROJECT_SERVICES: Get project by path: " + path);
        ProjectCard response = this.projectRepo.findProjectByPath(path);
        return ResponseEntity.ok(response);
    }

    @GetMapping(ApiConstants.Project.ALL_STEPS)
    public ResponseEntity<List<StepProject>> getSteps(@PathVariable String projectId) {
        log.debug("-----> PROJECT_SERVICES: Get steps by projectId:" + projectId);
        List<StepProject> stepsFull = this.projectRepo.getStepsByIdProject(projectId).getSteps();
        return ResponseEntity.ok(stepsFull);
    }

    @Operation(summary = "Get steps by projectId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tutto ok"),
            @ApiResponse(responseCode = "406", description = "Step o progetto non presente"),
    })
    @GetMapping(ApiConstants.Project.STEP_DETAILS)
    public ResponseEntity<StepProject> getStepByIndex(@PathVariable String projectId, @PathVariable int stepIndex) {
        log.debug("-----> PROJECT_SERVICES: Get steps by projectId:" + projectId);
        StepProject step = this.projectRepo.getStepByIndexAndIdProject(projectId, stepIndex);
        return ResponseEntity.ok(step);
    }

    @PostMapping(ApiConstants.Project.INSERT)
    public ResponseEntity<String> insert(@RequestBody Project newProject) {
        this.projectRepo.insert(newProject);
        return ResponseEntity.ok("Il progetto è stato inserito correttamente");
    }


}
