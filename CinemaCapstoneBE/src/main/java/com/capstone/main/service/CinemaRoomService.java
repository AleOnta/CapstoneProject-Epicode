package com.capstone.main.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capstone.main.model.CinemaRoom;
import com.capstone.main.repository.CinemaRoomRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CinemaRoomService {
	
	@Autowired 
	private CinemaRoomRepository roomRepository;
	
	public String persistRoom(CinemaRoom room) {
		// room's name must be 'unique'
		if (roomRepository.existsByName(room.getName())) {
			log.warn("Room with name: {" + room.getName() +"} already exists on database.");
			throw new EntityExistsException("Room with name: {" + room.getName() +"} already exists on database.");
		} 
		
		roomRepository.save(room);
		log.info("Room with name: {" + room.getName() + "}  correctly persisted on database.");
		return "Room with name: {" + room.getName() + "} correctly persisted on database.";
	}
	
	public String updateRoom(CinemaRoom room) {
		// checking if room does exists on DB
		if (!roomRepository.existsById(room.getId())) {
			log.warn("Room with id: {" + room.getId() +"} doesn't exists on database.");
			throw new EntityNotFoundException("Room with id: {" + room.getId() + "} doesn't exists on database.");
		}
		
		roomRepository.save(room);
		log.info("Room with id: {" + room.getId() + "}  correctly updated on database.");
		return "Room with id: {" + room.getId() + "} correctly updated on database.";
	}
	
	public String deleteRoomById(Long id) {
		// checking if room does exists on DB
		if (!roomRepository.existsById(id)) {
			log.warn("Room with id: {" + id +"} doesn't exists on database.");
			throw new EntityNotFoundException("Room with id: {" + id + "} doesn't exists on database.");
		}
		
		roomRepository.deleteById(id);
		log.info("Room with id: {" + id + "}  correctly removed from database.");
		return "Room with id: {" + id + "} correctly removed from database.";
	}
	
	public CinemaRoom findRoomById(Long id) {
		return roomRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("No Room with id: {" + id + "} exists on database."));
	}
	
	public CinemaRoom findRoomByName(String name) {
		return roomRepository.findByName(name).orElseThrow(
				() -> new EntityNotFoundException("No Room with name: {" + name + "} exists on database."));
	}
	
	public List<CinemaRoom> findAllRooms() {
		return (List<CinemaRoom>) roomRepository.findAll();
	}
}
