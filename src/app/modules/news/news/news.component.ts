import {Component, OnInit} from '@angular/core';
import {NewsInterface} from "../../../core/interfaces/news.interface";
import {NewsService} from "../../../core/services/news.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  length: number = 0;
  pageSize: number = 3;
  news: NewsInterface[] = [];
  pageIndex: number = 0;
  onLoad: boolean = false;
  pageEvent!: PageEvent;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.onLoad = true;
    this.newsService.getNews(0, this.pageSize).subscribe(data => {
      this.news = data;
      this.onLoad = false;
    })
    this.newsService.getTotalElements().subscribe(data => {
      this.length = data;
      console.log(data)
    })


  }

  onChangePage($event: PageEvent) {
    this.onLoad = true;
    this.newsService.getNews($event.pageIndex, $event.pageSize).subscribe(() => this.onLoad = false);
  }
}
