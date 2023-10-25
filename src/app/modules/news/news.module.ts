import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news/news.component';
import {NewsRoutingModule} from "./news-routing.module";
import {NewsCardComponent} from './components/news-card/news-card.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AddNewsComponent} from './components/add-news/add-news.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent,
    AddNewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ]
})
export class NewsModule {
}
