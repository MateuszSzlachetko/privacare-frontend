import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsComponent} from "./news/news.component";
import {AddNewsComponent} from "./components/add-news/add-news.component";


const routes: Routes = [
  {
    path: '', component: NewsComponent, children: [],
  },
  {
    path: 'add', component: AddNewsComponent, children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {
}
