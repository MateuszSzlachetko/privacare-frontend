import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryInterface} from "../interfaces/category.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = '/api/tasks/categories'
  categories: CategoryInterface[] = [];
  categories$: BehaviorSubject<CategoryInterface[]> = new BehaviorSubject<CategoryInterface[]>([]);

  constructor(private http: HttpClient) {
  }

  getCategories() {
    if (this.categories.length !== 0) {
      this.categories$.next(this.categories)
    } else {
      this.fetchCategories();
    }

    return this.categories$.asObservable()
  }

  private fetchCategories() {
    this.http.get<CategoryInterface[]>(this.url).subscribe({
      next: (data) => {
        this.categories = data;
        this.categories$.next(data);
      }
    })
  }
}
