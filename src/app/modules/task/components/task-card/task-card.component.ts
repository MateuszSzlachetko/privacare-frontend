import {Component, Input} from '@angular/core';
import {TaskInterface} from "../../../../core/interfaces/task.interface";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input({required: true}) task!: TaskInterface;
}
