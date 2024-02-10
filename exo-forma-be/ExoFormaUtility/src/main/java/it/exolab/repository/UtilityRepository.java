package it.exolab.repository;

import com.mongodb.client.DistinctIterable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UtilityRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<String> getAllProjectCategories() {
        //Eseguiamo una distinct sugli array di categorie di tutti i progetti
        DistinctIterable<String> categories = mongoTemplate.getCollection("projects")
                .distinct("categories", String.class);
        return StreamSupport.stream(categories.spliterator(), false).collect(Collectors.toList());
    }

}

