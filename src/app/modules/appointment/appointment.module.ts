import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppointmentRoutingModule} from "./appointment-routing.module";
import {AppointmentComponent} from './appointment/appointment.component';
import {SlotsComponent} from './components/slots/slots.component';
import {AppointmentFormComponent} from './components/appointment-form/appointment-form.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {PatientAppointmentsComponent} from './components/patient-appointments/patient-appointments.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';


@NgModule({
  declarations: [
    AppointmentComponent,
    SlotsComponent,
    AppointmentFormComponent,
    PatientAppointmentsComponent,
    AppointmentCardComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonToggleModule
  ]
})
export class AppointmentModule {
}
