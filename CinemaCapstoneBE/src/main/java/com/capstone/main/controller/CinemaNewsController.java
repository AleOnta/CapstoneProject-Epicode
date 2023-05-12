package com.capstone.main.controller;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import com.capstone.main.model.CinemaNews;
import com.capstone.main.service.CinemaNewsService;

@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:3000/"}, maxAge = 3600)
@RestController
@RequestMapping("/api/news")
public class CinemaNewsController {

	@Autowired
	private CinemaNewsService newsService;
	
	@GetMapping
	public ResponseEntity<List<CinemaNews>> findAllCinemaNews() {
		return new ResponseEntity<List<CinemaNews>>(newsService.findAllCinemaNews(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CinemaNews> findNewsById(@PathVariable Long id) {
		return new ResponseEntity<CinemaNews>(newsService.findNewsById(id), HttpStatus.OK);
	}
	
	@GetMapping("/title/{title}")
	public ResponseEntity<CinemaNews> findNewsByTitle(@PathVariable String title) {
		return new ResponseEntity<CinemaNews>(newsService.findNewsByTitle(title), HttpStatus.OK);
	}
	
	@GetMapping("/author/{author}")
	public ResponseEntity<List<CinemaNews>> findNewsByAuthor(@PathVariable String author) {
		return new ResponseEntity<List<CinemaNews>>(newsService.findNewsByAuthor(author), HttpStatus.OK);
	}
	
	@GetMapping("/r_date/{redactDate}")
	public ResponseEntity<List<CinemaNews>> findNewsByRedactDate(@PathVariable LocalDate redactDate) {
		return new ResponseEntity<List<CinemaNews>>(newsService.findNewsByRedactDate(redactDate), HttpStatus.OK);
	}
	
	@GetMapping("/paged")
	public ResponseEntity<Page<CinemaNews>> findAllNewsPaged(Pageable pageable) {
		return new ResponseEntity<Page<CinemaNews>>(newsService.findAllNewsPaged(pageable), HttpStatus.OK);
	}
	
	@PostMapping("/{filmId}")
	public ResponseEntity<String> addNewCinemaNews(@RequestBody CinemaNews news, @PathVariable Long filmId) {
		return new ResponseEntity<String>(newsService.persistNews(news, filmId), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<String> updateCinemaNews(@RequestBody CinemaNews news) {
		return new ResponseEntity<String>(newsService.updateNews(news), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteNewsById(@PathVariable Long id) {
		return new ResponseEntity<String>(newsService.deleteNewsById(id), HttpStatus.ACCEPTED);
	}
}
