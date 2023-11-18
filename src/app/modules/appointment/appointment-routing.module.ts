import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentComponent} from "./appointment/appointment.component";
import {SlotsComponent} from "./components/slots/slots.component";
import {AppointmentFormComponent} from "./components/appointment-form/appointment-form.component";

const routes: Routes = [
  {
    path: '', component: AppointmentComponent, children: [
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
