package com.capstone.main.configuration;

import java.time.LocalDate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import com.capstone.main.model.CinemaMovie;
import com.capstone.main.model.CinemaNews;
import com.capstone.main.model.CinemaProgram;
import com.capstone.main.model.CinemaRoom;
import com.capstone.main.model.CinemaTicket;
import com.capstone.main.model.CinemaUser;
import com.capstone.main.model.E_ProgramStatus;

@Configuration
public class CinemaConfiguration {

    // Custom Beans for each cinema's class
    
    @Bean("customRoom")
    @Scope("singleton")
    public CinemaRoom customRoom() {
		return new CinemaRoom();
	}
	
	@Bean("customFilm")
	@Scope("singleton")
	public CinemaMovie customFilm() {
		return new CinemaMovie();
	}
	
	@Bean("customProgram")
	@Scope("singleton")
	public CinemaProgram customProgram() {
		return new CinemaProgram();
	}
	
	@Bean("customTicket")
	@Scope("singleton")
	public CinemaTicket customTicket() {
		return new CinemaTicket();
	}
	
	@Bean("customUser")
	@Scope("singleton")
	public CinemaUser customUser() {
		return new CinemaUser();
	}
	
	@Bean("customNews")
	@Scope("singleton")
	public CinemaNews customNews() {
		return new CinemaNews();
	}
	
	// Bean with parameters for each cinema's class
	
	@Bean("paramRoom")
	@Scope("prototype")
	public CinemaRoom paramRoom(
			String name, 
			Integer totalSeats, 
			Integer normalSeats, 
			Integer vipSeats, 
			String timetables) {
		
		return CinemaRoom.builder()
				.name(name)
				.totalSeats(totalSeats)
				.normalSeats(normalSeats)
				.vipSeats(vipSeats)
				.timetables(timetables)
				.build();
	}
	
	@Bean("paramFilm")
	@Scope("prototype")
	public CinemaMovie paramFilm(
			Long tmdbId, 
			String title, 
			String plot, 
			String genre, 
			String prodCompany, 
			LocalDate releaseDate, 
			Integer filmLength, 
			String posterPath, 
			String castPath, 
			Integer budget, 
			Long revenue, 
			Double popularity, 
			Double vote) {
		
		return CinemaMovie.builder()
				.tmdbId(tmdbId)
				.title(title)
				.plot(plot)
				.genre(genre)
				.prodCompany(prodCompany)
				.releaseDate(releaseDate)
				.filmLength(filmLength)
				.posterPath(posterPath)
				.castPath(castPath)
				.budget(budget)
				.revenue(revenue)
				.popularity(popularity)
				.vote(vote)
				.build();
	}
	
	@Bean("paramProgram")
	@Scope("prototype")
	public CinemaProgram paramProgram(
			LocalDate fromDate, 
			LocalDate toDate, 
			E_ProgramStatus status, 
			Double price, 
			CinemaMovie film, 
			CinemaRoom room) {
		
		return CinemaProgram.builder()
				.fromDate(fromDate)
				.toDate(toDate)
				.status(status)
				.price(price)
				.movie(film)
				.room(room)
				.build();
	}
	
	@Bean("paramTicket")
	@Scope("prototype")
	public CinemaTicket paramTicket(
			LocalDate emitDate,
			LocalDate perDate,
			String hours,
			String seatCode,
			CinemaUser owner,
			CinemaMovie boundFilm,
			CinemaRoom boundRoom) {
		
		return CinemaTicket.builder()
				.emitDate(emitDate)
				.perDate(perDate)
				.hours(hours)
				.seatCode(seatCode)
				.owner(owner)
				.boundFilm(boundFilm)
				.boundRoom(boundRoom)
				.build();
	}
	
	@Bean("paramUser")
	@Scope("prototype")
	public CinemaUser paramUser(
			String firstname,
			String lastname,
			String username,
			String email,
			String password,
			LocalDate birthdate
			) {
		
		return CinemaUser.builder()
				.firstname(firstname)
				.lastname(lastname)
				.username(username)
				.email(email)
				.password(password)
				.birthdate(birthdate)
				.cinemaPoints(0)
				.build();
	}
	
	@Bean("paramNews")
	@Scope("prototype")
	public CinemaNews paramNews(
			LocalDate redactDate,
			String author,
			String title,
			String article,
			CinemaMovie film
			) {
		
		return CinemaNews.builder()
				.redactDate(redactDate)
				.author(author)
				.title(title)
				.article(article)
				.relatedFilm(film)
				.build();
	}
	
	
}
