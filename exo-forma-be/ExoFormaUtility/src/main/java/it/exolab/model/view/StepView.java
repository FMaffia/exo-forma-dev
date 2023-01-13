package it.exolab.model.view;

import it.exolab.model.request.StepRequest;
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

    public StepView(StepRequest stepRequest) {
        this.number = stepRequest.getNumber();
        this.title = stepRequest.getTitle();
    }
}
