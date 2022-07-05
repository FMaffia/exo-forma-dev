package it.exolab.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class Attachment implements Serializable {
    private static final long serialVersionUID = -5783711598319735696L;
    private Integer idDoc;
    private String nameFile;
    private String extension;
    private byte[] contents;


}
