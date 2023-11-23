import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpStatusCode} from "@angular/common/http";
import {SlotInterface, SlotsRequest} from "../interfaces/slot.interface";
import {delay, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  url: string = '/api/slots'

  constructor(private http: HttpClient) {
  }

  getSlots(startDate: string, endDate: string) {
    const params: HttpParams = new HttpParams()
      .set("startDate", startDate)
      .set("endDate", endDate)
    return this.http.get<SlotInterface[]>(this.url, {params: params});
  }

  getSlotById(slotId: any) {
    const url = `${this.url}/${slotId}`;
    return this.http.get<SlotInterface>(url);
  }

  addSlots(slotsRequest: SlotsRequest) {
    const url = `${this.url}/multiple`;

    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.post<SlotInterface[]>(url, slotsRequest).pipe(delay(500)).subscribe({ // mock long response for spinner animation
        next: (slots) => {
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
