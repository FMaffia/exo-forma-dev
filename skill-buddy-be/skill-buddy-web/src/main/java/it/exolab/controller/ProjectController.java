package it.exolab.controller;

import io.swagger.v3.oas.annotations.Operation;
import it.exolab.model.dto.StepDto;
import it.exolab.model.request.IdRequest;
import it.exolab.model.request.ProjectRequest;
import it.exolab.services.ProjectService;
import it.exolab.services.StepService;
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
    private final StepService stepService;

    @GetMapping(ApiConstants.Project.ALL_PROJECT)
    @Operation(summary = "GET ALL PROJECT")
    public ResponseEntity<?> getAll() {
        return this.controlledResponse(this.projectService::findAll);
    }

    @PostMapping(ApiConstants.Project.PROJECT_BY_ID)
    @Operation(summary = "GET PROJECT BY ID")
    public ResponseEntity<?> getProjectById(@RequestBody IdRequest idRequest) {
        return this.controlledResponse(() -> this.projectService.getProjectById(idRequest));
    }

    @PostMapping(ApiConstants.Project.ALL_STEPS)
    @Operation(summary = "GET STEPS BY PROJECT ID")
    public ResponseEntity<?> getStepsByIdProject(@RequestBody IdRequest idRequest) {
        return this.controlledResponse(() -> this.stepService.getStepsByIdProject(idRequest.getId()));
    }

    @Operation(summary = "GET STEP BY  ID ")
    @PostMapping(ApiConstants.Project.STEP_DETAILS)
    public ResponseEntity<?> getStepById(@RequestBody IdRequest idRequest) {
        return this.controlledResponse(() -> this.stepService.getStepById(idRequest.getId()));
    }

    @PostMapping(ApiConstants.Project.UPDATE)
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")//singolo ruolo
    @Operation(summary = "UPDATE WHOLE PROJECT")
    public ResponseEntity<?> update(@RequestBody ProjectRequest project, Principal principal) {
        return this.controlledResponse(() -> (this.projectService.update(project, principal.getName())));
    }

    @PostMapping(ApiConstants.Project.INSERT)
    @Operation(summary = "INSERT NEW PROJECT")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")//singolo ruolo
    public ResponseEntity<?> insert(@RequestBody ProjectRequest project, Principal principal) {
        return this.controlledResponse(() -> this.projectService.save(project, principal.getName()));
    }

    @PostMapping(ApiConstants.Project.UPDATE_STEP)
    @Operation(summary = "UPDATE STEP BY ID")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateStep(@RequestBody StepDto stepRequest) {
        return this.controlledResponse(() -> this.stepService.updateStep(stepRequest));

    }

    @PostMapping(ApiConstants.Project.ADD_STEP)
    @Operation(summary = "ADD STEP TO PROJECT")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> addStep(@RequestBody StepDto stepRequest) {
        return this.controlledResponse(() -> this.stepService.insertStep(stepRequest));

    }
}
