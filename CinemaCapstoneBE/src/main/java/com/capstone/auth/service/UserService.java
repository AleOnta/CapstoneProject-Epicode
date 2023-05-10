package com.capstone.auth.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.capstone.auth.entity.ERole;
import com.capstone.auth.entity.Role;
import com.capstone.auth.entity.User;
import com.capstone.auth.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
	// user email must be unique!
	private void userEmailExists(String email) {
		
		log.warn("Email: {" + email + "} already exists in the system.");
		throw new EntityExistsException("Email: {" + email + "} already exists in the system.");
	}
	
	// user username must be unique!
	private void userUsernameExists(String username) {
		
		log.warn("Username: {" + username + "} already exists in the system.");
		throw new EntityExistsException("Username: {" + username + "} already exists in the system.");
	}	

	public String updateUser(User user) {
		
		User userFound = findUserById(user.getId());
		if (userRepository.existsByEmail(user.getEmail()) && userFound.getId() != user.getId()) {
		
			userEmailExists(user.getEmail());
		} else if (userRepository.existsByUsername(user.getUsername()) && userFound.getId() != user.getId()) {
			
			userUsernameExists(user.getUsername());
		}

		user.setCinemaPoints(userFound.getCinemaPoints());
		user.setRoles(userFound.getRoles());
		user.setTickets(userFound.getTickets());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		userRepository.save(user);
		log.info("User with id: {" + user.getId() + "} correctly updated on database.");
		return "User with id: {" + user.getId() + "} correctly updated on database.";
	}
	
	public String deleteUserById(Long id) {
		
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
			log.info("User with id: {" + id + "} correctly deleted from database.");
			return "User with id: {" + id + "} correctly deleted from database.";
		} else {
			log.warn("Cannot delete user with id: {" + id + "} because it doesn't exists.");
			throw new EntityNotFoundException("User with id: {" + id + "} doesn't exists on database.");
		}
	}
	
	public User findUserById(Long id) {
		return userRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("User with id: {" + id + "} doesn't exists on database."));
	}
	
	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email).orElseThrow(
				() -> new EntityNotFoundException("User with email: {" + email + "} doesn't exists on database."));
	}
	
	public User findUserByUsername(String username) {
		return userRepository.findByUsername(username).orElseThrow(
				() -> new EntityNotFoundException("User with username: {" + username + "} doesn't exists on database."));
	}
	
	public List<User> findAllUsers() {
		return (List<User>) userRepository.findAll();
	}

	public List<User> findUsersByBirthdate(LocalDate birthdate) {
		return (List<User>) userRepository.findByBirthdate(birthdate);
	}
	
	public List<User> findUsersByRole(ERole role) {
		
		List<User> usersByRole = new ArrayList<User>();
		List<User> allUsers = findAllUsers();
		allUsers.stream()
		.forEach(u -> {
			Set<Role> userRoles = u.getRoles();
			for (Role r : userRoles) {
				log.info(r.getRoleName().toString() + " " +role.toString());
				if (r.getRoleName().toString().equals(role.toString())) {
					usersByRole.add(u);
				}
			}
		});
		
		return usersByRole;
	}
	
	public Page<User> findAllUsersPaged(Pageable pageable) {
		return (Page<User>) userRepository.findAll(pageable);
	}
	
	
}
