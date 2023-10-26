import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {NewsInterface, NewsRequest, NewsResponse} from "../interfaces/news.interface";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private url = '/api/news';
  private newsData: NewsInterface[] = [];
  private totalElements: number = 0;
  news$: BehaviorSubject<NewsInterface[]> = new BehaviorSubject<NewsInterface[]>([]);
  totalElements$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  load$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getNews(page: number, size: number) {
    const start = page * size;
    let end = start + size;
    let areItemsCached: boolean = true;

    // Prevent index out of bounds and new requests when all items are loaded
    if (end > this.totalElements && this.totalElements !== 0) {
      end = end - (end - this.totalElements);
    }

    for (let i = start; i < end; i++) {
      if (!this.newsData[i]) {
        areItemsCached = false;
        break;
      }
    }

    if (!areItemsCached) {
      this.fetchNews(page, size, false);
    } else {
      this.news$.next(this.newsData.slice(start, end));
    }

    return this.news$.asObservable();
  }

  getTotalElements() {
    return this.totalElements$.asObservable();
  }

  getLoadState() {
    return this.load$.asObservable();
  }

  private fetchNews(page: number, size: number, update: boolean) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    this.load$.next(true);
    this.http.get<NewsResponse>(this.url, {params}).subscribe((data) => {
      let a = this.totalElements;
      this.totalElements = data.totalElements;
      this.totalElements$.next(this.totalElements);

      if (data.totalElements > a && a !== 0) {
        // recursive call when new news was detected
        this.fetchNews(0, data.totalElements - a, true);
      }

      if (update) {
        // add recent unique news to the beginning of the array
        data.content.reverse().forEach(news => {
          if (!this.newsData.some(n => n.id === news.id))
            this.newsData.unshift(news);
        })
        setTimeout(() => this.load$.next(false), 1000);
        return;
      }

      data.content.forEach(news => {
        if (!this.newsData.some(n => n.id === news.id))
          this.newsData.push(news);
      })


      setTimeout(() => {
        this.news$.next(data.content);
        this.load$.next(false);
      }, 500);
    })
  }

  addNews(newsRequest: NewsRequest) {
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.post<NewsInterface>(this.url, newsRequest).subscribe({
        next: (response: NewsInterface) => {
          this.newsData.unshift(response);
          this.totalElements++;
          this.totalElements$.next(this.totalElements);
          observer.next({status: HttpStatusCode.Created, messages: []})
        },
        error: (error: HttpErrorResponse) => {
          observer.next({status: HttpStatusCode.BadRequest, messages: [...error.error.messages]})
        }
      });
    });
  }

  deleteNews(id: string) {
    const deleteUrl = `${this.url}/${id}`
    this.http.delete<HttpResponse<any>>(deleteUrl).subscribe({
      next: (response) => {
        console.log(response)
        let i = this.newsData.findIndex(n => n.id === id);
        if (i !== -1) {
          this.newsData.splice(i, 1);
        }
      },
      error: (error) => {
        console.log(error.error.messages)
      }
    })
  }
}
