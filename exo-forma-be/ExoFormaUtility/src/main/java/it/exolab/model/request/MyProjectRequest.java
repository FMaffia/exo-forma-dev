package it.exolab.model.request;


import it.exolab.model.document.ProjectUserDocument;
import lombok.Data;

import java.io.Serializable;

@Data
public class MyProjectRequest extends ProjectUserDocument implements Serializable {
    private static final long serialVersionUID = 4331300602773518144L;


}
