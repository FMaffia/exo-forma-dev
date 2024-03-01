package it.exolab.model.request;

import it.exolab.model.document.ProjectDocument;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProjectRequest extends ProjectDocument {
    private static final long serialVersionUID = -8157713500154440186L;
    private String idString;
}
