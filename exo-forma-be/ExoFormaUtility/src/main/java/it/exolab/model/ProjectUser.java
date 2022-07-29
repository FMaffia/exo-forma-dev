package it.exolab.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document("projectsUsers")
@Data
public class ProjectUser implements Serializable {
    private static final long serialVersionUID = 4331300602773518144L;
    @Id
    private String id;
    private String idProject;
    private String idUser;
    //step's number not index
    int lastStep;

}
