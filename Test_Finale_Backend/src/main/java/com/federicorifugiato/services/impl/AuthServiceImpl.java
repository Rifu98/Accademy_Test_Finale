package com.federicorifugiato.services.impl;

import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.federicorifugiato.daos.UserDao;
import com.federicorifugiato.dtos.UserLoginDTO;
import com.federicorifugiato.dtos.UserSignupDTO;
import com.federicorifugiato.models.User;
import com.federicorifugiato.services.AuthService;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    private UserDao userDao;

    private ModelMapper modelMapper = new ModelMapper();

    @Override
    public User signup(UserSignupDTO userSignupDTO) {
        User user = modelMapper.map(userSignupDTO, User.class);
        user.setPassword(DigestUtils.sha256Hex(userSignupDTO.getPassword()));
        user.setRuolo("USER");
        return userDao.save(user);
    }

    @Override
    public User login(UserLoginDTO userLoginDTO) {
        User user = userDao.findByEmail(userLoginDTO.getEmail());
        if (user != null && user.getPassword().equals(DigestUtils.sha256Hex(userLoginDTO.getPassword()))) {
            return user;
        }
        return null;
    
    }
}
