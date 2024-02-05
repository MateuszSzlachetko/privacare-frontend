import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentComponent} from "./appointment/appointment.component";
import {SlotsComponent} from "./components/slots/slots.component";
import {AppointmentFormComponent} from "./components/appointment-form/appointment-form.component";
import {PatientAppointmentsComponent} from "./components/patient-appointments/patient-appointments.component";
import {SlotsFormComponent} from "./components/slots-form/slots-form.component";
import {DoctorAppointmentsComponent} from "./components/doctor-appointments/doctor-appointments.component";
import {authGuard} from "../../core/guards/auth.guard";
import {adminGuard} from "../../core/guards/admin.guard";

const routes: Routes = [
  {
    path: '', component: AppointmentComponent, children: [
      {path: 'patient/:id', component: PatientAppointmentsComponent, canActivate: [authGuard]},
      {path: 'doctor/:id', component: DoctorAppointmentsComponent, canActivate: [adminGuard]},
      {path: 'slots', component: SlotsComponent},
      {path: 'slots/reserve', component: AppointmentFormComponent, canActivate: [authGuard]},
      {path: 'slots/add', component: SlotsFormComponent, canActivate: [adminGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {
}
