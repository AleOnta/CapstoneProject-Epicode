package com.capstone.main.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.auth.entity.ERole;
import com.capstone.auth.entity.User;
import com.capstone.auth.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping
	public ResponseEntity<List<User>> findAllUsers() {
		return new ResponseEntity<List<User>>(userService.findAllUsers(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> findUserById(@PathVariable Long id) {
		return new ResponseEntity<User>(userService.findUserById(id), HttpStatus.OK);
	}
	
	@GetMapping("/username/{username}")
	public ResponseEntity<User> findUserByUsername(@PathVariable String username) {
		return new ResponseEntity<User>(userService.findUserByUsername(username), HttpStatus.OK);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<User> findUserByEmail(@PathVariable String email) {
		return new ResponseEntity<User>(userService.findUserByEmail(email), HttpStatus.OK);
	}
	
	@GetMapping("/role/{role}")
	public ResponseEntity<List<User>> findUsersByRole(@PathVariable ERole role) {
		return new ResponseEntity<List<User>>(userService.findUsersByRole(role), HttpStatus.OK);
	}
	
	@GetMapping("/paged")
	public ResponseEntity<Page<User>> findAllUsers(Pageable pageable) {
		return new ResponseEntity<Page<User>>(userService.findAllUsersPaged(pageable), HttpStatus.OK);
	}
	
	@PutMapping
	public ResponseEntity<String> updateUser(@RequestBody User user) {
		return new ResponseEntity<String>(userService.updateUser(user), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> updateUser(@PathVariable Long id) {
		return new ResponseEntity<String>(userService.deleteUserById(id), HttpStatus.ACCEPTED);
	}
}
