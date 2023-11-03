import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {NewsEditRequest, NewsInterface, NewsRequest, NewsResponse} from "../interfaces/news.interface";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private url = '/api/news';
  private newsData: NewsInterface[] = [];
  private totalElements: number = 0;
  private previousPage: number = 0;
  private previousSize: number = 0;
  news$: BehaviorSubject<NewsInterface[]> = new BehaviorSubject<NewsInterface[]>([]);
  totalElements$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  getNews(page: number, size: number) {
    this.previousPage = page;
    this.previousSize = size;
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
    return this.isLoading$.asObservable();
  }

  private fetchNews(page: number, size: number, update: boolean) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    this.isLoading$.next(true);
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
        setTimeout(() => this.isLoading$.next(false), 1000);
        return;
      }

      data.content.forEach(news => {
        if (!this.newsData.some(n => n.id === news.id))
          this.newsData.push(news);
      })


      setTimeout(() => {
        this.news$.next(data.content);
        this.isLoading$.next(false);
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
        },
        complete: () => {
          observer.complete()
        }
      });
    });
  }

  deleteNews(id: string) {
    const deleteUrl = `${this.url}/${id}`;

    this.http.delete<HttpResponse<any>>(deleteUrl).subscribe({
      next: () => {
        let i = this.newsData.findIndex(n => n.id === id);
        if (i !== -1) {
          this.newsData.splice(i, 1);
          this.totalElements--;
          this.totalElements$.next(this.totalElements);
        }
        this.news$.next(this.news$.getValue().filter(n => n.id !== id));
        if (this.previousPage === 0) {
          this.getNews(this.previousPage, this.previousSize);
        }
      },
      error: () => {
      }
    })
  }

  editNews(newsEditRequest: NewsEditRequest) {
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.put<number>(this.url, newsEditRequest).subscribe({
        next: () => {
          let i = this.newsData.findIndex(n => n.id === newsEditRequest.id);
          if (i !== -1) {
            this.newsData[i].title = newsEditRequest.title;
            this.newsData[i].content = newsEditRequest.content;
          }
          observer.next({status: HttpStatusCode.Ok, messages: []})
        },
        error: (error) => {
          observer.next({status: HttpStatusCode.BadRequest, messages: [...error.error.messages]})
        },
        complete: () => {
          observer.complete()
        }
      })
    });
  }

  getNewsBy(id: string) {
    const getUrl = `${this.url}/${id}`;

    return this.http.get<NewsInterface>(getUrl);
  }
}
