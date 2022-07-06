package it.exolab.model;

import it.exolab.model.view.StepView;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Document("projects")
@Data
public class Project implements Serializable {
    private static final long serialVersionUID = 1574006953815072972L;
    @Id
    private String id;
    private String title;
    private String desc;
    private String descBreve;
    private String path;
    private String creationDate;
    private String authors;
    private List<String> categories;
    private List<String> carousel;
    private int difficult;
    private int order;
    private String cover;
    private boolean published;
    private List<StepView> steps;

}
