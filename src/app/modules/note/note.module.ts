import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteRoutingModule} from "./note-routing.module";
import {NoteComponent} from './note/note.component';
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {NoteCardComponent} from './components/note-card/note-card.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NoteFormComponent} from './components/note-form/note-form.component';


@NgModule({
  declarations: [
    NoteComponent,
    NoteCardComponent,
    NoteFormComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ]
})
export class NoteModule {
}
