import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LogInComponent} from "./components/auth/log-in/log-in.component";
import {AuthComponent} from "./components/auth/auth.component";
import {SignUpComponent} from "./components/auth/sign-up/sign-up.component";
import {adminGuard} from "./core/guards/admin.guard";
import {authGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'login', component: LogInComponent},
      {path: 'signup', component: SignUpComponent}
    ]
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [authGuard],
  },
  {
    path: 'task',
    loadChildren: () => import('./modules/task/task.module').then(m => m.TaskModule),
    canActivate: [adminGuard],
    canMatch: [adminGuard]
  },
  {path: 'news', loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule)},

  {
    path: 'note',
    loadChildren: () => import('./modules/note/note.module').then(m => m.NoteModule),
    canActivate: [adminGuard],
    canMatch: [adminGuard]
  },
  {
    path: 'appointment',
    loadChildren: () => import('./modules/appointment/appointment.module').then(m => m.AppointmentModule)
  },

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
