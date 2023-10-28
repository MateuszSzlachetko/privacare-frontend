import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../../core/services/category.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {CategoryInterface} from "../../../core/interfaces/category.interface";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {TaskInterface} from "../../../core/interfaces/task.interface";
import {TaskService} from "../../../core/services/task.service";
import {Router} from "@angular/router";

// export interface TasksTab {
//   category: CategoryInterface,
//   content: TaskInterface[]
// }

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject();
  categories: CategoryInterface[] = [];
  tasks: TaskInterface[] = [];

  constructor(private categoryService: CategoryService, private taskService: TaskService) {
  }

  ngOnInit() {
    console.log("init")
    this.categoryService.getCategories().pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.categories = data;
        console.log(this.categories)
        if (data.length !== 0)
          this.taskService.getTasksByCategoryId(data[0].id).pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.tasks = data;
          })
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTabChange($event: MatTabChangeEvent) {
    const i = $event.index;
    const category = this.categories[i];

    this.taskService.getTasksByCategoryId(category.id).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.tasks = data;
    })
  }
}
