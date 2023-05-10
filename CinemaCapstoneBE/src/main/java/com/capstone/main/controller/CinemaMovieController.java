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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.main.model.CinemaMovie;
import com.capstone.main.service.CinemaMovieService;

@RestController
@RequestMapping("/api/movies")
public class CinemaMovieController {

	@Autowired
	private CinemaMovieService movieService;
	
	@GetMapping
	public ResponseEntity<List<CinemaMovie>> findAllMovies() {
		return new ResponseEntity<List<CinemaMovie>>(movieService.findAllMovies(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CinemaMovie> findMovieById(@PathVariable Long id) {
		return new ResponseEntity<CinemaMovie>(movieService.findMovieById(id), HttpStatus.OK);
	}
	
	@GetMapping("/tmdbid/{tmdbid}")
	public ResponseEntity<CinemaMovie> findMovieByTmdbId(@PathVariable Long tmdbid) {
		return new ResponseEntity<CinemaMovie>(movieService.findMovieByTmdbId(tmdbid), HttpStatus.OK);
	}
	
	@GetMapping("/title/{title}")
	public ResponseEntity<List<CinemaMovie>> findMovieByTitleLike(@PathVariable String title) {
		return new ResponseEntity<List<CinemaMovie>>(movieService.findMoviesByTitleLike(title), HttpStatus.OK);
	}
	
	@GetMapping("genre/{genre}")
	public ResponseEntity<List<CinemaMovie>> findMoviesByGenre(@PathVariable String genre) {
		return new ResponseEntity<List<CinemaMovie>>(movieService.findMoviesByGenre(genre), HttpStatus.OK);
	}
	
	@GetMapping("p_company/{prodCompany}")
	public ResponseEntity<List<CinemaMovie>> findMoviesByProdCompany(@PathVariable String prodCompany) {
		return new ResponseEntity<List<CinemaMovie>>(movieService.findMoviesByProdCompany(prodCompany), HttpStatus.OK);
	}
	
	@GetMapping("release/{releaseDate}")
	public ResponseEntity<List<CinemaMovie>> findMoviesByReleaseDate(@PathVariable LocalDate releaseDate) {
		return new ResponseEntity<List<CinemaMovie>>(movieService.findMoviesByReleaseDate(releaseDate), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<String> addNewCinemaMovie(@RequestBody CinemaMovie movie) {
		return new ResponseEntity<String>(movieService.persistMovie(movie), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<String> updateCinemaMovie(@RequestBody CinemaMovie movie) {
		return new ResponseEntity<String>(movieService.updateMovie(movie), HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> delteCinemaMovieById(@PathVariable Long id) {
		return new ResponseEntity<String>(movieService.deleteMovieById(id), HttpStatus.ACCEPTED);
	}
	
}