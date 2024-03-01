package it.exolab.model.document;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Document(MongoConstants.Collections.STEPS)
public class StepDocument implements Serializable {
    private static final long serialVersionUID = 4898158370649371345L;
    @Id
    private ObjectId id;
    private String idProject;
    private int order;
    private String title;
    private String desc;

}
