package com.capstone.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.auth.entity.User;
import com.capstone.auth.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User findByUsername(String username) {
		return userRepository.findByUsername(username).get();
	}
	
}
