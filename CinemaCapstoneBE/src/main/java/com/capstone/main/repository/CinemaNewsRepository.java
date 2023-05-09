package com.capstone.main.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.capstone.main.model.CinemaNews;

@Repository
public interface CinemaNewsRepository extends CrudRepository<CinemaNews, Long>, PagingAndSortingRepository<CinemaNews, Long> {
	
	Optional<CinemaNews> findByTitle(String title);
	
	List<CinemaNews> findByAuthor(String author);
	
	List<CinemaNews> findByRedactDate(LocalDate redactDate);
	
	Boolean existsByTitle(String title);
	
}
