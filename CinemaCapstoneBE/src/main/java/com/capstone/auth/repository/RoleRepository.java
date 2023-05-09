package com.capstone.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.auth.entity.ERole;
import com.capstone.auth.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByRoleName(ERole roleName);

}
