import {StateEnum} from "../enums/state.enum";

export interface TaskInterface {
  id: string,
  creatorId: string,
  createdAt: Date,
  content: string,
  categoryId: number,
  state: StateEnum
}

export interface TaskRequest {
  creatorId: string,
  content: string,
  categoryId: number,
  state: StateEnum,
}

export interface TaskEditRequest {
  id: string,
  content: string,
  state: StateEnum
}
