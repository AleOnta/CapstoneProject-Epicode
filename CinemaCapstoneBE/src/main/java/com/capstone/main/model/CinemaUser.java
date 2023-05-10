package com.capstone.main.model;

import java.time.LocalDate;
import java.util.List;

import com.capstone.auth.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
public class CinemaUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String firstname;
	
	@Column(nullable = false)
	private String lastname;
	
	@Column(nullable = false, unique = true)
	private String username;
	
	@Column(nullable = false, unique = true)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private LocalDate birthdate;
	
	private Integer cinemaPoints;
	
	@OneToOne
	@JsonIgnoreProperties({"firstname", "lastname", "username", "email", "password", })
	private User relatedUser;
	
	@OneToMany(mappedBy="owner")
	@JsonIgnoreProperties({"emitDate", "seatCode", "owner", "boundRoom"})
	private List<CinemaTicket> tickets;
	
}
