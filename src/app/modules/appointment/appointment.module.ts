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
import {AppointmentCardComponent} from './components/appointment-card/appointment-card.component';
import {MatMenuModule} from "@angular/material/menu";
import {SlotsFormComponent} from './components/slots-form/slots-form.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';


@NgModule({
  declarations: [
    AppointmentComponent,
    SlotsComponent,
    AppointmentFormComponent,
    PatientAppointmentsComponent,
    AppointmentCardComponent,
    SlotsFormComponent,
    DoctorAppointmentsComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
  ]
})
export class AppointmentModule {
}
