package com.example.simpleform.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("simple_users")
public class SimpleUser {
    @Id
    private Long id;
    private String name;
    private String surname;

    public SimpleUser() {}

    public SimpleUser(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }
}
