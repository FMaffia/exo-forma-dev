package it.exolab.services;

import it.exolab.access.ProjectUserRepository;
import it.exolab.model.ProjectUser;
import it.exolab.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

import static it.exolab.services.ServerMessages.INTERNAL_SERVER_ERROR_MSG;
import static it.exolab.services.ServerMessages.SUCCESS_MSG;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/myProjects")
@Slf4j
public class ProjectUserService {
    @Autowired
    ProjectUserRepository projectUserRepository;

    @PostMapping
    public ResponseEntity<List<ProjectUser>> getMyProjects(@RequestBody User user) {
        log.debug("-----> MY_PROJECT_SERVICES: Get my projects by myId:" + user.getId());
        List<ProjectUser> myProjects = projectUserRepository.getProjectsByUser(user.getId());
        return ResponseEntity.ok(myProjects);
    }

    @PostMapping(ApiConstants.UserProject.UPDATE_LAST_STEP)
    public ResponseEntity updateLastStep(@RequestBody ProjectUser requestBody, Principal principal) {
        log.debug("-----> UPDATE LAST STEP: " + requestBody.getLastStep() + " ID PROJECT: " + requestBody.getIdProject());
        try {
            requestBody.setIdUser(principal.getName());
            ProjectUser updated = projectUserRepository.updateLastStep(requestBody);
            if (Objects.isNull(updated)) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(INTERNAL_SERVER_ERROR_MSG);
            }
            return ResponseEntity.ok(SUCCESS_MSG);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(INTERNAL_SERVER_ERROR_MSG);
        }
    }

}
