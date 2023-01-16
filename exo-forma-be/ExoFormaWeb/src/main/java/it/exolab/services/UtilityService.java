package it.exolab.services;

import it.exolab.access.UtilityRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/utility")
@Slf4j
public class UtilityService {

    @Autowired
    UtilityRepository utilityRepository;

    @GetMapping(ApiConstants.Utility.GET_ALL_CATEGORIES)
    public ResponseEntity<List<String>> getAllCategoriesProjects(){
        log.debug("------> GET ALL CATEGORIES FROM PROJECTS");
        List<String> allCategories = utilityRepository.getAllProjectCategories();
        return ResponseEntity.ok(allCategories);
    }

}
