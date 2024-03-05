package it.exolab.model.document;


import it.exolab.model.enums.Permissions;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@Document(MongoConstants.Collections.USERS)
public class UserDocument implements Serializable {
    private static final long serialVersionUID = 4331300602773518144L;
    @Id
    private String id;
    private String username;
    private String email;
    private String pass;
    private List<Permissions> permissions;
}
