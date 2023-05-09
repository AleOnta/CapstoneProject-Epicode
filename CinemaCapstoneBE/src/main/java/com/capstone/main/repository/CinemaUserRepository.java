package com.capstone.main.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.capstone.main.model.CinemaUser;

@Repository
public interface CinemaUserRepository extends CrudRepository<CinemaUser, Long>, PagingAndSortingRepository<CinemaUser, Long> {
	
	Optional<CinemaUser> findByEmail(String email);
	
	Optional<CinemaUser> findByUsername(String username);
	
	List<CinemaUser> findByBirthdate(LocalDate birthdate);
	
	Boolean existsByEmail(String email);
	
	Boolean existsByUsername(String username);
	
}

