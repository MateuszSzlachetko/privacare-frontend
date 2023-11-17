import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentComponent} from "./appointment/appointment.component";
import {SlotsComponent} from "./components/slots/slots.component";

const routes: Routes = [
  {
    path: '', component: AppointmentComponent, children: [
      {path: 'slots', component: SlotsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {
}
