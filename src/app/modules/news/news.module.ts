import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news/news.component';
import {NewsRoutingModule} from "./news-routing.module";
import {NewsCardComponent} from './components/news-card/news-card.component';


@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
  ]
})
export class NewsModule {
}
