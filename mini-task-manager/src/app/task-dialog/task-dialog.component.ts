import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../services/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent implements OnInit { 
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task 
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [this.data ? this.data.id : null], 
      title: [this.data ? this.data.title : '', Validators.required],
      description: [this.data ? this.data.description : ''],
      dueDate: [this.data ? new Date(this.data.dueDate) : '', Validators.required], 
      status: [this.data ? this.data.status : 'Pending'] 
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskData: Task = {
        ...formValue,
        dueDate: formValue.dueDate instanceof Date ? formValue.dueDate.toISOString().split('T')[0] : formValue.dueDate,
       
        createdAt: this.data?.createdAt || '', 
        updatedAt: '' 
      };
      this.dialogRef.close(taskData); 
    }
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}