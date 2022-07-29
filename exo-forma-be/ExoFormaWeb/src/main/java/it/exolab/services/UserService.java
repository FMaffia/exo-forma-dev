package it.exolab.services;

import it.exolab.access.UserRepository;
import it.exolab.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepo;

    @PostMapping(ApiConstants.User.CHECK)
    public ResponseEntity receiveUser(@RequestBody User userInfo) {
        log.debug("-----> USER_SERVICES: check user:" + userInfo.getEmail() + " pass: " + userInfo.getPass());
        User found = this.userRepo.receiveUser(userInfo);
        if (Objects.isNull(found)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Non esiste nessun utente legato a queste informazioni");
        }
        return ResponseEntity.ok(this.userRepo.receiveUser(userInfo));
    }

}
