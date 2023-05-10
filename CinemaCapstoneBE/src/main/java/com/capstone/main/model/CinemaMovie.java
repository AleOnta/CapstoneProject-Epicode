package com.capstone.main.model;

import java.time.LocalDate;
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
public class CinemaMovie {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private Long tmdbId;
	
	@Column(nullable = false, unique = true)
	private String title;
	
	@Column(nullable = false, length = 1234)
	private String plot;
	
	@Column(nullable = false)
	private String genre;
	
	@Column(nullable = false)
	private String prodCompany;
	
	@Column(nullable = false)
	private LocalDate releaseDate;
	
	@Column(nullable = false)
	private Integer filmLength;
	
	@Column(nullable = false, unique = true)
	private String posterPath;
	
	@Column(nullable = false, unique = true)
	private String castPath;
	
	@Column(nullable = false)
	private Integer budget;
	
	@Column(nullable = false)
	private Long revenue;
	
	@Column(nullable = false)
	private Double popularity;
	
	@Column(nullable = false)
	private Double vote;
	
	@OneToMany(mappedBy="relatedMovie")
	private List<CinemaNews> news;
	
}
