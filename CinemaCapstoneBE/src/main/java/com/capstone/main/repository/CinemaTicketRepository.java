package com.capstone.main.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.capstone.main.model.CinemaTicket;
import com.capstone.main.model.CinemaUser;

@Repository
public interface CinemaTicketRepository extends CrudRepository<CinemaTicket, Long>, PagingAndSortingRepository<CinemaTicket, Long>{

	List<CinemaTicket> findByOwner(CinemaUser owner);
	
	List<CinemaTicket> findBySeatCode(String seatCode);
	
	List<CinemaTicket> findByPerDate(LocalDate perDate);
	
	List<CinemaTicket> findByEmitDate(LocalDate emitDate);
	
}
