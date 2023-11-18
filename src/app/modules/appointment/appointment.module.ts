import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppointmentRoutingModule} from "./appointment-routing.module";
import {AppointmentComponent} from './appointment/appointment.component';
import {SlotsComponent} from './components/slots/slots.component';
import {AppointmentFormComponent} from './components/appointment-form/appointment-form.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppointmentComponent,
    SlotsComponent,
    AppointmentFormComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ]
})
export class AppointmentModule {
}
