import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SlotInterface} from "../../../../core/interfaces/slot.interface";
import {SlotService} from "../../../../core/services/slot.service";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {DatePipe} from "@angular/common";
import {AppointmentInterface} from "../../../../core/interfaces/appointment.interface";
import {AppointmentService} from "../../../../core/services/appointment.service";
import {UserInterface} from "../../../../core/interfaces/user.interface";
import {UserService} from "../../../../core/services/user.service";
import {DeleteConfirmationComponent} from "../../../../components/delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";

//todo refactor in css, html, extract slots grid into separate component
@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss'],
  animations: [
    trigger('slideAnimations', [
      state('init', style({
        opacity: 1,
      })),
      state('toLeft', style({
        opacity: 1,
      })),
      state('toRight', style({
        opacity: 1,
      })),
      transition('init => toRight', animate('0.8s ease-in-out', style({
        opacity: 0, transform: 'translateX(100%)'
      }))),
      transition('init => toLeft', animate('0.8s ease-in-out', style({
        opacity: 0, transform: 'translateX(-100%)'
      }))),
    ])

  ]
})
export class DoctorAppointmentsComponent implements OnInit {
  slotsMap: Map<string, SlotInterface[]> = new Map();
  dateKeys: String[] = [];
  daysInRequest: number = 7;
  currentDateState: Date = new Date();
  animationState = 'init'
  protected readonly Date = Date;
  @ViewChild('gridContainer') gridContainer!: ElementRef;
  appointment!: AppointmentInterface;
  patientOfTheAppointment!: UserInterface;
  selectedSlot!: SlotInterface;


  constructor(private slotService: SlotService,
              private appointmentService: AppointmentService,
              private userService: UserService,
              private breakpointObserver: BreakpointObserver,
              private renderer: Renderer2,
              private dialog: MatDialog,) {
  }

  ngOnInit() {
    this.breakpointObserver.observe(["(max-width: 425px)", "(max-width: 690px)", "(max-width: 850px)", "(max-width: 1200px)"]).subscribe((state: BreakpointState) => {
      if (state.breakpoints['(max-width: 1200px)'])
        this.daysInRequest = 5;
      if (state.breakpoints['(max-width: 850px)'])
        this.daysInRequest = 4;
      if (state.breakpoints['(max-width: 690px)'])
        this.daysInRequest = 3;
      if (state.breakpoints['(max-width: 425px)'])
        this.daysInRequest = 2;
      if (!state.matches)
        this.daysInRequest = 7;

      this.initSlots();
      this.initDateKeys();
    });
  }

  initDateKeys() {
    this.dateKeys = [];
    let newDate, dateKey;
    for (let i = 0; i < this.daysInRequest; i++) {
      newDate = new Date(this.currentDateState.getTime());
      newDate.setDate(newDate.getDate() + i);
      dateKey = this.transformDate(newDate);
      this.dateKeys.push(dateKey)
    }
  }

  initSlots() {
    const startDate = new Date(this.currentDateState.getTime());
    const endDate = new Date(this.currentDateState.getTime());
    endDate.setDate(endDate.getDate() + this.daysInRequest - 1);
    const start = this.transformDate(startDate);
    const end = this.transformDate(endDate);

    this.slotService.getSlots(start, end).subscribe(data => {
      this.slotsMap = new Map();
      data.forEach(slot => {
        const key = this.transformDate(slot.startsAt);
        if (!this.slotsMap.has(key)) {
          this.slotsMap.set(key, []);
        }
        this.slotsMap.get(key)?.push(slot);
      })
    })
  }

  getMapSlots(key: string) {
    return this.slotsMap.get(key);
  }

  transformDate(date: Date) {
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, "yyyy-MM-dd") || '';
  }

  loadNextPage() {
    this.currentDateState.setDate(this.currentDateState.getDate() + this.daysInRequest);
    this.animationState = 'toLeft';
    this.initSlots();
    this.initDateKeys();
  }

  loadPreviousPage() {
    this.currentDateState.setDate(this.currentDateState.getDate() - this.daysInRequest);
    this.animationState = 'toRight';
    this.initSlots();
    this.initDateKeys();
  }

  onAnimationStart($event: any) {
    this.renderer.setStyle(this.gridContainer.nativeElement, 'overflow-x', 'hidden');
  }

  onAnimationDone($event: any) {
    this.animationState = 'init';
    this.renderer.setStyle(this.gridContainer.nativeElement, 'overflow-x', 'auto');
  }

  showPatientInfo(slot: SlotInterface) {
    this.appointmentService.getAppointmentsBySlotId(slot.id).subscribe(data => {
      this.appointment = data;
      this.userService.getUserById(data.patientId).subscribe(data => {
        this.patientOfTheAppointment = data;
      })
      this.selectedSlot = slot;
    })
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: 'Are you sure you want to delete this appointment?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm')
        this.appointmentService.deleteAppointment(this.appointment.id);
    });
  }
}

