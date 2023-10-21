import {Component, Input} from '@angular/core';
import {NewsInterface} from "../../../../core/interfaces/news.interface";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {
  @Input({required: true}) news!: NewsInterface;
  contentLengthThreshold: number = 50;
  seeMore: boolean = false;

  expandContent() {
    this.seeMore = true;
  }

  closeContent() {
    this.seeMore = false;
  }
}
