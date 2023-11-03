import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TaskService} from "../../../../core/services/task.service";
import {TaskRequest} from "../../../../core/interfaces/task.interface";
import {StateEnum} from "../../../../core/enums/state.enum";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input({required: true}) categoryId!: number;
  isLoading: boolean = false;
  displaySuccess: boolean = false;
  displayError: boolean = false;
  taskForm = this.fb.group({
    content: ['', Validators.required],
  });
  errors: string[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
  }

  onSubmit() {
    if (!this.taskForm.valid) {
      return;
    }
    this.isLoading = true;

    const taskRequest: TaskRequest = {
      creatorId: '9dbae116-3954-4a2c-9308-31fb971dc6fc',
      content: this.taskForm.value.content || '',
      categoryId: this.categoryId,
      state: StateEnum.TODO
    }

    this.taskService.addTask(taskRequest).subscribe(response => {
      this.isLoading = false;
      if (response.status === HttpStatusCode.Created) {
        this.onSuccess();
        this.taskForm.reset({content: ''});
      }
      if (response.status === HttpStatusCode.BadRequest) {
        this.onError(response.messages)
      }
    });
  }

  onSuccess() {
    this.displaySuccess = true;
    setTimeout(() => {
      this.displaySuccess = false;
    }, 2500)
  }

  onError(messages: string[]) {
    this.displayError = true;
    this.errors = messages;
    setTimeout(() => {
      this.displayError = false;
    }, 6000)
  }
}
