import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskComponent} from './task/task.component';
import {TaskRoutingModule} from "./task-routing.module";
import {MatTabsModule} from "@angular/material/tabs";
import {TaskCardComponent} from './components/task-card/task-card.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TaskFormComponent} from './components/task-form/task-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TaskComponent,
    TaskCardComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskModule {
}
