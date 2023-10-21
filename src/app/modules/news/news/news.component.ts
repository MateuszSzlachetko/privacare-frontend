import {Component, OnInit} from '@angular/core';
import {NewsInterface} from "../../../core/interfaces/news.interface";
import {NewsService} from "../../../core/services/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: NewsInterface[] = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getNews(0, 6).subscribe(data => {
      this.news = data.content;
    })
  }
}
