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

    @PostMapping("/check")
    public ResponseEntity receiveUser(@RequestBody User userInfo) {
        log.debug("-----> USER_SERVICES: check user:" + userInfo.getEmail() + " pass: " + userInfo.getPass());
        User found = this.userRepo.receiveUser(userInfo);
        if (Objects.isNull(found)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Non esiste nessun utente legato a queste informazioni");
        }
        return ResponseEntity.ok(this.userRepo.receiveUser(userInfo));
    }

   /* @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllProducts() {
        log.debug("-----> USER_SERVICES: GetAll");
        return ResponseEntity.ok(this.userRepo.findAll());
    }*/
    /*@PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(this.userRepo.save(user));
    }

    @PutMapping(value = "/update/{userId}")
    public ResponseEntity<User> update(@PathVariable String userId, @RequestBody User updatedUser) {
        return ResponseEntity.ok(this.userRepo.save(updatedUser));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity findUserByid(@PathVariable String id) {
        Optional<User> user = this.userRepo.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.ok("The product with id: " + id + " was not found.");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteUserById(@PathVariable String id) {
        Optional<User> user = this.userRepo.findById(id);
        if (user.isPresent()) {
            this.userRepo.deleteById(id);
            return ResponseEntity.ok("User with id " + id + " deleted.");
        } else {
            return ResponseEntity.ok("The product with id: " + id + " was not found.");
        }
    }
*/
}
