// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string; 
  createdAt: string; 
  updatedAt: string; 
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8081/api/tasks';
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`); 
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl)
      .pipe(
        map(tasks => tasks.map(task => ({
          ...task,
          dueDate: task.dueDate.split('T')[0] 
        }))),
        catchError(this.handleError)
      )
      .subscribe(tasks => this.tasksSubject.next(tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): Observable<Task> {
    
    const taskToSend = {
      ...task,
      createdAt: task.createdAt || new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    };
    return this.http.post<Task>(this.apiUrl, taskToSend)
      .pipe(
        tap((newTask) => {
          const currentTasks = this.tasksSubject.getValue();
          const formattedNewTask = {
            ...newTask,
            dueDate: newTask.dueDate.split('T')[0] 
          };
          this.tasksSubject.next([...currentTasks, formattedNewTask]);
        }),
        catchError(this.handleError)
      );
  }

  updateTask(updatedTask: Task): Observable<Task> {
   
    const taskToSend = {
      ...updatedTask,
      updatedAt: new Date().toISOString() 
    };
    return this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, taskToSend)
      .pipe(
        tap((savedTask) => {
          const currentTasks = this.tasksSubject.getValue();
          const index = currentTasks.findIndex(t => t.id === savedTask.id);
          if (index > -1) {
            const formattedSavedTask = {
              ...savedTask,
              dueDate: savedTask.dueDate.split('T')[0] 
            };
            currentTasks[index] = formattedSavedTask;
            this.tasksSubject.next([...currentTasks]);
          }
        }),
        catchError(this.handleError)
      );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const currentTasks = this.tasksSubject.getValue();
          this.tasksSubject.next(currentTasks.filter(t => t.id !== id));
        }),
        catchError(this.handleError)
      );
  }
}