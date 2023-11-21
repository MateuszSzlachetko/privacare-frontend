import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../core/services/user.service";
import {SlotService} from "../../../../core/services/slot.service";
import {DatePipe} from "@angular/common";
import {DayOfWeekEnum} from "../../../../core/enums/day-of-week.enum";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-slots-form',
  templateUrl: './slots-form.component.html',
  styleUrls: ['./slots-form.component.scss']
})
export class SlotsFormComponent implements OnInit {
  isLoading: boolean = false;
  displaySuccess: boolean = false;
  displayError: boolean = false;
  errors: string[] = [];
  slotsForm = this.fb.group({
    startDate: [new Date(), Validators.required,],
    endDate: [new Date()],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    slotsInterval: [null, Validators.required, Validators.min(1)],
    selectedDays: []
  });
  selectedDays: DayOfWeekEnum[] = [];
  allDays: DayOfWeekEnum[] = [
    DayOfWeekEnum.MONDAY,
    DayOfWeekEnum.TUESDAY,
    DayOfWeekEnum.WEDNESDAY,
    DayOfWeekEnum.THURSDAY,
    DayOfWeekEnum.FRIDAY,
    DayOfWeekEnum.SATURDAY,
    DayOfWeekEnum.SUNDAY];

  constructor(private fb: FormBuilder,
              private slotService: SlotService,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  onSelected(event: MatSelectChange): void {
    this.selectedDays = event.value;
  }

  onSubmit() {
    if (!this.slotsForm.valid) {
      return;
    }
  }


  transformDate(date: Date) {
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, "yyyy-MM-dd") || '';
  }

  transformTime(date: Date) {
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, "HH:mm:ss") || '';
  }


  onSuccess() {
    this.displaySuccess = true;
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
