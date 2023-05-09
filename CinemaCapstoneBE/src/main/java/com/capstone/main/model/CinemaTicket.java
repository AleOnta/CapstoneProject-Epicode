package com.capstone.main.model;

import java.time.LocalDate;
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
	
	@Column(nullable = false)
	private String seatCode;
	
	@ManyToOne
	private CinemaUser owner;
	
	@OneToOne
	private CinemaMovie boundFilm;
	
	@ManyToOne
	private CinemaRoom boundRoom;
	
}
