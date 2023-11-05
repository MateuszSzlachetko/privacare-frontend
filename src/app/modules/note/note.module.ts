import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteRoutingModule} from "./note-routing.module";
import {NoteComponent} from './note/note.component';
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NoteComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ]
})
export class NoteModule {
}
