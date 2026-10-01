package com.example.simpleform.controller;

import com.example.simpleform.model.SimpleUser;
import com.example.simpleform.repository.SimpleUserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final SimpleUserRepository userRepository;

    public UserController(SimpleUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public SimpleUser createUser(@RequestBody SimpleUser user) {
        return userRepository.save(user);
    }
}
