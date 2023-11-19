import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentComponent} from "./appointment/appointment.component";
import {SlotsComponent} from "./components/slots/slots.component";
import {AppointmentFormComponent} from "./components/appointment-form/appointment-form.component";
import {PatientAppointmentsComponent} from "./components/patient-appointments/patient-appointments.component";

const routes: Routes = [
  {
    path: '', component: AppointmentComponent, children: [
      {path: 'patient/:id', component: PatientAppointmentsComponent},
      {path: 'slots', component: SlotsComponent},
      {path: 'slots/reserve', component: AppointmentFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {
}
