package com.task.service;

import java.util.List;

import com.task.bean.User;

public interface UserService {

	public User loginUser(String username, String password);

	public void registerUser(User user);
	
	
	public List<User> getAllUsers();


}

