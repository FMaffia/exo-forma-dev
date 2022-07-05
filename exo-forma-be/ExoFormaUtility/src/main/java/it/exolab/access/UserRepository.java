package it.exolab.access;

import it.exolab.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;


@Service
public class UserRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public User receiveUser(User userInfo) {
        Query q = new Query();
        q.addCriteria((Criteria.where("pass").is(userInfo.getPass()).and("email").is(userInfo.getEmail())));
        return mongoTemplate.findOne(q, User.class);
    }

}
