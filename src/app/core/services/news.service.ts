import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {NewsInterface, NewsResponse} from "../interfaces/news.interface";

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
    let areItemsInCache: boolean = true;
    let data: NewsInterface[] = [];

    if (end > this.totalElements && this.totalElements !== 0) {
      end = end - (end - this.totalElements);
    }

    for (let i = start; i < end; i++) {
      if (!this.newsData[i]) {
        areItemsInCache = false;
        break;
      }
      data.push(this.newsData[i]);
    }

    if (!areItemsInCache) {
      this.fetchNews(page, size, false);
    } else {
      this.news$.next(data);
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
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    this.load$.next(true);
    this.http.get<NewsResponse>(this.url, {params}).subscribe((data) => {
      if (data.totalElements > this.totalElements && this.totalElements !== 0) {
        let a = this.totalElements;
        this.totalElements = data.totalElements;
        this.fetchNews(0, data.totalElements - a, true);
        console.log("hello")
      }


      if (update) {
        console.log("test2")
        data.content.reverse();
        data.content.forEach(news => {
          let isNews = this.newsData.findIndex(n => n.id == news.id)

          if (isNews === -1) {
            this.newsData.unshift(news);
          }
        })
        // this.newsData.unshift(...data.content);
        return;
      }
      console.log("test")
      let newsArr: NewsInterface[] = [];
      let i = 0;

      data.content.forEach(news => {
        let isNews = this.newsData.findIndex(n => n.id == news.id)
        console.log(isNews)

        if (isNews === -1) {
          this.newsData.push(news);
          i++;
        }
        newsArr.push(news)
      })
      this.news$.next(newsArr);
      this.totalElements = data.totalElements;
      this.totalElements$.next(this.totalElements)
      this.load$.next(false);

    })
    console.log("hello3")
  }
}
