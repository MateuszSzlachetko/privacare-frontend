import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskComponent} from './task/task.component';
import {TaskRoutingModule} from "./task-routing.module";
import {MatTabsModule} from "@angular/material/tabs";
import {TaskCardComponent} from './components/task-card/task-card.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    TaskComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ]
})
export class TaskModule {
}
