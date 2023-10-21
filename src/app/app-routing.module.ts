import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule)},
  {path: 'test', loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
