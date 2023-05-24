package com.capstone.main.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.capstone.auth.entity.User;
import com.capstone.main.model.CinemaTicket;


@Repository
public interface CinemaTicketRepository extends CrudRepository<CinemaTicket, Long>, PagingAndSortingRepository<CinemaTicket, Long>{
	
	List<CinemaTicket> findByOwner(User owner);
	
	List<CinemaTicket> findBySeatCode(String seatCode);
	
	List<CinemaTicket> findByPerDate(LocalDate perDate);
	
	List<CinemaTicket> findByEmitDate(LocalDate emitDate);
	
	Page<CinemaTicket> findAll(Pageable pageable);
	
	@Query("SELECT t FROM CinemaTicket t JOIN t.owner u WHERE u.id = :userId")
    List<CinemaTicket> getTicketByUserId(@Param("userId") Long id);
}
