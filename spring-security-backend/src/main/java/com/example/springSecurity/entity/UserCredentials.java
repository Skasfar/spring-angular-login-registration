package com.example.springSecurity.entity;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.GenericGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity	
@NoArgsConstructor
@Table(name="user_credentials")
public class UserCredentials {
	
	@Id
	@GenericGenerator(name = "auto_gen",strategy = "increment")
	@GeneratedValue(generator = "auto_gen")
	@Column(name="USER_ID")
	private Integer uId;
	@Column(name="USER_PHN_NO")
	private String userPhnNo;
	@Column(name="USER_EMAIL")
	private String userEmail;
	@Column(name="USER_DOB")
	private String userDob;
	@Column(name="USER_NAME")
	private String userName;
	@Transient
	private String userPassword;
	@Column(name="SALT_VALUE")
	private String salt;
	@Column(name="PASSWORD")
	private String passwordHash;
	


}
