package com.task.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task.bean.User;
@Repository
public interface UserRepository extends JpaRepository<User, String>{


	
	public User findByUsernameAndPassword(String username, String password);
	
	public User findByUsernameAndEmail(String username,String email);
	
	public User findByUsername(String username);
	

}
