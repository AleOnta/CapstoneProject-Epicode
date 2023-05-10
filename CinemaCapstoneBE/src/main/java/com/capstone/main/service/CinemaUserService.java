package com.capstone.main.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.capstone.auth.entity.User;
import com.capstone.auth.payload.RegisterDto;
import com.capstone.auth.service.AuthServiceImpl;
import com.capstone.auth.service.UserService;
import com.capstone.main.model.CinemaUser;
import com.capstone.main.repository.CinemaUserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CinemaUserService {

	@Autowired 
	private CinemaUserRepository userRepository;
	
	@Autowired
	private UserService userAuthService;
	
	@Autowired
	private AuthServiceImpl authService;
	
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
	
	private void userIdNotExisting(Long id) {
		
		log.warn("User with id: {" + id + "} doesn't exists on Database.");
		throw new EntityExistsException("User with id: {" + id + "} doesn't exists on database.");
	}
	
	public String persistUser(CinemaUser user) {
		
		if (userRepository.existsByEmail(user.getEmail())) {
			userEmailExists(user.getEmail());
		} else if (userRepository.existsByUsername(user.getUsername())) {
			userUsernameExists(user.getUsername());
		}
		
		RegisterDto registerDto = new RegisterDto(
				user.getFirstname(), 
				user.getLastname(),
				user.getUsername(), 
				user.getEmail(), 
				user.getPassword(), 
				null);
		
		authService.register(registerDto);
		
		User relatedUser = userAuthService.findByUsername(registerDto.getUsername());
		user.setRelatedUser(relatedUser);
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		user.setCinemaPoints(0);
		
		userRepository.save(user);
		log.info("User with username: {" + user.getUsername() + "} correctly persisted on database.");
		return "User with username: {" + user.getUsername() + "} correctly persisted on database.";
	}
	
	public String updateUser(CinemaUser user) {
		
		CinemaUser userFound = null;
		
		if (!userRepository.existsById(user.getId())) {
			userIdNotExisting(user.getId());
		} else if (userRepository.existsByEmail(user.getEmail())) {
			
			userFound = findUserByEmail(user.getEmail());
			
			if (user.getId() != userFound.getId()) {
				userEmailExists(user.getEmail());				
			}
		
		} else if (userRepository.existsByUsername(user.getUsername())) {
			
			userFound = findUserByUsername(user.getUsername());
			
			if (user.getId() != userFound.getId()) {
				userUsernameExists(user.getUsername());				
			}
		}

		CinemaUser currentUser = findUserById(user.getId());
		User relatedUser = currentUser.getRelatedUser();
		
		relatedUser.setFirstname(user.getFirstname());
		relatedUser.setLastname(user.getLastname());
		relatedUser.setUsername(user.getUsername());
		relatedUser.setEmail(user.getEmail());
		relatedUser.setPassword(passwordEncoder.encode(user.getPassword()));

		userAuthService.updateUser(relatedUser);
		
		relatedUser = userAuthService.findByUsername(user.getUsername());
		user.setRelatedUser(relatedUser);
		user.setCinemaPoints(currentUser.getCinemaPoints());
		
		userRepository.save(user);
		log.info("User with username: {" + user.getUsername() + "} correctly updated on database.");
		return "User with username: {" + user.getUsername() + "} correctly persisted on database.";
	}
	
	public String deleteUserById(Long id) {
		
		if (!userRepository.existsById(id)) {
			userIdNotExisting(id);
		}
		
		// retrieve cinema user to access at the related auth user
		CinemaUser user = findUserById(id);
		
		// delete the cinema user by id
		userRepository.deleteById(id);
		log.info("User with id: {" + id + "} correctly removed from database.");
		
		// delete the related auth user by id
		userAuthService.deleteUserById(user.getRelatedUser().getId());
		return "User with id: {" + id + "} correctly removed from database.";
	}
	
	public CinemaUser findUserById(Long id) {
		return userRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("User with id: {" + id + "} doesn't exists on database."));
	}
	
	public CinemaUser findUserByEmail(String email) {
		return userRepository.findByEmail(email).orElseThrow(
				() -> new EntityNotFoundException("User with email: {" + email + "} doesn't exists on database."));
	}
	
	public CinemaUser findUserByUsername(String username) {
		return userRepository.findByUsername(username).orElseThrow(
				() -> new EntityNotFoundException("User with username: {" + username + "} doesn't exists on database."));
	}
	
	public List<CinemaUser> findAllUser() {
		return (List<CinemaUser>) userRepository.findAll();
	}

	public List<CinemaUser> findUsersByBirthdate(LocalDate birthdate) {
		return (List<CinemaUser>) userRepository.findByBirthdate(birthdate);
	}
	
	public Page<CinemaUser> findAllUsersPaged(Pageable pageable) {
		return (Page<CinemaUser>) userRepository.findAllUsersPaged(pageable);
	}
}
