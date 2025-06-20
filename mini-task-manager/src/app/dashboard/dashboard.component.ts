import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Subscription } from 'rxjs';
import { Task, TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Import AuthService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  user: string | null = null;
  private tasksSubscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService, // Inject AuthService
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.user = sessionStorage.getItem('user');

      if (this.user) {
        console.log('Logged-in user:', this.user);
      } else {
        console.warn('No user information found in sessionStorage. Redirecting to login.');
        this.router.navigate(['/login']);
        return;
      }
    } else {
      console.log('Running on server, sessionStorage not available. Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }

    this.tasksSubscription = this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.sort((a, b) => {
        const statusOrder: { [key: string]: number } = {
          'In Progress': 1,
          'Pending': 2,
          'Completed': 3
        };
        return statusOrder[a.status] - statusOrder[b.status];
      });
    });
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task ? { ...task } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.taskService.updateTask(result).subscribe({
            next: (updatedTask) => console.log('Task updated successfully:', updatedTask),
            error: (err) => console.error('Error updating task:', err)
          });
        } else {
          this.taskService.addTask(result).subscribe({
            next: (newTask) => console.log('Task added successfully:', newTask),
            error: (err) => console.error('Error adding task:', err)
          });
        }
      }
    });
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => console.log('Task deleted successfully'),
        error: (err) => console.error('Error deleting task:', err)
      });
    }
  }

  // Corrected logout method
  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your session!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout(); // Clear session storage via AuthService
        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/login']); // Redirect to login page after sweet alert
        });
      }
    });
  }
}