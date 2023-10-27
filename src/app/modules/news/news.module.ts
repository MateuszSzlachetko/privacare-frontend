import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news/news.component';
import {NewsRoutingModule} from "./news-routing.module";
import {NewsCardComponent} from './components/news-card/news-card.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NewsFormComponent} from './components/news-form/news-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent,
    NewsFormComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatMenuModule,
  ]
})
export class NewsModule {
}
