package com.capstone.main.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.main.model.CinemaRoom;
import com.capstone.main.service.CinemaRoomService;

@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:3000/"}, maxAge = 3600)
@RestController
@RequestMapping("/api/rooms")
public class CinemaRoomController {

	@Autowired CinemaRoomService roomService;
	
	@GetMapping
	public ResponseEntity<List<CinemaRoom>> findAllCinemaRoom() {
		return new ResponseEntity<List<CinemaRoom>>(roomService.findAllRooms(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CinemaRoom> findCinemaRoomById(@PathVariable Long id) {
		return new ResponseEntity<CinemaRoom>(roomService.findRoomById(id), HttpStatus.OK);
	}
	
	@GetMapping("/name/{name}")
	public ResponseEntity<CinemaRoom> findCinemaRoomByName(@PathVariable String name) {
		return new ResponseEntity<CinemaRoom>(roomService.findRoomByName(name), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<String> addNewCinemaRoom(@RequestBody CinemaRoom room) {
		return new ResponseEntity<String>(roomService.persistRoom(room), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<String> updateCinemaRoom(@RequestBody CinemaRoom room) {
		return new ResponseEntity<String>(roomService.updateRoom(room), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteCinemaRoomById(@PathVariable Long id) {
		return new ResponseEntity<String>(roomService.deleteRoomById(id), HttpStatus.ACCEPTED);
	}
}
