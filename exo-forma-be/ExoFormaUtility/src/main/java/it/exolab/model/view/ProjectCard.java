package it.exolab.model.view;

import it.exolab.model.Project;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document("projects")
public class ProjectCard extends Project implements Serializable {
    private static final long serialVersionUID = 1574006953815072972L;
    private int stepsCount;
    private int lastStep;
}
