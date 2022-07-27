package it.exolab.services;

import it.exolab.access.ProjectUserRepository;
import it.exolab.model.ProjectUser;
import it.exolab.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    
}
