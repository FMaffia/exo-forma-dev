package it.exolab.model.view;

import it.exolab.model.dto.StepDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@Data
public class StepView implements Serializable {
    String idString;
    private int order;
    private String title;

    public StepView(StepDto stepDto) {
        this.idString = stepDto.getIdString();
        this.order = stepDto.getOrder();
        this.title = stepDto.getTitle();
    }
}
