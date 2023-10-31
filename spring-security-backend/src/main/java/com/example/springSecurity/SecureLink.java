package com.example.springSecurity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class SecureLink {

	

	public Claims validateJwtToken(String token, String secretKey) {
	    try {
	        Claims claims = Jwts.parser()
	        		.setSigningKey(secretKey)
                    .requireAudience("test")
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

	        // Verify token expiration
	        long currentTimeMillis = System.currentTimeMillis();
	        if (claims.getExpiration().getTime() < currentTimeMillis) {
	            throw new Exception("Token has expired");
	        }

	        // You can perform additional custom validation here if needed

	        return claims;
	    } catch (Exception e) {
	        // Token is not valid or has expired
	        return null;
	    }
	}

}
