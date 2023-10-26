package com.example.springSecurity.controller.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.springSecurity.entity.UserCredentials;
import com.example.springSecurity.repo.UserCredRepo;

@Service
public class UserService {

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String hashPassword(String plainTextPassword) {
        return passwordEncoder.encode(plainTextPassword);
    }
	//verify user details
    public boolean verifyPassword(String plainTextPassword, String hashedPassword) {
        return passwordEncoder.matches(plainTextPassword, hashedPassword);
    }

	public void saveCredential(UserCredentials user) {
		
	}
	//save user details
	@Autowired
	UserCredRepo userCredRepo;
	
	
	public void saveUser(UserCredentials uc) {
		
		userCredRepo.save(uc);
	}


	public String getSaltValue(UserCredentials uc) {
		
		return userCredRepo.getSaltvalue(uc.getUserEmail());
		
	}
//	public String getHash(UserCredentials uc) {
//		
//		return userCredRepo.getHash(uc.getUserEmail());
//	}
	public int checkUser(UserCredentials uc) {
		// TODO Auto-generated method stub
		return userCredRepo.checkUser(uc.getUserEmail());
	}
	public Boolean getStatus(UserCredentials uc) {
		if(userCredRepo.getStatus(uc.getUserEmail(),uc.getPasswordHash())>0)
		return true;
		
		return false;
	}
}
