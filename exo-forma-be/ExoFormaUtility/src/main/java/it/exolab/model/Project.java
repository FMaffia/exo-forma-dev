package it.exolab.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document("projects")
@Data
public class Project implements Serializable {
    private static final long serialVersionUID = 1574006953815072972L;
    @Id
    private String id;
    private String title;
    private String desc;
    private String summary;
    private String path;
    @JsonFormat(pattern = "dd/MM/yyyy - HH:mm:ss")
    private LocalDateTime creationDate = LocalDateTime.now();

    private String author;
    private List<String> categories = new ArrayList<>();
    private Integer difficult;
    private Boolean published;
    private String image;

    private List<StepProject> steps = new ArrayList<>();

}
