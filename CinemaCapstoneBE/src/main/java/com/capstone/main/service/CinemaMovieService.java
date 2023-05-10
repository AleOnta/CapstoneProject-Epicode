package com.capstone.main.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.capstone.main.model.CinemaMovie;
import com.capstone.main.repository.CinemaMovieRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CinemaMovieService {

	@Autowired 
	private CinemaMovieRepository movieRepository;
	
	private void movieTmdbIdExists(Long tmdbId) {
		
		log.warn("Movie with tmdbId: {" + tmdbId + "} already exists on database.");
		throw new EntityExistsException("Movie with tmdbId: {" + tmdbId + "} already exists on database.");
	}
	
	private void movieTitleExists(String title) {
		
		log.warn("Movie with title: {" + title + "} already exists on database.");
		throw new EntityExistsException("Movie with title: {" + title + "} already exists on database.");
	}
	
	private void moviePosterPathExists(String posterPath) {
		
		log.warn("Movie with poster path: {" + posterPath + "} already exists on database.");
		throw new EntityExistsException("Movie with poster path: {" + posterPath + "} already exists on database.");
	}
	
	private void movieCastPathExists(String castPath) {
		
		log.warn("Movie with cast path: {" + castPath + "} already exists on database.");
		throw new EntityExistsException("Movie with cast path: {" + castPath + "} already exists on database.");
	}
	
	public String persistMovie(CinemaMovie movie) {
		
		if (movieRepository.existsByTmdbId(movie.getTmdbId())) {
			movieTmdbIdExists(movie.getTmdbId());
		} else if (movieRepository.existsByTitle(movie.getTitle())) {
			movieTitleExists(movie.getTitle());
		} else if (movieRepository.existsByPosterPath(movie.getPosterPath())) {
			moviePosterPathExists(movie.getPosterPath());
		} else if (movieRepository.existsByCastPath(movie.getCastPath())) {
			movieCastPathExists(movie.getCastPath());
		}
		
		movieRepository.save(movie);
		log.info("Movie with Title: {" + movie.getTitle() + "} correctly persisted on database.");
		return "Movie with Title: {" + movie.getTitle() + "} correctly persisted on database.";
	}
	
	public String updateMovie(CinemaMovie movie) {
		
		CinemaMovie toCheck = null;
		
		if (!movieRepository.existsById(movie.getId())) {
			
			log.warn("Movie with id: {" + movie.getId() + "} doesn't exirsts on database.");
			log.warn("Movie with id: {" + movie.getId() + "} doesn't exists on database.");
			throw new EntityNotFoundException("Movie with id: {" + movie.getId() + "} doesn't exists on database.");
		
		} else if (movieRepository.existsByTmdbId(movie.getTmdbId())) {
			
			toCheck = findMovieByTmdbId(movie.getTmdbId());
			
			if (movie.getId() == toCheck.getId()) {
				movieTmdbIdExists(movie.getTmdbId());				
			}
			
		} else if (movieRepository.existsByTitle(movie.getTitle())) {
			
			toCheck = findMovieByTitle(movie.getTitle());
			
			if (!movie.getId().equals(toCheck.getId())) {		
				movieTitleExists(movie.getTitle());
			}
			
		} else if (movieRepository.existsByPosterPath(movie.getPosterPath())) {
			
			toCheck = findMovieByPosterPath(movie.getPosterPath());
			
			if (!movie.getId().equals(toCheck.getId())) {
				moviePosterPathExists(movie.getPosterPath());			
			}
			
		} else if (movieRepository.existsByCastPath(movie.getCastPath())) {
			
			toCheck = findMovieByCastPath(movie.getCastPath());
			
			if (!movie.getId().equals(toCheck.getId())) {
				movieCastPathExists(movie.getPosterPath());			
			}
		}
		
		movieRepository.save(movie);
		log.info("Movie with Title: {" + movie.getTitle() + "} correctly updated on database.");
		return "Movie with Title: {" + movie.getTitle() + "} correctly updated on database.";
	}
	
	public String deleteMovieById(Long id) {
		if (!movieRepository.existsById(id)) {
			log.warn("Movie with id: {" + id + "} doesn't exists on database.");
			throw new EntityNotFoundException("Movie with id: {" + id + "} doesn't exists on database.");
		}
		
		movieRepository.deleteById(id);
		log.info("Movie with id: {" + id + "} correctly removed from database.");
		return "Movie with id: {" + id + "} correctly removed from database.";
	}
	
	public CinemaMovie findMovieById(Long id) {
		return movieRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("Movie with id: {" + id + "} doesn't exists on database."));
	}
	
	public CinemaMovie findMovieByTmdbId(Long tmdbId) {
		return movieRepository.findById(tmdbId).orElseThrow(
				() -> new EntityNotFoundException("Movie with tmdbId: {" + tmdbId + "} doesn't exists on database."));
	}
	
	public CinemaMovie findMovieByTitle(String title) {
		return movieRepository.findByTitle(title).orElseThrow(
				() -> new EntityNotFoundException("Movie with title: {" + title + "} doesn't exists on database."));
	}
	
	public CinemaMovie findMovieByPosterPath(String posterPath) {
		return movieRepository.findByPosterPath(posterPath).orElseThrow(
				() -> new EntityNotFoundException("Movie with poster path: {" + posterPath + "} doesn't exists on database."));
	}
	
	public CinemaMovie findMovieByCastPath(String castPath) {
		return movieRepository.findByCastPath(castPath).orElseThrow(
				() -> new EntityNotFoundException("Movie with cast path: {" + castPath + "} doesn't exists on database."));
	}
	
	public List<CinemaMovie> findAllMovies() {
		return (List<CinemaMovie>) movieRepository.findAll();
	}
	
	public List<CinemaMovie> findMoviesByGenre(String genre) {
		return (List<CinemaMovie>) movieRepository.findByGenreLike(genre);
	}
	
	public List<CinemaMovie> findMoviesByProdCompany(String prodCompany) {
		return (List<CinemaMovie>) movieRepository.findByProdCompany(prodCompany);
	}
	
	public List<CinemaMovie> findMoviesByTitleLike(String title) {
		return (List<CinemaMovie>) movieRepository.findByTitleLike(title);
	}
	
	public List<CinemaMovie> findMoviesByReleaseDate(LocalDate releaseDate) {
		return (List<CinemaMovie>) movieRepository.findByReleaseDate(releaseDate);
	}
	
	public Page<CinemaMovie> findAllMoviePaged(Pageable pageable) {
		return (Page<CinemaMovie>) movieRepository.findAllMoviePaged(pageable);
	}
}
