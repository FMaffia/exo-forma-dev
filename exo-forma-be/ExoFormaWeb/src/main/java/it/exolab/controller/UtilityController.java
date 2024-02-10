package it.exolab.controller;

import io.swagger.v3.oas.annotations.Operation;
import it.exolab.services.UtilityService;
import it.exolab.utility.ApiConstants;
import it.exolab.utility.ControlledRestResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiConstants.Utility.BASE)
@Slf4j
public class UtilityController extends ControlledRestResponse {

    @Autowired
    UtilityService utilityService;

    @Operation(summary = "GET ALL CATEGORY")
    @GetMapping(ApiConstants.Utility.GET_ALL_CATEGORIES)
    public ResponseEntity<?> getAllCategoriesProjects() {
        return this.controlledResponse(() -> utilityService.getAllProjectCategories());

    }

}
