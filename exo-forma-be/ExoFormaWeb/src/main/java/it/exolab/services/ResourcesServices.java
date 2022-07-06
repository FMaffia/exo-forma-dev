package it.exolab.services;

import it.exolab.access.ResourceRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping("/resources")
@Slf4j
public class ResourcesServices {

    private final String FOLDER_IMG_PATH = "D:/Sviluppo/Progetti/exo-forma-dev/covers/";

    @Autowired
    private ResourceRepository resourceRepo;


    @GetMapping(value = "/image/{pathImage}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody
    byte[] getImage(@PathVariable String pathImage) throws IOException {
        File file = new File(FOLDER_IMG_PATH + pathImage);
        try (FileInputStream fis = new FileInputStream(file)) {
            return IOUtils.toByteArray(fis);
        }
    }
}
