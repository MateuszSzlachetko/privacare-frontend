import {StateEnum} from "../enums/state.enum";

export interface TaskInterface {
  id: string,
  creatorId: string,
  createdAt: Date,
  content: string,
  categoryId: number,
  state: StateEnum
}
