package it.exolab.controller;

import it.exolab.model.ProjectUser;
import it.exolab.model.User;
import it.exolab.services.ProjectUserService;
import it.exolab.utility.ApiConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(ApiConstants.UserProject.BASE)
@Slf4j
@RequiredArgsConstructor
public class ProjectUserController {

    private final ProjectUserService projectUserService;

    @PostMapping
    public ResponseEntity<List<ProjectUser>> getMyProjects(@RequestBody User user) {
        try {
            List<ProjectUser> myProjects = projectUserService.getProjectsByUser(user.getId());
            return ResponseEntity.ok(myProjects);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(ApiConstants.UserProject.UPDATE_LAST_STEP)
    public ResponseEntity<ProjectUser> updateLastStep(@RequestBody ProjectUser requestBody, Principal principal) {
        try {
            requestBody.setIdUser(principal.getName());
            ProjectUser updated = projectUserService.updateLastStep(requestBody);
            if (Objects.isNull(updated)) {
                return ResponseEntity.internalServerError().build();
            }
            return ResponseEntity.ok(updated);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
