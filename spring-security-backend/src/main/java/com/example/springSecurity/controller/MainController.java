package com.example.springSecurity.controller;

import java.net.http.HttpResponse;
import java.util.logging.Logger;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/main")
public class MainController {
	
	@RequestMapping("/getData")
	public String getData() {

		Logger logger
		= Logger.getLogger(
				Login.class.getName());
		
		logger.info("working....");

		
		return "";
	}

}
