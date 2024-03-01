package it.exolab.model.view;

import lombok.Data;

import java.io.Serializable;

@Data
public class MyProjectCard extends ProjectCard implements Serializable {
    private static final long serialVersionUID = 7577726595813152947L;
    private int lastStep;
}
