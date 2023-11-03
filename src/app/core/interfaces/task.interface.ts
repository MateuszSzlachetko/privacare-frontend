import {StateEnum} from "../enums/state.enum";
import {BehaviorSubject} from "rxjs";
import {CategoryInterface} from "./category.interface";

export interface TaskInterface {
  id: string,
  creatorId: string,
  createdAt: Date,
  content: string,
  categoryId: number,
  state: StateEnum
}

export interface TaskEditRequest {
  id: string,
  content: string,
  state: StateEnum
}

export interface TasksCategorized {
  categoryId: number,
  content: TaskInterface[]
  content$: BehaviorSubject<TaskInterface[]>
}

export interface TasksTab {
  category: CategoryInterface,
  content: TaskInterface[]
}
