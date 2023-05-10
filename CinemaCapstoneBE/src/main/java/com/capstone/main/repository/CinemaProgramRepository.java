package com.capstone.main.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.capstone.main.model.CinemaProgram;
import com.capstone.main.model.CinemaRoom;
import com.capstone.main.model.E_ProgramStatus;

@Repository
public interface CinemaProgramRepository extends CrudRepository<CinemaProgram, Long>, PagingAndSortingRepository<CinemaProgram, Long>{
	
	@Query("SELECT c FROM CinemaProgram c INNER JOIN c.room cr WHERE c.room =:programRoom")
	List<CinemaProgram> findByRoom(@Param("programRoom") CinemaRoom programRoom);
	
	List<CinemaProgram> findByStatus(E_ProgramStatus status);
	
	Page<CinemaProgram> findAll(Pageable pageable);
	
}
