import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppointmentRoutingModule} from "./appointment-routing.module";
import {AppointmentComponent} from './appointment/appointment.component';
import {SlotsComponent} from './components/slots/slots.component';
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
  declarations: [
    AppointmentComponent,
    SlotsComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatGridListModule
  ]
})
export class AppointmentModule {
}
