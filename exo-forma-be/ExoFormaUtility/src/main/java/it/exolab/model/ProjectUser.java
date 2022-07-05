package it.exolab.model;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document("projectsUsers")
@Data
public class ProjectUser implements Serializable {
    private static final long serialVersionUID = 4331300602773518144L;

    private String idProject;
    //step's number not index
    int lastStep;

}
