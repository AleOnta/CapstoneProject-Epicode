package com.capstone.auth.payload;

import java.time.LocalDate;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
	
    private String firstname;
    
    private String lastname;
    
    private String username;
    
    private String email;
    
    private String password;
    
    private LocalDate birthdate;
    
    private Integer cinemaPoints;
    
    private Set<String> roles;
}
