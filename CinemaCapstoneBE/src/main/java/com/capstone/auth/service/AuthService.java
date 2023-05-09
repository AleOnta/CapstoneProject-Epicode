package com.capstone.auth.service;

import com.capstone.auth.payload.LoginDto;
import com.capstone.auth.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
	
    String register(RegisterDto registerDto);
    
}
