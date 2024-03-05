package it.exolab.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class Link implements Serializable {
    private String desc;
    private String link;
}
