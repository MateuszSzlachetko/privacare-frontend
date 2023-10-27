import {PaginationInterface} from "./pagination.interface";

export interface NewsInterface {
  id: string,
  creatorFullName: string,
  createdAt: Date,
  title: string,
  content: string
}

export interface NewsRequest {
  creatorId: string,
  title: string,
  content: string,
}

export interface NewsEditRequest {
  id: string,
  title: string,
  content: string,
}

export interface NewsResponse extends PaginationInterface {
  content: NewsInterface[],
}
