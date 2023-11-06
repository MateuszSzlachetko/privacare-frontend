import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteComponent} from "./note/note.component";
import {NoteFormComponent} from "./components/note-form/note-form.component";

const routes: Routes = [
  {
    path: '', component: NoteComponent, children: [],
  },
  {
    path: 'add', component: NoteFormComponent, children: []
  },
  {
    path: 'edit/:id', component: NoteFormComponent, children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule {
}
