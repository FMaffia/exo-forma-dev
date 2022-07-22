package it.exolab.model.view;

import it.exolab.model.StepProject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class StepView implements Serializable {
    private static final long serialVersionUID = 292572689817176123L;
    private int number;
    private String title;
    private boolean completed;

    public StepView(StepProject stepProject) {
        this.number = stepProject.getNumber();
        this.title = stepProject.getTitle();
    }
}
