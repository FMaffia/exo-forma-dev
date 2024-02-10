package it.exolab.controller;

import io.swagger.v3.oas.annotations.Operation;
import it.exolab.model.Project;
import it.exolab.model.StepProject;
import it.exolab.model.request.IdRequest;
import it.exolab.model.request.StepRequest;
import it.exolab.model.view.ProjectCard;
import it.exolab.services.ProjectService;
import it.exolab.utility.ApiConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(ApiConstants.Project.BASE)
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping(ApiConstants.Project.ALL_PROJECT)
    @Operation(summary = "GET ALL PROJECT")
    public ResponseEntity<List<ProjectCard>> getAll(Principal principal) {
        try {
            return ResponseEntity.ok(this.projectService.findAll(principal.getName()));
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(ApiConstants.Project.PROJECT_BY_ID)
    @Operation(summary = "GET PROJECT BY ID")
    public ResponseEntity<Project> getProjectById(@RequestBody IdRequest idRequest) {
        try {
            Project response = this.projectService.getProjectById(idRequest);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(ApiConstants.Project.ALL_STEPS)
    @Operation(summary = "GET STEPS BY PROJECT ID")
    public ResponseEntity<List<StepProject>> getStepsByIdProject(@RequestBody IdRequest idRequest, Principal principal) {
        try {
            List<StepProject> stepsFull = this.projectService.getStepsByIdProject(idRequest.getId(), principal.getName());
            return ResponseEntity.ok(stepsFull);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "GET STEP BY PROJECT ID E INDEX")
    @PostMapping(ApiConstants.Project.STEP_DETAILS)
    public ResponseEntity<StepProject> getStepByIndex(@RequestBody IdRequest idRequest, @PathVariable int stepIndex, Principal principal) {
        try {
            return ResponseEntity.ok(this.projectService.getStepByIndexAndIdProject(idRequest.getId(), stepIndex, principal.getName()));
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(ApiConstants.Project.UPDATE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")//singolo ruolo
    public ResponseEntity<Project> save(@RequestBody Project project, Principal principal) {
        try {
            return ResponseEntity.ok(this.projectService.save(project, principal.getName()));
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(ApiConstants.Project.INSERT)
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")//singolo ruolo
    public ResponseEntity<Project> insert(@RequestBody Project project, Principal principal) {
        try {
            project.setAuthor(principal.getName());
            return ResponseEntity.ok(this.projectService.save(project, principal.getName()));
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(ApiConstants.Project.UPDATE_STEP)
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> saveStep(@RequestBody StepRequest stepRequest) {
        try {
            this.projectService.saveStep(stepRequest);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }
}
