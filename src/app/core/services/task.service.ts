import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {TaskInterface} from "../interfaces/task.interface";

export interface TasksCategorized {
  categoryId: number,
  content: TaskInterface[]
  content$: BehaviorSubject<TaskInterface[]>
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url: string = '/api/task';

  tasksCategorized: TasksCategorized[] = [{
    categoryId: 1,
    content: [],
    content$: new BehaviorSubject<TaskInterface[]>([])
  }]

  constructor(private http: HttpClient) {
  }

  getTasksByCategoryId(id: number) {
    if (!this.tasksCategorized[id - 1])
      this.tasksCategorized[id - 1] = {
        categoryId: id,
        content: [],
        content$: new BehaviorSubject<TaskInterface[]>([])
      }

    if (this.tasksCategorized[id - 1].content.length === 0) {
      this.fetchTasks(id);
    } else {
      this.tasksCategorized[id - 1].content$.next(this.tasksCategorized[id - 1].content);
    }

    return this.tasksCategorized[id - 1].content$.asObservable();
  }

  private fetchTasks(id: number) {
    const tasksByCategoryUrl = `${this.url}?categoryId=${id}`
    return this.http.get<TaskInterface[]>(tasksByCategoryUrl).subscribe(data => {
      this.tasksCategorized[id - 1].content = data;
      this.tasksCategorized[id - 1].content$.next(data);
    })
  }
}
