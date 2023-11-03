import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../../core/services/category.service";
import {Subject, takeUntil} from "rxjs";
import {TasksTab} from "../../../core/interfaces/task.interface";
import {TaskService} from "../../../core/services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject();
  tabs: TasksTab[] = [];
  isLoading: boolean = false;

  constructor(private categoryService: CategoryService, private taskService: TaskService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.categoryService.getCategories().pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.length !== 0) {
          data.forEach((category, index) => {
            this.tabs.push({category: category, content: []})
            this.taskService.getTasksByCategoryId(category.id).pipe(takeUntil(this.destroy$)).subscribe(data => {
              this.isLoading = false;
              this.tabs[index].content = data;
            })
          });
        }
      });
    // consider - loading only first tab, load other on change event
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
