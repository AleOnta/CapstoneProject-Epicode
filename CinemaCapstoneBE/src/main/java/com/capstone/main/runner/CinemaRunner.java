package com.capstone.main.runner;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.capstone.auth.entity.User;
import com.capstone.auth.service.UserService;
import com.capstone.main.model.CinemaMovie;
import com.capstone.main.model.CinemaProgram;
import com.capstone.main.model.CinemaRoom;
import com.capstone.main.model.CinemaTicket;
import com.capstone.main.model.E_ProgramStatus;
import com.capstone.main.service.CinemaMovieService;
import com.capstone.main.service.CinemaProgramService;
import com.capstone.main.service.CinemaRoomService;
import com.capstone.main.service.CinemaTicketService;
import com.github.javafaker.Faker;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class CinemaRunner implements ApplicationRunner {
	
	private Faker fake = Faker.instance(new Locale("en-EN"));
	
	@Autowired
	private UserService users_service;
	
	@Autowired
	private CinemaMovieService movies_service;
	
	@Autowired
	private CinemaProgramService programs_service;
	
	@Autowired
	private CinemaTicketService tickets_service;
	
	@Autowired
	private CinemaRoomService rooms_service;
	

	@Override
	public void run(ApplicationArguments args) throws Exception {
		// TODO Auto-generated method stub
		log.info("running cinema...");
		
		// gets all existing tickets and delete them from database
		List<CinemaTicket> tickets = tickets_service.findAllTickets();
		
		System.out.println("Deleting tickets");
		for (CinemaTicket t : tickets) {
			tickets_service.deleteTicketById(t.getId());
		}
		
		// gets all existing programs and delete them from database
		
		List<CinemaProgram> programs = programs_service.findAll();
		
		System.out.println("Deleting programs");
		for (CinemaProgram p : programs) {
			programs_service.deleteProgramById(p.getId());
		}
		
		// get all available movies
		
		// creates 9 different programs (3-ARCHIVED, 3-ONGOING, 3-INCOMING):
		
					// sets the correct Stripe price ID for the respective room
					// the ongoing programs will have ha from date property equal to today or max 4 days prior
		
		List<CinemaMovie> movies = movies_service.findAllMovies();
		List<Integer> indexes = getRandomIndexes(movies);
		
		LocalDate today = LocalDate.now();
		
		int i = 0;
		while (i < 9) {
			
			CinemaMovie m = movies.get(indexes.get(i));
			
			if (i <= 2) {
				CinemaProgram p = CinemaProgram.builder()
					.fromDate(today.minusDays(defineDate("from", i)))
					.toDate(today.minusDays(defineDate("", i)))
					.status(E_ProgramStatus.ARCHIVED)
					.price(definePrice(i))
					.build();
				
				programs_service.persistProgram(p, m.getId(), defineRoom(i));
			} else if (i >= 2 && i <= 5) {
				CinemaProgram p = CinemaProgram.builder()
					.fromDate(today.minusDays(defineDate("from", i)))
					.toDate(today.plusDays(defineDate("", i)))
					.status(E_ProgramStatus.ON_GOING)
					.price(definePrice(i))
					.build();
				
				programs_service.persistProgram(p, m.getId(), defineRoom(i));
			} else {
				CinemaProgram p = CinemaProgram.builder()
					.fromDate(today.plusDays(defineDate("from", i)))
					.toDate(today.plusDays(defineDate("", i)))
					.status(E_ProgramStatus.INCOMING)
					.price(definePrice(i))
					.build();
			
				programs_service.persistProgram(p, m.getId(), defineRoom(i));
			}
			
			i++;
		}
		
		List<User> users = users_service.findAllUsers();
		List<CinemaProgram> new_programs = programs_service.findAll().stream()
				.filter(f -> f.getStatus().toString().equals(E_ProgramStatus.ON_GOING.toString())).collect(Collectors.toList());
		
		
		
		
		
		// this series of loops will create 80 tickets for each user in each program 
		// this will help to populate the database with fresh data to improve UX UI and logic definitions
		// total tickets created 3600
		for (CinemaProgram p : new_programs) {
			CinemaRoom r = p.getRoom();
			String[] timetables = r.getTimetables().split("\\|");
			
			
			for (User u : users) {
				
				int ts = 0;
				while (ts < 80) {
					List<Integer> available_seats = defineRoomSeats(r);
					if (ts < 20) {
						// 1st day
						Integer s = available_seats.get(fake.number().numberBetween(0, available_seats.size() - 1));
						available_seats.remove(s);
						String actualSeat = defineSeat(r, s);
						LocalDate ticketFor = p.getFromDate();
						CinemaTicket ticket = CinemaTicket.builder()
								.emitDate(ticketFor)
								.perDate(ticketFor)								
								.seatCode(actualSeat)
								.hours(defineHours(r, timetables, ts))
								.price(definePrice(r))
								.build();
						
						tickets_service.persistTicket(ticket, u.getId(), p.getId());
					} else if (ts >= 20 && ts < 40) {
						// 2nd day
						Integer s = available_seats.get(fake.number().numberBetween(0, available_seats.size() - 1));
						available_seats.remove(s);
						String actualSeat = defineSeat(r, s);
						LocalDate ticketFor = p.getFromDate();
						CinemaTicket ticket = CinemaTicket.builder()
								.emitDate(ticketFor)
								.perDate(ticketFor.plusDays(1))								
								.seatCode(actualSeat)
								.hours(defineHours(r, timetables, ts))
								.price(definePrice(r))
								.build();
						
						tickets_service.persistTicket(ticket, u.getId(), p.getId());
					} else if (ts >= 40 && ts < 60) {
						// 3rd day
						Integer s = available_seats.get(fake.number().numberBetween(0, available_seats.size() - 1));
						available_seats.remove(s);
						String actualSeat = defineSeat(r, s);
						LocalDate ticketFor = p.getFromDate();
						CinemaTicket ticket = CinemaTicket.builder()
								.emitDate(ticketFor)
								.perDate(ticketFor.plusDays(2))								
								.seatCode(actualSeat)
								.hours(defineHours(r, timetables, ts))
								.price(definePrice(r))
								.build();
						
						tickets_service.persistTicket(ticket, u.getId(), p.getId());
					} else {
						// 4th day
						
						if (r.getName().equals("red")) {
							
							Integer s = available_seats.get(fake.number().numberBetween(0, available_seats.size() - 1));
							available_seats.remove(s);
							String actualSeat = defineSeat(r, s);
							LocalDate ticketFor = p.getFromDate();
							CinemaTicket ticket = CinemaTicket.builder()
									.emitDate(ticketFor)
									.perDate(ticketFor.plusDays(3))								
									.seatCode(actualSeat)
									.hours(timetables[fake.number().numberBetween(0, 3)])
									.price(definePrice(r))
									.build();
							
							tickets_service.persistTicket(ticket, u.getId(), p.getId());
							
						} else {
							Integer s = available_seats.get(fake.number().numberBetween(0, available_seats.size() - 1));
							available_seats.remove(s);
							String actualSeat = defineSeat(r, s);
							LocalDate ticketFor = p.getFromDate();
							CinemaTicket ticket = CinemaTicket.builder()
									.emitDate(ticketFor)
									.perDate(ticketFor.plusDays(3))								
									.seatCode(actualSeat)
									.hours(defineHours(r, timetables, ts))
									.price(definePrice(r))
									.build();
							
							tickets_service.persistTicket(ticket, u.getId(), p.getId());
						}
					}
					
					ts++;
				}
			}
		}
		
		// remove all random tickets created on my account
		User admin = users_service.findUserById(1l);
		
		List<CinemaTicket> user_tickets = tickets_service.findTicketByUserId(admin.getId());
		for (CinemaTicket t : user_tickets) {
			tickets_service.deleteTicketById(t.getId());
		}
		
	}
	
	public List<Integer> getRandomIndexes(List<CinemaMovie> movies) {
		List<Integer> random = new ArrayList<Integer>();
		boolean run = true;
		while (run) {
			int index = fake.number().numberBetween(0, movies.size() -1);
			if (random.contains(index)) {
				continue;
			} else {
				random.add(index);
			}
			
			if (random.size() == 9) {
				run = false;
				break;
			}		
		}
		
		return random;
	}
	
	public String definePrice(int i) {
		String[] pricing = {"price_1NAracIBuKJCZStFRyyt96J1", "price_1NArZwIBuKJCZStF2JFdiB1J", "price_1NArYmIBuKJCZStF7phyinwz"};
		String price = "";
		switch (i) {
			case 0: 
				price = pricing[0];
				break;
			case 1: 
				price = pricing[1];
				break;
			case 2: 
				price = pricing[2];
				break;
			case 3: 
				price = pricing[0];
				break;
			case 4: 
				price = pricing[1];
				break;
			case 5: 
				price = pricing[2];
				break;
			case 6: 
				price = pricing[0];
				break;
			case 7: 
				price = pricing[1];
				break;
			case 8: 
				price = pricing[2];
				break;
		}
		return price;
	}
	
	public Double definePrice(CinemaRoom r) {
		
		Double price = 0.0;
		switch (r.getName()) {
			case "blue": price = 8.5;
			case "green": price = 7.5;
			case "red": price = 7.5;
			
		}
		return price;
	}
	
	public Long defineRoom(int i) {
		List<CinemaRoom> rooms = rooms_service.findAllRooms();
		CinemaRoom r = null;
		
		if (i == 0 || i == 3 || i == 6) {
			r = rooms.get(0);
		} else if (i == 1 || i == 4 || i == 7) {
			r = rooms.get(1);
		} else {
			r = rooms.get(2);
		}
		
		return r.getId();
	}
	
	public int defineDate(String purpose, int i) {
		int date = 0;
		if (purpose.equals("from")) {
			switch (i) {
			// Archived
			case 0: 
				date = 25;
				break;
			case 1: 
				date = 28;
				break;
			case 2: 
				date = 30;
				break;
			// Ongoing
			case 3: 
				date = 0;
				break;
			case 4: 
				date = 1;
				break;
			case 5: 
				date = 2;
				break;
				// Incoming
			case 6: 
				date = 23;
				break;
			case 7: 
				date = 27;
				break;
			case 8: 
				date = 20;
				break;
			}
		} else {
			switch (i) {
			// Archived
			case 0: 
				date = 1;
				break;
			case 1: 
				date = 2;
				break;
			case 2: 
				date = 3;
				break;
			// Ongoing
			case 3: 
				date = 22;
				break;
			case 4: 
				date = 26;
				break;
			case 5: 
				date = 19;
				break;
			// Incoming
			case 6: 
				date = 49;
				break;
			case 7: 
				date = 53;
				break;
			case 8: 
				date = 46;
				break;
		}
		}
		
		return date;
	}
	
	private List<Integer> defineRoomSeats(CinemaRoom r) {
		List<Integer> seats = new ArrayList<Integer>();
		int i = 0;
		while (i < r.getTotalSeats()) {
			seats.add(i);
			i += 1;
		}
		
		return seats;
	}
	
	private String defineSeat(CinemaRoom r, Integer s) {
		String seat = "";
		if (r.getName().equals("blue")) {
			seat = "B-" + s;
		} else if (r.getName().equals("green")) {
			seat = "G-" + s;
		} else {
			seat = "R-" + s;
		}
		return seat;
	}
	
	private String defineHours(CinemaRoom r, String[] hours, int i) {
		String hour = "";
		
		if (r.getName().equals("red")) {
			
			if (i < 20) {
				if (i < 8) {
					hour = hours[0];
				} else if (i >= 8 && i < 14) {
					hour = hours[1];
				} else {
					hour = hours[2];
				}
			} else if (i >= 20 && i < 40) {
				if (i < 28) {
					hour = hours[0];
				} else if (i >= 28 && i < 33) {
					hour = hours[1];
				} else {
					hour = hours[2];
				}
			} else if (i >= 40 && i < 60) {
				
				if (i < 48) {
					hour = hours[0];
				} else if (i >= 48 && i < 54) {
					hour = hours[1];
				} else {
					hour = hours[2];
				}
				
			} else {
				hour = hours[fake.number().numberBetween(0, 2)];
			}
			
		} else {
			
			if (i < 20) {
				if (i < 5) {
					hour = hours[0];
				} else if (i >= 5 && i < 10) {
					hour = hours[1];
				} else if (i >= 10 && i < 15) {
					hour = hours[2];
				} else {
					hour = hours[3];
				}
			} else if (i >= 20 && i < 40) {
				if (i < 25) {
					hour = hours[0];
				} else if (i >= 25 && i < 30) {
					hour = hours[1];
				} else if (i >= 30 && i < 35) {
					hour = hours[2];
				} else {
					hour = hours[3];
				}
			} else if (i >= 40 && i < 60) {
				
				if (i < 45) {
					hour = hours[0];
				} else if (i >= 45 && i < 50) {
					hour = hours[1];
				} else if (i >= 50 && i < 55) {
					hour = hours[2];
				} else {
					hour = hours[3];
				}
				
			} else {
				if (i < 5) {
					hour = hours[0];
				} else if (i >= 5 && i < 10) {
					hour = hours[1];
				} else if (i >= 10 && i < 15) {
					hour = hours[2];
				} else {
					hour = hours[3];
				}
			}
			
		}
		
		return hour;
	}
}