package com.federicorifugiato.services;

import com.federicorifugiato.dtos.UserLoginDTO;
import com.federicorifugiato.dtos.UserSignupDTO;
import com.federicorifugiato.models.User;

public interface AuthService {
	User signup(UserSignupDTO userSignupDTO);
	User login(UserLoginDTO userLoginDTO);
}
