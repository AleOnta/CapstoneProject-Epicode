package com.capstone.main.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.capstone.main.model.CinemaMovie;

@Repository
public interface CinemaMovieRepository extends CrudRepository<CinemaMovie, Long>, PagingAndSortingRepository<CinemaMovie, Long> {

	Optional<CinemaMovie> findByTmdbId(Long tmdbId);;
	
	Optional<CinemaMovie> findByTitle(String title);
	
	Optional<CinemaMovie> findByPosterPath(String posterPath);
	
	Optional<CinemaMovie> findByCastPath(String castPath);
	
	List<CinemaMovie> findByReleaseDate(LocalDate releaseDate);
	
	@Query("SELECT m FROM CinemaMovie m WHERE LOWER(m.genre) LIKE LOWER(CONCAT('%', :genre, '%'))")
	List<CinemaMovie> findByGenreLike(@Param("genre") String genre);
	
	@Query("SELECT m FROM CinemaMovie m WHERE LOWER(m.prodCompany) LIKE LOWER(CONCAT('%', :prodCompany, '%'))")
	List<CinemaMovie> findByProdCompany(@Param("prodCompany") String prodCompany);
	
	@Query("SELECT m FROM CinemaMovie m WHERE LOWER(m.title) LIKE LOWER(CONCAT('%', :title, '%'))")
	List<CinemaMovie> findByTitleLike(@Param("title") String title);
	
	Page<CinemaMovie> findAll(Pageable pageable);
	
	Boolean existsByTmdbId(Long tmdbId);
	
	Boolean existsByTitle(String title);
	
	Boolean existsByPosterPath(String posterPath);
	
	Boolean existsByCastPath(String castPath);
}
