package it.exolab.controller;

import io.swagger.v3.oas.annotations.Operation;
import it.exolab.model.Project;
import it.exolab.model.request.IdRequest;
import it.exolab.model.request.StepRequest;
import it.exolab.services.ProjectService;
import it.exolab.utility.ApiConstants;
import it.exolab.utility.ControlledRestResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(ApiConstants.Project.BASE)
public class ProjectController extends ControlledRestResponse {
    private final ProjectService projectService;

    @GetMapping(ApiConstants.Project.ALL_PROJECT)
    @Operation(summary = "GET ALL PROJECT")
    public ResponseEntity<?> getAll(Principal principal) {
        return this.controlledResponse(() -> this.projectService.findAll(principal.getName()));
    }

    @PostMapping(ApiConstants.Project.PROJECT_BY_ID)
    @Operation(summary = "GET PROJECT BY ID")
    public ResponseEntity<?> getProjectById(@RequestBody IdRequest idRequest) {
        return this.controlledResponse(() -> this.projectService.getProjectById(idRequest));
    }

    @PostMapping(ApiConstants.Project.ALL_STEPS)
    @Operation(summary = "GET STEPS BY PROJECT ID")
    public ResponseEntity<?> getStepsByIdProject(@RequestBody IdRequest idRequest, Principal principal) {
        return this.controlledResponse(() -> this.projectService.getStepsByIdProject(idRequest.getId(), principal.getName()));
    }

    @Operation(summary = "GET STEP BY PROJECT ID E INDEX")
    @PostMapping(ApiConstants.Project.STEP_DETAILS)
    public ResponseEntity<?> getStepByIndex(@RequestBody IdRequest idRequest, @PathVariable int stepIndex, Principal principal) {
        return this.controlledResponse(() -> this.projectService.getStepByIndexAndIdProject(idRequest.getId(), stepIndex, principal.getName()));
    }

    @PostMapping(ApiConstants.Project.UPDATE)
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")//singolo ruolo
    @Operation(summary = "UPDATE WHOLE PROJECT")
    public ResponseEntity<?> save(@RequestBody Project project, Principal principal) {
        return this.controlledResponse(() -> (this.projectService.save(project, principal.getName())));
    }

    @PostMapping(ApiConstants.Project.INSERT)
    @Operation(summary = "INSERT NEW PROJECT")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")//singolo ruolo
    public ResponseEntity<?> insert(@RequestBody Project project, Principal principal) {
        return this.controlledResponse(() -> this.projectService.save(project, principal.getName()));
    }

    @PostMapping(ApiConstants.Project.UPDATE_STEP)
    @Operation(summary = "UPDATE STEP BY PROJECT")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> saveStep(@RequestBody StepRequest stepRequest) {
        return this.controlledResponse(() -> this.projectService.saveStep(stepRequest));

    }
}
