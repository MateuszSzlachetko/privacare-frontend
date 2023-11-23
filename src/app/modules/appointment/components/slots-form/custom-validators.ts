import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const dateRangeValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const startDate: Date = control.get('startDate')?.value;
  const endDate: Date = control.get('endDate')?.value;

  if (!startDate || !endDate)
    return null;

  return endDate.getTime() >= startDate.getTime()
    ? null
    : {endBeforeStartDate: true}
};

export const timeRangeValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const startTime: string = control.get('startTime')?.value;
  const endTime: string = control.get('endTime')?.value;

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  return (startHours < endHours) || (startHours === endHours && startMinutes < endMinutes)
    ? null
    : {endBeforeStartTime: true}
};

export const slotsIntervalValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const interval: number = control.value;

  return interval > 0 && Number.isInteger(interval)
    ? null
    : {intervalNonPositive: true}
};
