import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../../../../core/services/appointment.service";
import {AppointmentInterface} from "../../../../core/interfaces/appointment.interface";
import {SlotInterface} from "../../../../core/interfaces/slot.interface";
import {SlotService} from "../../../../core/services/slot.service";
import {UserService} from "../../../../core/services/user.service";
import {UserInterface} from "../../../../core/interfaces/user.interface";

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
  isLoading: boolean = false;
  patient: UserInterface = this.userService.getBlankUser();

  constructor(private route: ActivatedRoute,
              private appointmentService: AppointmentService,
              private slotService: SlotService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'])
        this.patientId = params['id']

      this.userService.getUserById(this.patientId).subscribe(u => {
        this.patient = u;
      })

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

  getSlot(appointmentId: string) {
    return this.patientAppointments.slots.get(appointmentId)
      || {
        id: '',
        startsAt: new Date(),
        doctorId: '',
        reserved: true
      };
  }
}
