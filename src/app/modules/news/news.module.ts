import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news/news.component';
import {NewsRoutingModule} from "./news-routing.module";
import {NewsCardComponent} from './components/news-card/news-card.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ]
})
export class NewsModule {
}
