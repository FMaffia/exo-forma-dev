package it.exolab.model;


import it.exolab.model.view.StepView;
import lombok.Data;

import java.io.Serializable;

@Data
public class StepProject extends StepView implements Serializable {

    private static final long serialVersionUID = 4898158370649371345L;

    private String desc;
    private String link;
    private Attachment attachment;
}
