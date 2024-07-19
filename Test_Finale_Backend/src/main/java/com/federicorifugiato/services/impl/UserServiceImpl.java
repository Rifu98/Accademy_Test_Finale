package com.federicorifugiato.services.impl;

import com.federicorifugiato.daos.UserDao;
import com.federicorifugiato.models.User;
import com.federicorifugiato.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

    @Override
    public User findById(Long id) {
        return userDao.findById(id).orElse(null);
    }

	@Override
	public User findByEmail(String email) {
		return userDao.findByEmail(email);
	}
}
