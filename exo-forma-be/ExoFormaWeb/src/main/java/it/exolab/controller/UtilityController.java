package it.exolab.controller;

import it.exolab.services.UtilityService;
import it.exolab.utility.ApiConstants;
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
@RequestMapping(ApiConstants.Utility.BASE)
@Slf4j
public class UtilityController {

    @Autowired
    UtilityService utilityService;

    @GetMapping(ApiConstants.Utility.GET_ALL_CATEGORIES)
    public ResponseEntity<List<String>> getAllCategoriesProjects() {
        try {
            List<String> allCategories = utilityService.getAllProjectCategories();
            return ResponseEntity.ok(allCategories);
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
