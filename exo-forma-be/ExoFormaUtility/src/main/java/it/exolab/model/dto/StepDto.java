package it.exolab.model.dto;

import it.exolab.model.document.StepDocument;
import lombok.Data;

import java.io.Serializable;
import java.util.Objects;

@Data
public class StepDto extends StepDocument implements Serializable {
    private static final long serialVersionUID = -2721206361892054871L;
    String idString;

    public String getIdString() {
        if (Objects.nonNull(this.getId())) {
            return getId().toHexString();
        }
        return idString;
    }

}
