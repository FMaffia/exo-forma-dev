package it.exolab.model.request;

import lombok.Data;

@Data
public class StepRequest {
    private String idProject;
    private int number;
    private String title;
    private String desc;
    private Boolean update;//per facilitarmi la richiesta di aggiunta o modifica
}
