package com.task.service;

import com.task.bean.Task; // Ensure this import matches your Task bean's package

import java.util.List;
import java.util.Optional;

public interface TaskService {
    List<Task> getAllTasks();
    Optional<Task> getTaskById(Long id);
    Task createTask(Task task);
    Task updateTask(Long id, Task taskDetails); // Ensure method signature matches exactly
    void deleteTask(Long id); // Ensure method signature matches exactly
}