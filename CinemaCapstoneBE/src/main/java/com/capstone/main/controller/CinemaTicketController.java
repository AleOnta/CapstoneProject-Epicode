package com.capstone.main.controller;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.main.model.CinemaTicket;
import com.capstone.main.service.CinemaTicketService;

@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:3000/"}, maxAge = 3600)
@RestController
@RequestMapping("/api/tickets")
public class CinemaTicketController {

	@Autowired
	private CinemaTicketService ticketService;
	
	@GetMapping
	public ResponseEntity<List<CinemaTicket>> findAllTickets() {
		return new ResponseEntity<List<CinemaTicket>>(ticketService.findAllTickets(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CinemaTicket> findTicketsById(@PathVariable Long id) {
		return new ResponseEntity<CinemaTicket>(ticketService.findTicketById(id), HttpStatus.OK);
	}
	
	@GetMapping("/s_code/{seatCode}")
	public ResponseEntity<List<CinemaTicket>> findTicketsBySeatCode(@PathVariable String seatCode) {
		return new ResponseEntity<List<CinemaTicket>>(ticketService.findTicketBySeatCode(seatCode), HttpStatus.OK);
	}
	
	@GetMapping("/emit_date/{emitDate}")
	public ResponseEntity<List<CinemaTicket>> findTicketsByPerDate(@PathVariable LocalDate perDate) {
		return new ResponseEntity<List<CinemaTicket>>(ticketService.findTicketByPerDate(perDate), HttpStatus.OK);
	}
	
	@GetMapping("/per_date/{perDate}")
	public ResponseEntity<List<CinemaTicket>> findTicketsByEmitDate(@PathVariable LocalDate emitDate) {
		return new ResponseEntity<List<CinemaTicket>>(ticketService.findTicketByEmitDate(emitDate), HttpStatus.OK);
	}
	
	@GetMapping("/user_id/{userId}")
	public ResponseEntity<List<CinemaTicket>> findTicketsByUserId(@PathVariable Long userId) {
		return new ResponseEntity<List<CinemaTicket>>(ticketService.findTicketByUserId(userId), HttpStatus.OK);
	}
	
	@GetMapping("/paged")
	public ResponseEntity<Page<CinemaTicket>> findAllMoviesPaged(Pageable pageable) {
		return new ResponseEntity<Page<CinemaTicket>>(ticketService.findAllTicketsPaged(pageable), HttpStatus.OK);
	}
	
	@PostMapping("/{ownerId}/{programId}")
	@PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> addNewCinemaTicket(@RequestBody CinemaTicket ticket, @PathVariable Long ownerId, @PathVariable Long programId) {
		return new ResponseEntity<String>(ticketService.persistTicket(ticket, ownerId, programId), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<String> updateCinemaTicket(@RequestBody CinemaTicket ticket) {
		return new ResponseEntity<String>(ticketService.updateTicket(ticket), HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteTicketById(@PathVariable Long id) {
		return new ResponseEntity<String>(ticketService.deleteTicketById(id), HttpStatus.ACCEPTED);
	}
	
	
}
