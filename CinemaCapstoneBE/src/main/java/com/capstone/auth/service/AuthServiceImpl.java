package com.capstone.auth.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.capstone.auth.entity.ERole;
import com.capstone.auth.entity.Role;
import com.capstone.auth.entity.User;
import com.capstone.auth.exception.MyAPIException;
import com.capstone.auth.payload.LoginDto;
import com.capstone.auth.payload.RegisterDto;
import com.capstone.auth.repository.RoleRepository;
import com.capstone.auth.repository.UserRepository;
import com.capstone.auth.security.JwtTokenProvider;
import com.capstone.main.model.CinemaTicket;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;


    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(LoginDto loginDto) {
        
    	Authentication authentication = authenticationManager.authenticate(
        		new UsernamePasswordAuthenticationToken(
        				loginDto.getUsername(), loginDto.getPassword()
        		)
        ); 
    	
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public String register(RegisterDto registerDto) {

        // add check for username exists in database
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username: {" + registerDto.getUsername() + "} already exists on database.");
        }

        // add check for email exists in database
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email: {" + registerDto.getEmail() + "} already exists on database.");
        }

        User user = new User();
        user.setFirstname(registerDto.getFirstname());
        user.setLastname(registerDto.getLastname());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setBirthdate(registerDto.getBirthdate());
        user.setCinemaPoints(0);
        
        Set<Role> roles = new HashSet<>();
        List<CinemaTicket> tickets = new ArrayList<CinemaTicket>();
        
        
        // Per registrare tutti come USER di Default commentare IF
        if(registerDto.getRoles() != null) {
	        registerDto.getRoles().forEach(role -> {
	        	Role userRole = roleRepository.findByRoleName(getRole(role)).get();
	        	roles.add(userRole);
	        });
        } else {
        	Role userRole = roleRepository.findByRoleName(ERole.ROLE_CUSTOMER).get();
        	roles.add(userRole);
        }
        
        user.setTickets(tickets);
        user.setRoles(roles);
        userRepository.save(user);
        log.info("User with username: {" + user.getUsername() + "} correctly persisted on database." );
        return "User with username: {" + user.getUsername() + "} correctly persisted on database.";
    }
    
    public ERole getRole(String role) {
    	if(role.equals("ROLE_ADMIN")) return ERole.ROLE_ADMIN;
    	else return ERole.ROLE_CUSTOMER;
    }
    
}
