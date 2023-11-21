import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentComponent} from "./appointment/appointment.component";
import {SlotsComponent} from "./components/slots/slots.component";
import {AppointmentFormComponent} from "./components/appointment-form/appointment-form.component";
import {PatientAppointmentsComponent} from "./components/patient-appointments/patient-appointments.component";
import {SlotsFormComponent} from "./components/slots-form/slots-form.component";

const routes: Routes = [
  {
    path: '', component: AppointmentComponent, children: [
      {path: 'patient/:id', component: PatientAppointmentsComponent},
      {path: 'slots', component: SlotsComponent},
      {path: 'slots/reserve', component: AppointmentFormComponent},
      {path: 'slots/add', component: SlotsFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {
}
