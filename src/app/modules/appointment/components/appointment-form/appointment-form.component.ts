import {Component, OnInit} from '@angular/core';
import {AppointmentRequest} from "../../../../core/interfaces/appointment.interface";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {HttpStatusCode} from "@angular/common/http";
import {AppointmentService} from "../../../../core/services/appointment.service";
import {UserService} from "../../../../core/services/user.service";
import {UserInterface} from "../../../../core/interfaces/user.interface";

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  isLoading: boolean = false;
  displaySuccess: boolean = false;
  displayError: boolean = false;
  confirmDisabled: boolean = false;
  errors: string[] = [];
  slotId: string = '';
  slotStartsAt: Date = new Date();
  appointmentForm = this.fb.group({});
  doctor: UserInterface = this.userService.getBlankUser();
  patient: UserInterface = this.userService.getBlankUser();

  constructor(private fb: FormBuilder,
              private appointmentService: AppointmentService,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserById('9dbae116-3954-4a2c-9308-31fb971dc6fc')
      .subscribe(user => {
        this.doctor = user
      })
    this.userService.getUserById('432b984b-3a3e-4078-af5d-c620bd3b9159')
      .subscribe(user => {
        this.patient = user
      })

    this.route.queryParams.subscribe(params => {
      if (params['id'])
        this.slotId = params['id']

      if (params['startsAt'])
        this.slotStartsAt = params['startsAt']
    });
  }

  onSubmit() {
    if (!this.appointmentForm.valid) {
      return;
    }
    this.isLoading = true;

    // todo auth service and patient adding by doctor
    const appointmentRequest: AppointmentRequest = {
      creatorId: '9dbae116-3954-4a2c-9308-31fb971dc6fc',
      patientId: '432b984b-3a3e-4078-af5d-c620bd3b9159',
      slotId: this.slotId,
    };
    this.addAppointment(appointmentRequest);
  }

  resetForm() {
    this.appointmentForm.reset({});
  }

  addAppointment(appointmentRequest: AppointmentRequest) {
    this.appointmentService.addAppointment(appointmentRequest).subscribe(response => {
        this.isLoading = false;
        if (response.status === HttpStatusCode.Created) {
          this.onSuccess();
          this.resetForm();
        }
        if (response.status === HttpStatusCode.BadRequest) {
          this.onError(response.messages)
        }
      }
    )
  }

  onSuccess() {
    this.displaySuccess = true;
    this.confirmDisabled = true;
    setTimeout(() => {
      this.displaySuccess = false;
    }, 2500)
  }

  onError(messages: string[]) {
    this.displayError = true;
    this.errors = messages;
    setTimeout(() => {
      this.displayError = false;
    }, 6000)
  }

}
