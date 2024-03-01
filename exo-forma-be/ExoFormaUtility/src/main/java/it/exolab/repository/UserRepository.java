package it.exolab.repository;

import it.exolab.model.document.UserDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;


@Service
public class UserRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public UserDocument receiveUser(UserDocument userInfo) {
        Query q = new Query();
        q.addCriteria((Criteria.where("pass").is(userInfo.getPass()).and("email").is(userInfo.getEmail())));
        return mongoTemplate.findOne(q, UserDocument.class);
    }

}
