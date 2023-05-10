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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.main.model.CinemaProgram;
import com.capstone.main.model.E_ProgramStatus;
import com.capstone.main.service.CinemaProgramService;

@RestController
@RequestMapping("/api/programs")
public class CinemaProgramController {

	@Autowired 
	private CinemaProgramService programService;
	
	@GetMapping("/{id}")
	public ResponseEntity<CinemaProgram> findProgramById(@PathVariable Long id) {
		return new ResponseEntity<CinemaProgram>(programService.findProgramById(id), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<CinemaProgram>> findAllPrograms() {
		return new ResponseEntity<List<CinemaProgram>>(programService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/status/:status")
	public ResponseEntity<List<CinemaProgram>> findProgramsByStatus(@PathVariable E_ProgramStatus status) {
		return new ResponseEntity<List<CinemaProgram>>(programService.findProgramsByStatus(status), HttpStatus.OK);
	}
	 
	// TO ADD ENDPOINT FOR GET BY ROOM
	
	@GetMapping("/paged")
	public ResponseEntity<Page<CinemaProgram>> findAllProgramsPaged(Pageable pageable) {
		return new ResponseEntity<Page<CinemaProgram>>(programService.findAllProgramsPaged(pageable), HttpStatus.OK);
	}
	
	@PostMapping("/{movieId}/{roomId}")
	public ResponseEntity<String> addNewCinemaProgram(@RequestBody CinemaProgram program, @PathVariable Long movieId, @PathVariable Long roomId) {
		return new ResponseEntity<String>(programService.persistProgram(program, movieId, roomId), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<String> updateCinemaProgram(@RequestBody CinemaProgram program) {
		return new ResponseEntity<String>(programService.updateProgram(program), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteProgramById(@PathVariable Long id) {
		return new ResponseEntity<String>(programService.deleteProgramById(id), HttpStatus.ACCEPTED);
	}
	
}
