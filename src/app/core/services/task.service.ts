import {Injectable} from '@angular/core';
import {HttpClient, HttpStatusCode} from "@angular/common/http";
import {BehaviorSubject, delay, Observable} from "rxjs";
import {TaskEditRequest, TaskInterface, TaskRequest} from "../interfaces/task.interface";
import {StateEnum} from "../enums/state.enum";

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
  tasksCategorized: TasksCategorized[] = []

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

  updateTask(id: string, content: string, state: StateEnum) {
    const taskEditRequest: TaskEditRequest = {id: id, content: content, state: state}
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.put<number>(this.url, taskEditRequest).pipe(delay(50)).subscribe({ // mock long response to present exhaust map
        next: () => {
          observer.next({status: HttpStatusCode.Ok, messages: []})
        },
        error: (error) => {
          observer.next({status: HttpStatusCode.BadRequest, messages: [...error.error.messages]})
        },
        complete: () => {
          observer.complete()
        }
      })
    })
  }

  addTask(taskRequest: TaskRequest) {
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.post<TaskInterface>(this.url, taskRequest).pipe(delay(500)).subscribe({ // mock long response for spinner animation
        next: (task) => {
          this.tasksCategorized[task.categoryId - 1].content.unshift(task);
          this.tasksCategorized[task.categoryId - 1].content$.next(
            this.tasksCategorized[task.categoryId - 1].content
          );
          observer.next({status: HttpStatusCode.Created, messages: []})
        },
        error: (error) => {
          observer.next({status: HttpStatusCode.BadRequest, messages: [...error.error.messages]})
        },
        complete: () => {
          observer.complete()
        }
      })
    })
  }
}
