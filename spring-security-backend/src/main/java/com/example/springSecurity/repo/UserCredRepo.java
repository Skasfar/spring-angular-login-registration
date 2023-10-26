package com.example.springSecurity.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.springSecurity.entity.UserCredentials;

public interface UserCredRepo extends JpaRepository<UserCredentials, Integer> {
	
	
@Query(value="select salt_value from user_credentials where USER_EMAIL =?1 ",nativeQuery=true)
String getSaltvalue(String userEmail);

//String getHash(String userEmail);

@Query(value="select count(*) from user_credentials where USER_EMAIL =?1 ",nativeQuery=true)
int checkUser(String userEmail);
@Query(value="select count(*) from user_credentials where USER_EMAIL =?1 and PASSWORD=?2",nativeQuery=true)
int getStatus(String userEmail, String password);

}
