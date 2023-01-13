package it.exolab.model;


import it.exolab.model.request.StepRequest;
import it.exolab.model.view.StepView;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class StepProject extends StepView implements Serializable {

    private static final long serialVersionUID = 4898158370649371345L;

    private String desc;
    private String link;
    private Attachment attachment;

    public StepProject(StepRequest stepRequest) {
        super(stepRequest);
        this.desc = stepRequest.getDesc();
    }

}
