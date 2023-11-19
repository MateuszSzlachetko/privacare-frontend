import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../../../../core/services/appointment.service";
import {AppointmentInterface} from "../../../../core/interfaces/appointment.interface";
import {SlotInterface} from "../../../../core/interfaces/slot.interface";
import {SlotService} from "../../../../core/services/slot.service";

export interface UserAppointments {
  appointments: AppointmentInterface[];
  slots: Map<string, SlotInterface>;
}

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.scss']
})
export class PatientAppointmentsComponent implements OnInit {
  patientId: string = '';
  patientAppointments: UserAppointments = {appointments: [], slots: new Map()}

  constructor(private route: ActivatedRoute,
              private appointmentService: AppointmentService,
              private slotService: SlotService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'])
        this.patientId = params['id']

      this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe(data => {
        this.patientAppointments.appointments = data;

        this.patientAppointments.appointments.forEach(a => {
          this.slotService.getSlotById(a.slotId).subscribe(data => {
            this.patientAppointments.slots.set(a.id, data);
          })
        })
      })
    });

  }
}
