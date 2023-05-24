package com.capstone.main.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.capstone.auth.entity.User;
import com.capstone.auth.service.UserService;
import com.capstone.main.model.CinemaMovie;
import com.capstone.main.model.CinemaProgram;
import com.capstone.main.model.CinemaRoom;
import com.capstone.main.model.CinemaTicket;
import com.capstone.main.repository.CinemaTicketRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CinemaTicketService {

	@Autowired
	private CinemaTicketRepository ticketRepository;
	
	@Autowired 
	private UserService userService;
	
	@Autowired 
	private CinemaMovieService movieService;
	
	@Autowired
	private CinemaRoomService roomService;
	
	@Autowired
	private CinemaProgramService programService;
	
	public String persistTicket(CinemaTicket ticket, Long ownerId, Long programId){
		
		User owner = userService.findUserById(ownerId);
		CinemaProgram program = programService.findProgramById(programId);
		
		// from program get ids of related movie and room
		CinemaMovie movie = movieService.findMovieById(program.getMovie().getId());
		System.out.println(movie.toString());
		CinemaRoom room = roomService.findRoomById(program.getRoom().getId());
		System.out.println(room.toString());
		
		ticket.setOwner(owner);
		ticket.setBoundFilm(movie);
		ticket.setBoundRoom(room);
		
		ticketRepository.save(ticket);
		log.info("Ticket correctly persisted on database.");
		return "Ticket correctly persisted on database.";
	}
	
	public String updateTicket(CinemaTicket ticket) {
		if (!ticketRepository.existsById(ticket.getId())) {
			log.warn("Ticket with id: {" + ticket.getId() + "} doesn't exists on database.");
			throw new EntityNotFoundException("Ticket with id: {" + ticket.getId() + "} doesn't exists on database.");
		}
		
		ticketRepository.save(ticket);
		log.info("Ticket with id: {" + ticket.getId() + "} correctly updated on database.");
		return "Ticket with id: {" + ticket.getId() + "} correctly updated on database.";
	}
	
	public String deleteTicketById(Long id) {
		if (!ticketRepository.existsById(id)) {
			log.warn("Ticket with id: {" + id + "} doesn't exists on database.");
			throw new EntityNotFoundException("Ticket with id: {" + id + "} doesn't exists on database.");
		}
		
		ticketRepository.deleteById(id);
		log.info("Ticket with id: {" + id + "} correctly removed from database.");
		return "Ticket with id: {" + id + "} correctly removed from database.";
	}
	
	public CinemaTicket findTicketById(Long id) {
		return ticketRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("Ticket with id: {" + id + "} doesn't exists on database."));
	}
	
	public List<CinemaTicket> findAllTickets() {
		return (List<CinemaTicket>) ticketRepository.findAll();
	}
	
	public List<CinemaTicket> findTicketByUserId(Long userId) {
		return (List<CinemaTicket>) ticketRepository.getTicketByUserId(userId);
	}
	
	public List<CinemaTicket> findTicketByEmitDate(LocalDate emitDate) {
		return (List<CinemaTicket>) ticketRepository.findByEmitDate(emitDate);
	}

	public List<CinemaTicket> findTicketByPerDate(LocalDate perDate) {
		return (List<CinemaTicket>)	ticketRepository.findByPerDate(perDate);
	}
	
	public List<CinemaTicket> findTicketBySeatCode(String seatCode) {
		return (List<CinemaTicket>)ticketRepository.findBySeatCode(seatCode);
	}
	
	public Page<CinemaTicket> findAllTicketsPaged(Pageable pageable) {
		return (Page<CinemaTicket>) ticketRepository.findAll(pageable);
	}
}
