import {Injectable} from '@angular/core';
import {AppointmentRequest} from "../interfaces/appointment.interface";
import {HttpClient, HttpStatusCode} from "@angular/common/http";
import {delay, Observable} from "rxjs";

class AppointmentInterface {
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  url: string = '/api/appointments'

  constructor(private http: HttpClient) {
  }

  addAppointment(appointmentRequest: AppointmentRequest) {
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.post<AppointmentInterface>(this.url, appointmentRequest).pipe(delay(500)).subscribe({ // mock long response for spinner animation
        next: (task) => {
          observer.next({status: HttpStatusCode.Created, messages: []})
        },
        error: (error) => {
          observer.next({status: HttpStatusCode.BadRequest, messages: [...error.error.messages]})
        },
        complete: () => {
          observer.complete()
        }
      })
    })
  }
}
