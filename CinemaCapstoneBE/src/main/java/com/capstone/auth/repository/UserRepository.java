package com.capstone.auth.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.capstone.auth.entity.ERole;
import com.capstone.auth.entity.User;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long>, PagingAndSortingRepository<User, Long>{

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    Optional<User> findByUsername(String username);

	List<User> findByBirthdate(LocalDate birthdate);
	
	Page<User> findAll(Pageable pageable);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
	
}
