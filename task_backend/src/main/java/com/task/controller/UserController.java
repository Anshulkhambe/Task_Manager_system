package com.task.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.bean.User;
import com.task.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin( "http://localhost:4200")
public class UserController {

	
	@Autowired
	private UserService userservice;
	

	
	@PostMapping("/loginuser")

	public User loginAuthenticate(@RequestBody User user)
	{

		return userservice.loginUser(user.getUsername(), user.getPassword());

	}
	
	
	@PostMapping("/newuser")
	public void registerUser(@RequestBody User user)
	{
		System.out.println("inside registration "+user);
		userservice.registerUser(user);
	}
	
	
	@GetMapping("/getAllCustomers")
	public List<User> getAllUsers()
	{
		return userservice.getAllUsers();
	}
		


}
