import {Component, Input, OnInit} from '@angular/core';
import {TaskInterface} from "../../../../core/interfaces/task.interface";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {TaskService} from "../../../../core/services/task.service";
import {StateEnum} from "../../../../core/enums/state.enum";
import {exhaustMap, map, Subject} from "rxjs";
import {DeleteConfirmationComponent} from "../../../../components/delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  protected readonly StateEnum = StateEnum;
  update$: Subject<boolean> = new Subject();
  @Input({required: true}) task!: TaskInterface;

  constructor(private taskService: TaskService, private dialog: MatDialog,) {
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
      })
  }

  onStateChange($event: MatCheckboxChange) {
    this.update$.next(true);
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: 'Are you sure you want to delete this task?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm')
        this.taskService.deleteTask(this.task.id, this.task.categoryId);
    });
  }
}
