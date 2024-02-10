package it.exolab.controller;

import io.swagger.v3.oas.annotations.Operation;
import it.exolab.model.ProjectUser;
import it.exolab.model.User;
import it.exolab.services.ProjectUserService;
import it.exolab.utility.ApiConstants;
import it.exolab.utility.ControlledRestResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(ApiConstants.UserProject.BASE)
@Slf4j
@RequiredArgsConstructor
public class ProjectUserController extends ControlledRestResponse {
    private final ProjectUserService projectUserService;

    @PostMapping
    @Operation(summary = "GET MY PROJECTS")
    public ResponseEntity<?> getMyProjects(@RequestBody User user) {
        return this.controlledResponse(() -> projectUserService.getProjectsByUser(user.getId()));
    }

    @Operation(summary = "UPDATE LAST STEP")
    @PostMapping(ApiConstants.UserProject.UPDATE_LAST_STEP)
    public ResponseEntity<?> updateLastStep(@RequestBody ProjectUser requestBody, Principal principal) {
        return this.controlledResponse(() -> projectUserService.updateLastStep(requestBody, principal.getName()));
    }

}
