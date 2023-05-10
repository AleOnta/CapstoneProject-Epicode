package com.capstone.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capstone.auth.entity.User;
import com.capstone.auth.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public String updateUser(User user) {
		
		User foundUser = findById(user.getId());
		if (userRepository.existsByEmail(user.getEmail()) && user.getId() != foundUser.getId()) {
		
			log.warn("User with email: {" + user.getEmail() + "} already exists on database");
			throw new EntityExistsException("User with email: {" + user.getEmail() + "} already exists on database");
		
		} else if (userRepository.existsByUsername(user.getUsername()) && user.getId() != foundUser.getId()) {
			
			log.warn("User with email: {" + user.getEmail() + "} already exists on database");
			throw new EntityExistsException("User with email: {" + user.getEmail() + "} already exists on database");
		}

		userRepository.save(user);
		log.info("User with id: {" + user.getId() + "} correctly updated on database.");
		return "User with id: {" + user.getId() + "} correctly updated on database.";
	}
	
	public void deleteUserById(Long id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
			log.info("Related Auth user correctly deleted.");
		} else {
			log.warn("Cannot delete Auth user with ID: {" + id + "} because it doesn't exists.");
		}
	}
	
	public User findByUsername(String username) {
		return userRepository.findByUsername(username).get();
	}
	
	public User findById(Long id) {
		return userRepository.findById(id).get();
	}
	
	
}
