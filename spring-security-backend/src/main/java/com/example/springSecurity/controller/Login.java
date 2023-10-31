package com.example.springSecurity.controller;

import java.util.logging.Logger;

import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.springSecurity.controller.service.UserService;
import com.example.springSecurity.entity.UserCredentials;

import jakarta.servlet.http.HttpServletRequest;
import java.security.SecureRandom;
import java.util.Base64;





import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

// ...


          

      



@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/login")
public class Login {
	Logger log= Logger.getLogger(Login.class.getName());
	private final String secrectkey="njhfjigfwgfwivco";
	    @Autowired
	    UserService service;

	    @PostMapping("/validate-user")
	    private ResponseEntity<String> login(@RequestBody UserCredentials uc) {
	    	  String email = uc.getUserEmail();
		      String password = uc.getUserPassword();      
	    	if(service.checkUser(uc) >0)
	    	{ 
	    	
	    	String salt =service.getSaltValue(uc);
	        String saltedPassword =password+salt; //uc.getPasswordHash();
	       String passwordHash= hashPassword(salt,saltedPassword);
	       uc.setPasswordHash(passwordHash);
	        boolean dBuserPass = service.getStatus(uc);
	        if (dBuserPass) {
	            log.info("login Successful ");
	            String jwtToken = generateJwtToken(secrectkey+email);
	            return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"Login successful!\",\"jwt\": \""+jwtToken+"\"}");
		        } else {
		            log.info(" Invalid password");
		            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Login failed.\"}");
		        }
	        }
	    	else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Login failed.\"}");
	    	}
	    }

	    @PostMapping("/registration")
	    private ResponseEntity<String> registration(@RequestBody UserCredentials uc) {
	        String email = uc.getUserEmail();
	        String password = uc.getUserPassword();      
      //  String salt = generateRandomSalt();
	        String salt = BCrypt.gensalt();
	        uc.setSalt(salt);
	        String saltedPassword = password + salt;
	        String hashedPassword = hashPassword(salt,saltedPassword);
	        uc.setPasswordHash(hashedPassword);
	        saveUserToDatabase(uc);
            return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"Registration successful!\"}");

	    }

private void saveUserToDatabase(UserCredentials uc) {
	service.saveUser(uc);
		}

//	    private String generateRandomSalt() {
//	        SecureRandom secureRandom = new SecureRandom();
//	        byte[] salt = new byte[8];
//	        secureRandom.nextBytes(salt);
//	        return Base64.getEncoder().encodeToString(salt);
//	    }

	    private String hashPassword(String salt,String password) {
	     String hashedPassword = BCrypt.hashpw(password, salt);
	     return hashedPassword;
	    }
	    
	    
	    
	    

	 // Method to generate a JWT token
	 private String generateJwtToken(String email) {
	     Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	     long expirationTimeInMilliseconds = 3600000; // 1 hour
	     Date expirationDate = new Date(System.currentTimeMillis() + expirationTimeInMilliseconds);

	     String jwtToken = Jwts.builder()
	             .setSubject(email)
	             .setIssuedAt(new Date())
	             .setExpiration(expirationDate)
	             .signWith(key)
	             .compact();

	     return jwtToken;
	 }

	}