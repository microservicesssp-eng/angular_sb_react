package com.example.simpleform.repository;

import com.example.simpleform.model.SimpleUser;
import org.springframework.data.repository.CrudRepository;

public interface SimpleUserRepository extends CrudRepository<SimpleUser, Long> {
}
