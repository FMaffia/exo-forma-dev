package it.exolab.controller;

import io.swagger.v3.oas.annotations.Operation;
import it.exolab.model.request.MyProjectRequest;
import it.exolab.services.ProjectUserService;
import it.exolab.utility.ApiConstants;
import it.exolab.utility.ControlledRestResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping(ApiConstants.UserProject.BASE)
@Slf4j
@RequiredArgsConstructor
public class ProjectUserController extends ControlledRestResponse {
    private final ProjectUserService projectUserService;

    @GetMapping
    @Operation(summary = "GET MY PROJECTS")
    public ResponseEntity<?> getMyProjects(Principal principal) {
        return this.controlledResponse(() -> projectUserService.getProjectsByUser(principal.getName()));
    }

    @Operation(summary = "START PROJECT")
    @PostMapping(ApiConstants.UserProject.START_PROJECT)
    public ResponseEntity<?> startProject(@RequestBody MyProjectRequest requestBody, Principal principal) {
        //requestBody.setIdUser(principal.getName());
        requestBody.setIdUser("editor@test.it");
        return this.controlledResponse(() -> projectUserService.startProject(requestBody));
    }

    @Operation(summary = "UPDATE LAST STEP")
    @PostMapping(ApiConstants.UserProject.UPDATE_LAST_STEP)
    public ResponseEntity<?> updateLastStep(@RequestBody MyProjectRequest requestBody, Principal principal) {
        //requestBody.setIdUser(principal.getName());
        requestBody.setIdUser("editor@test.it");
        return this.controlledResponse(() -> projectUserService.updateLastStep(requestBody));
    }
}
