package com.capstone.main.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class CinemaTicket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private LocalDate emitDate;
	
	@Column(nullable = false)
	private LocalDate perDate;
	
	@Column(nullable = false, length = 5)
	private String hours;
	
	@Column(nullable = false)
	private String seatCode;
	
	@ManyToOne
	@JsonIgnoreProperties(
			{"firstname", 
			"lastname", 
			"email", 
			"password", 
			"cinemaPoints", 
			"relatedUser", 
			"tickets"})
	private CinemaUser owner;
	
	@OneToOne
	@JsonIgnoreProperties(
			{"tmdbId", 
			"plot", 
			"genre", 
			"prodCompany", 
			"releaseDate", 
			"filmLength", 
			"posterPath", 
			"castPath", 
			"budget", 
			"revenue", 
			"popularity", 
			"vote", 
			"news"})
	private CinemaMovie boundFilm;
	
	@ManyToOne
	@JsonIgnoreProperties(
			{"totalSeats", 
			"normalSeats", 
			"vipSeats", 
			"timeTables", 
			"programs", 
			"tickets"})
	private CinemaRoom boundRoom;
	
}
