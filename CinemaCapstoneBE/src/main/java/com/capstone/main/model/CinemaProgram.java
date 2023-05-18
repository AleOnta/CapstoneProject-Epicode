package com.capstone.main.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class CinemaProgram {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private LocalDate fromDate;
	
	@Column(nullable = false)
	private LocalDate toDate;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private E_ProgramStatus status;
	
	@Column(nullable = false)
	private Double price;
	
	@OneToOne
	@JsonIgnoreProperties({"releaseDate", "budget", "revenue", "popularity", "vote", "news"})
	private CinemaMovie movie;
	
	@ManyToOne
	@JsonIgnoreProperties({"normalSeats", "vipSeats", "programs", "tickets"})
	private CinemaRoom room;
	
}
