package com.capstone.main.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.capstone.main.model.CinemaMovie;
import com.capstone.main.model.CinemaProgram;
import com.capstone.main.model.CinemaRoom;
import com.capstone.main.model.E_ProgramStatus;
import com.capstone.main.repository.CinemaProgramRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CinemaProgramService {

	@Autowired
	private CinemaProgramRepository programRepository;
	
	@Autowired 
	private CinemaMovieService movieService;
	
	@Autowired 
	private CinemaRoomService roomService;
	
	public String persistProgram(CinemaProgram program, Long movieId, Long roomId) {
		// retrieving movie and room by passed IDs
		CinemaMovie movie = movieService.findMovieById(movieId);
		CinemaRoom room = roomService.findRoomById(roomId);
		
		// setting relation between program & movie/room
		program.setFilm(movie);
		program.setRoom(room);
		
		// persisting the entity into the database
		programRepository.save(program);
		log.info("Program correctly persisted on database.");
		return "Program correctly persisted on database.";
	}
	
	public String updateProgram(CinemaProgram program) {
		if(!programRepository.existsById(program.getId())) {
			log.warn("Program with id: {" + program.getId() + "} doesn't exists on database.");
			throw new EntityNotFoundException("Program with id: {" + program.getId() + "} doesn't exists on database.");
		}
		
		programRepository.save(program);
		log.info("Program with id: {" + program.getId() + "} correctly updated on database.");
		return "Program with id: {" + program.getId() + "} correctly updated on database.";
	}
	
	public String deleteProgramById(Long id) {
		if(!programRepository.existsById(id)) {
			log.warn("Program with id: {" + id + "} doesn't exists on database.");
			throw new EntityNotFoundException("Program with id: {" + id + "} doesn't exists on database.");
		} 
		
		programRepository.deleteById(id);
		log.info("Program with id: {" + id + "} correctly removed from database.");
		return "Program with id: {" + id + "} correctly removed from database.";
	}
	
	public CinemaProgram findProgramById(Long id) {
		return programRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("Program with id: {" + id + "} doesn't exists on database."));
	}
	
	public List<CinemaProgram> findProgramsByStatus(E_ProgramStatus status) {
		return (List<CinemaProgram>) programRepository.findByStatus(status);
	}
	
	// ADD FIND BY ROOM

	public Page<CinemaProgram> findAllProgramsPaged(Pageable pageable) {
		return (Page<CinemaProgram>) programRepository.findAllProgramsPaged(pageable);
	}
	
}
