package com.capstone.main.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import com.capstone.main.model.CinemaRoom;

@Repository
public interface CinemaRoomRepository extends CrudRepository<CinemaRoom, Long>, PagingAndSortingRepository<CinemaRoom, Long> {
	
	Optional<CinemaRoom> findByName(String name);

	Boolean existsByName(String name);
	
}
