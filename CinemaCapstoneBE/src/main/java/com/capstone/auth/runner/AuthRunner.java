package com.capstone.auth.runner;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.capstone.auth.entity.ERole;
import com.capstone.auth.entity.Role;
import com.capstone.auth.repository.RoleRepository;
import com.capstone.auth.repository.UserRepository;
import com.capstone.auth.service.AuthService;

@Component
public class AuthRunner implements ApplicationRunner {

    @Autowired
    RoleRepository roleRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthService authService;

    private Set<Role> adminRole;
    private Set<Role> moderatorRole;
    private Set<Role> userRole;

    @Override
    public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");

		if (roleRepository.findAll().isEmpty()) {
			setRoleDefault();
		}

    }

    private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(ERole.ROLE_ADMIN);
		roleRepository.save(admin);

		Role user = new Role();
		user.setRoleName(ERole.ROLE_CUSTOMER);
		roleRepository.save(user);

		adminRole = new HashSet<Role>();
		adminRole.add(admin);
		adminRole.add(user);

		moderatorRole = new HashSet<Role>();
		moderatorRole.add(user);

		userRole = new HashSet<Role>();
		userRole.add(user);
    }

}
