package it.exolab.model.view;

import it.exolab.model.document.ProjectDocument;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Data
public class ProjectCard extends ProjectDocument implements Serializable {
    private static final long serialVersionUID = 1574006953815072972L;
    private String idString;
    private int stepsCount;


    public int getStepsCount() {
        if (Objects.nonNull(this.getSteps())) {
            return this.getSteps().size();
        }
        return 0;
    }

    public String getIdString() {
        if (Objects.nonNull(this.getId())) {
            return getId().toHexString();
        }
        return "";
    }
}
