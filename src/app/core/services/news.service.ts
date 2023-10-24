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
      this.fetchNews(page, size);
    } else {
      this.news$.next(data);
    }
    console.log(this.newsData)
    return this.news$.asObservable();
  }

  getTotalElements() {
    return this.totalElements$.asObservable();
  }

  private fetchNews(page: number, size: number) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    this.http.get<NewsResponse>(this.url, {params}).subscribe((data) => {
      if (data.totalElements > this.totalElements && this.totalElements !== 0) {
        params = new HttpParams()
          .set('page', '0')
          .set('size', `${data.totalElements - this.totalElements}`);
        this.http.get<NewsResponse>(this.url, {params}).subscribe(dataN => {
          this.newsData.unshift(...dataN.content); //todo walidacja czy są to nowe obiekty, dla sortowania od najnowszych zawsze będą, ale gdyby zmienić sortowanie to nowe elementy mogą wpaść na koniec, wtedy jeżeli wykonamy request o pierwsze elementy i sprawdzimy czy już są to nie dodamy ich dwa razy, ale działa to tylko w przypadkach gdzie nowe elementy są na skraju, w sortowaniu po cenie mogłobybyć już błędy, ale to nie ten case
          this.totalElements = dataN.totalElements;

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
          // this.newsData.push(...data.content);
          this.news$.next(newsArr);

          this.totalElements$.next(this.totalElements)
        })
      } else {
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
      }


    })
  }
}
