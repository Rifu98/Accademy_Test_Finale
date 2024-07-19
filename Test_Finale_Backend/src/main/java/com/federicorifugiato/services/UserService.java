package com.federicorifugiato.services;

import com.federicorifugiato.models.User;

public interface UserService {
    User findById(Long id);
    User findByEmail(String email);
}
