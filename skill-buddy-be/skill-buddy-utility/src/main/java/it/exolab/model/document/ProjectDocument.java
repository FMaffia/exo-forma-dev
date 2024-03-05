package it.exolab.model.document;

import com.fasterxml.jackson.annotation.JsonFormat;
import it.exolab.model.dto.Link;
import it.exolab.model.view.StepView;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(MongoConstants.Collections.PROJECTS)
public class ProjectDocument implements Serializable {
    private static final long serialVersionUID = 1574006953815072972L;
    @Id
    private ObjectId id;
    private String title;
    private String desc;
    private String summary;
    @JsonFormat(pattern = "dd/MM/yyyy - HH:mm:ss")
    private LocalDateTime creationDate = LocalDateTime.now();
    private String author;
    private List<String> categories = new ArrayList<>();
    private Integer difficult;
    private Boolean published;
    private String cover;
    private List<StepView> steps = new ArrayList<>();

    private List<Link> resources = new ArrayList<>();


}
