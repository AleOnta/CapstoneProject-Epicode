package com.capstone.main.model;

import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
public class CinemaRoom {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String name;
	
	@Column(nullable = false)
	private Integer totalSeats;
	
	@Column(nullable = false)
	private Integer normalSeats;
	
	@Column(nullable = false)
	private Integer vipSeats;
	
	@Column(nullable = false)
	private String timetables;
	
	@OneToMany(mappedBy="room")
	private List<CinemaProgram> programs;
	
	@OneToMany(mappedBy="boundRoom")
	private List<CinemaTicket> tickets;
	
}
