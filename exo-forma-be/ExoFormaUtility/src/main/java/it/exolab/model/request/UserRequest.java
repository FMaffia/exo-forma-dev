package it.exolab.model.request;

import lombok.Data;

@Data
public class UserRequest {
    private String name;
    private String description;

    public UserRequest() {
    }

    public UserRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
