import {DayOfWeekEnum} from "../enums/day-of-week.enum";

export interface SlotInterface {
  id: string,
  doctorId: string,
  startsAt: Date,
  reserved: boolean
}

export interface SlotsRequest {
  doctorId: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  slotsInterval: number,
  selectedDays: DayOfWeekEnum[]
}
