package it.exolab.model.view;

import it.exolab.model.StepProject;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class StepView implements Serializable {
    private int number;
    private int index;
    private String title;
    private boolean completed;

    public StepView(StepProject stepProject) {
        this.number = stepProject.getNumber();
        this.title = stepProject.getTitle();
    }

    public int getIndex() {
        return number - 1;
    }
}
