import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule)},
  {path: 'task', loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule)},
  {path: 'note', loadChildren: () => import('./modules/note/note.module').then(m => m.NoteModule)},
  {
    path: 'appointment',
    loadChildren: () => import('./modules/appointment/appointment.module').then(m => m.AppointmentModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
