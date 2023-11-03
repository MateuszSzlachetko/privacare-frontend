import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TaskService} from "../../../../core/services/task.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input({required: true}) categoryId!: number;
  taskForm = this.fb.group({
    content: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private taskService: TaskService) {
  }

  onSubmit() {

  }
}
