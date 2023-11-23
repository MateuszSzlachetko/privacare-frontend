import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SlotService} from "../../../../core/services/slot.service";
import {DatePipe} from "@angular/common";
import {DayOfWeekEnum} from "../../../../core/enums/day-of-week.enum";
import {MatSelectChange} from "@angular/material/select";
import {dateRangeValidator, slotsIntervalValidator, timeRangeValidator} from "./custom-validators";
import {SlotsRequest} from "../../../../core/interfaces/slot.interface";
import {HttpStatusCode} from "@angular/common/http";

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
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    slotsInterval: [null, [Validators.required, slotsIntervalValidator]],
    selectedDays: [[], Validators.required]
  }, {validators: [dateRangeValidator, timeRangeValidator]});
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
              private slotService: SlotService) {
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

    const slotsRequest: SlotsRequest = {
      doctorId: '9dbae116-3954-4a2c-9308-31fb971dc6fc', //todo auth service
      startDate: this.transformDate(this.slotsForm.value.startDate),
      endDate: this.transformDate(this.slotsForm.value.endDate),
      startTime: this.transformTime(this.slotsForm.value.startTime),
      endTime: this.transformTime(this.slotsForm.value.endTime),
      slotsInterval: this.slotsForm.value.slotsInterval || 60,
      selectedDays: this.slotsForm.value.selectedDays || []
    }

    this.addSlots(slotsRequest);
  }

  addSlots(slotsRequest: SlotsRequest) {
    this.slotService.addSlots(slotsRequest).subscribe(response => {
        this.isLoading = false;
        if (response.status === HttpStatusCode.Created) {
          this.onSuccess();
        }
        if (response.status === HttpStatusCode.BadRequest) {
          this.onError(response.messages)
        }
      }
    )
  }


  transformDate(date: Date | undefined | null) {
    if (!date)
      return '';
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, "yyyy-MM-dd") || '';
  }

  transformTime(time: string | undefined | null) {
    if (!time)
      return '';
    return `${time}:00`
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
