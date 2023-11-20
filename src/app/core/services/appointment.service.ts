import {Injectable} from '@angular/core';
import {AppointmentInterface, AppointmentRequest} from "../interfaces/appointment.interface";
import {HttpClient, HttpParams, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {delay, Observable} from "rxjs";

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

  getAppointmentsByPatientId(patientId: string) {
    const params = new HttpParams().set('patientId', patientId)

    return this.http.get<AppointmentInterface[]>(this.url, {params: params});
  }

  deleteAppointment(id: string) {
    const deleteUrl = `${this.url}/${id}`;

    this.http.delete<HttpResponse<any>>(deleteUrl).subscribe({
      next: () => {
      },
      error: () => {
      },
      complete: () => {

      }
    })
  }
}
