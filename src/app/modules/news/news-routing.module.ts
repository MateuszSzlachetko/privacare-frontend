import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsComponent} from "./news/news.component";
import {NewsFormComponent} from "./components/news-form/news-form.component";


const routes: Routes = [
  {
    path: '', component: NewsComponent, children: [],
  },
  {
    path: 'add', component: NewsFormComponent, children: []
  },
  {
    path: 'edit/:id', component: NewsFormComponent, children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {
}
