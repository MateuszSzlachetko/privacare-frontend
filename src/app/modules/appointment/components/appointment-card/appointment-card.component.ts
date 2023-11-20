import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SlotInterface} from "../../../../core/interfaces/slot.interface";
import {AppointmentInterface} from "../../../../core/interfaces/appointment.interface";
import {DeleteConfirmationComponent} from "../../../../components/delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../../core/services/user.service";
import {AppointmentService} from "../../../../core/services/appointment.service";
import {UserInterface} from "../../../../core/interfaces/user.interface";

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss']
})
export class AppointmentCardComponent implements OnChanges {
  @Input({required: true}) appointment!: AppointmentInterface;
  @Input({required: true}) slot!: SlotInterface;
  @Input({required: true}) patient!: UserInterface;
  doctor: UserInterface = this.userService.getBlankUser();
  isOutdated: boolean = false;
  isLoading: boolean = false;
  protected readonly Date = Date;

  constructor(private dialog: MatDialog,
              private appointmentService: AppointmentService,
              private userService: UserService) {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['slot']) {
      this.isOutdated = this.isAppointmentOutdated()
      this.isLoading = true;
      if (this.slot.doctorId !== '')
        this.updateDoctor();
    }
  }

  isAppointmentOutdated(): boolean {
    const date = new Date(this.slot.startsAt)
    return date.getTime() < Date.now();
  }

  updateDoctor() {
    this.userService.getUserById(this.slot.doctorId).subscribe(u => {
      this.doctor = u;
      this.isLoading = false
    })
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: 'Are you sure you want to delete this note?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm')
        this.appointmentService.deleteAppointment(this.appointment.id);
    });
  }
}
