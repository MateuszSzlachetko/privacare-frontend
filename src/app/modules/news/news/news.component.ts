import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsInterface} from "../../../core/interfaces/news.interface";
import {NewsService} from "../../../core/services/news.service";
import {PageEvent} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";
import {isAdmin} from "../../../core/guards/admin.guard";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  length: number = 0;
  pageSize: number = 3;
  news: NewsInterface[] = [];
  pageIndex: number = 0;
  isLoading: boolean = false;
  destroy$: Subject<void> = new Subject();
  isAdmin$ = isAdmin();

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getNews(0, this.pageSize).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.news = data;
      })

    this.newsService.getTotalElements().pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.length = data;
      })

    this.newsService.getLoadState().pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.isLoading = data;
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangePage($event: PageEvent) {
    this.news = []
    this.newsService.getNews($event.pageIndex, $event.pageSize);
  }
}
