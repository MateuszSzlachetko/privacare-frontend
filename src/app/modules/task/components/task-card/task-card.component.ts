import {Component, Input, OnInit} from '@angular/core';
import {TaskInterface} from "../../../../core/interfaces/task.interface";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {TaskService} from "../../../../core/services/task.service";
import {StateEnum} from "../../../../core/enums/state.enum";
import {exhaustMap, map, Subject} from "rxjs";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  protected readonly StateEnum = StateEnum;
  update$: Subject<boolean> = new Subject();
  @Input({required: true}) task!: TaskInterface;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.update$.pipe(exhaustMap(() => {
      const newState = this.task.state === StateEnum.TODO ? StateEnum.DONE : StateEnum.TODO;
      return this.taskService.updateTask(this.task.id, this.task.content, newState).pipe(
        map(response => ({response, newState}))
      )
    }))
      .subscribe(({response, newState}) => {
        this.task.state = newState;
        console.log('test')
      })
  }

  onStateChange($event: MatCheckboxChange) {
    this.update$.next(true);
  }
}
