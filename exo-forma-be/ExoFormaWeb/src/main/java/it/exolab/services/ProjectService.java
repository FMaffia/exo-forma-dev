package it.exolab.services;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import it.exolab.access.ProjectRepository;
import it.exolab.access.ProjectUserRepository;
import it.exolab.model.ImageCover;
import it.exolab.model.Project;
import it.exolab.model.StepProject;
import it.exolab.model.request.StepRequest;
import it.exolab.model.view.ProjectCard;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/projects")
@Slf4j
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepo;
    @Autowired
    ProjectUserRepository projectUserRepository;
    @GetMapping(ApiConstants.Project.ALL_PROJECT)
    public ResponseEntity<List<ProjectCard>> getAll(Principal principal) {
        log.debug("-----> PROJECT_SERVICES: GetAll" + principal.getName());
        return ResponseEntity.ok(this.projectRepo.findAll(principal.getName()));
    }
    @PostMapping(ApiConstants.Project.PROJECT_BY_ID)
    public ResponseEntity<Project> getProjectById(@RequestBody Project project) {
        log.debug("-----> PROJECT_SERVICES: Get project by id");
        Project response = this.projectRepo.getProjectById(project);
        return ResponseEntity.ok(response);
    }

    @GetMapping(ApiConstants.Project.PROJECT_DETAILS)
    public ResponseEntity<ProjectCard> getProjectByPath(@PathVariable String path, Principal principal) {
        log.debug("-----> PROJECT_SERVICES: Get project by path: " + path);
        ProjectCard response = this.projectRepo.findProjectByPath(path, principal.getName());
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = ApiConstants.Project.GET_IMAGE, produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> getImageById(@PathVariable String id) {
        log.debug("-----> PROJECT_SERVICES: Get image by id: " + id);
        String prefix = "data:image/png;base64,";
        String imageBase64 = prefix + this.projectRepo.getImageProjectById(id);
        return ResponseEntity.ok(imageBase64);
    }

    @GetMapping(ApiConstants.Project.ALL_STEPS)
    public ResponseEntity<List<StepProject>> getSteps(@PathVariable String projectId, Principal principal) {
        log.debug("-----> PROJECT_SERVICES: Get steps by projectId:" + projectId);
        List<StepProject> stepsFull = this.projectRepo.getStepsByIdProject(projectId, principal.getName()).getSteps();
        return ResponseEntity.ok(stepsFull);
    }
    @Operation(summary = "Get steps by projectId")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tutto ok"),
            @ApiResponse(responseCode = "406", description = "Step o progetto non presente"),
    })

    @GetMapping(ApiConstants.Project.STEP_DETAILS)
    public ResponseEntity<StepProject> getStepByIndex(@PathVariable String projectId, @PathVariable int stepIndex, Principal principal) {
        log.debug("-----> PROJECT_SERVICES: Get steps by projectId:" + projectId);
        StepProject step = this.projectRepo.getStepByIndexAndIdProject(projectId, stepIndex);
        int lastStep = this.projectUserRepository.getLastStep(projectId, principal.getName()).getLastStep();
        step.setCompleted(stepIndex < lastStep);
        return ResponseEntity.ok(step);
    }


    @PostMapping(ApiConstants.Project.UPDATE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")//singolo ruolo
    public ResponseEntity<Project> save(@RequestBody Project project, Principal principal) {
        log.debug("-----> PROJECT_SERVICES: Save project id: " + project.getId());
        project.setAuthor(principal.getName());

        return ResponseEntity.ok(this.projectRepo.save(project));
    }

    @PostMapping(ApiConstants.Project.UPDATE_STEP)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Object> saveStep(@RequestBody StepRequest stepRequest) {
        log.debug("PROJECT_SERVICES: Aggiungi step al progetto: " + stepRequest.getIdProject());
        try {
            this.projectRepo.saveStep(stepRequest);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }

    @PostMapping(value = ApiConstants.Project.UPLOAD_IMAGE)
    public String addImage(@RequestBody ImageCover image) throws IOException {
        log.debug("-----> PROJECT_SERVICES: Upload image for project id " + image.getId());
        this.projectRepo.addImage(image);
        return "bravo";
    }
}
