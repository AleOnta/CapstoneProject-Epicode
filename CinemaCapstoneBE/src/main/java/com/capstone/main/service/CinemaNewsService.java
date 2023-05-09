package com.capstone.main.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.main.model.CinemaMovie;
import com.capstone.main.model.CinemaNews;
import com.capstone.main.repository.CinemaNewsRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CinemaNewsService {

	@Autowired 
	private CinemaNewsRepository newsRepository;
	
	@Autowired
	private CinemaMovieService movieService;
	
	public void newsTitleExists(String title) {
		log.warn("News with title: {" + title + "} already exists on database.");
		throw new EntityExistsException("News with title: {" + title + "} already exists on database.");
	}
	
	public String persistNews(CinemaNews news, Long movieId) {
		
		if (newsRepository.existsByTitle(news.getTitle())) {
			newsTitleExists(news.getTitle());
		}
		
		CinemaMovie movie = movieService.findMovieById(movieId);
		news.setRelatedFilm(movie);
		
		newsRepository.save(news);
		log.info("News with title: {" + news.getTitle() + "} correctly persisted on database.");
		return "News with title: {" + news.getTitle() + "} correctly persisted on database.";
	}
	
	public String updateNews(CinemaNews news) {
		
		if (!newsRepository.existsById(news.getId())) {
			log.warn("News with id: {" + news.getId() + "} doesn't exists on database.");
			throw new EntityNotFoundException("News with id: {" + news.getId() + "} doesn't exists on database.");
		} else if (newsRepository.existsByTitle(news.getTitle())) {
			newsTitleExists(news.getTitle());
		}
		
		newsRepository.save(news);
		log.info("News with title: {" + news.getTitle() + "} correctly updated on database.");
		return "News with title: {" + news.getTitle() + "} correctly updated on database.";
	}
	
	public String deleteNewsById(Long id) {
		
		if (!newsRepository.existsById(id)) {
			log.warn("News with id: {" + id + "} doesn't exists on database.");
			throw new EntityNotFoundException("News with id: {" + id + "} doesn't exists on database.");
		}
		
		newsRepository.deleteById(id);
		log.info("News with id: {" + id + "} correctly removed from database.");
		return "News with id: {" + id + "} correctly removed from database.";
	}
	
	public CinemaNews findNewsById(Long id) {
		return newsRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("News with id: {" + id + "} doesn't exists on database."));
	}
	
	public CinemaNews findNewsByTitle(String title) {
		return newsRepository.findByTitle(title).orElseThrow(
				() -> new EntityNotFoundException("News with title: {" + title + "} doesn't exists on database."));
	}
	
	public List<CinemaNews> findAllCinemaNews() {
		return (List<CinemaNews>) newsRepository.findAll();
	}
	
	public List<CinemaNews> findNewsByRedactDate(LocalDate redactDate) {
		return (List<CinemaNews>) newsRepository.findByRedactDate(redactDate);
	}
	
	public List<CinemaNews> findNewsByAuthor(String author) {
		return (List<CinemaNews>) newsRepository.findByAuthor(author);
	}
}
