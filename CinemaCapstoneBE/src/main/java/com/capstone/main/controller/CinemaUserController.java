package com.capstone.main.controller;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.main.model.CinemaUser;
import com.capstone.main.service.CinemaUserService;

@RestController
@RequestMapping("/api/c_users")
public class CinemaUserController {

	@Autowired
	private CinemaUserService userService;
	
	@GetMapping
	public ResponseEntity<List<CinemaUser>> findAllUsers() {
		return new ResponseEntity<List<CinemaUser>>(userService.findAllUser(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CinemaUser> findUserById(@PathVariable Long id) {
		return new ResponseEntity<CinemaUser>(userService.findUserById(id), HttpStatus.OK);
	}
	
	@GetMapping("/email/{email}")
	public ResponseEntity<CinemaUser> findUserByEmail(@PathVariable String email) {
		return new ResponseEntity<CinemaUser>(userService.findUserByEmail(email), HttpStatus.OK);
	}
	
	@GetMapping("/username/{username}")
	public ResponseEntity<CinemaUser> findUserByUsername(@PathVariable String username) {
		return new ResponseEntity<CinemaUser>(userService.findUserByUsername(username), HttpStatus.OK);
	}
	
	@GetMapping("/bday/{birthdate}")
	public ResponseEntity<List<CinemaUser>> findUserByBirthDate(@PathVariable LocalDate birthdate) {
		return new ResponseEntity<List<CinemaUser>>(userService.findUsersByBirthdate(birthdate), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<String> addNewCinemaUser(@RequestBody CinemaUser user) {
			return new ResponseEntity<String>(userService.persistUser(user), HttpStatus.CREATED);
	}
	 
	// @PutMapping --> DA VALUTARE
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCinemaUserById(@PathVariable Long id) {
		return new ResponseEntity<String>(userService.deleteUserById(id), HttpStatus.ACCEPTED);
	}
}
