import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SlotInterface} from "../interfaces/slot.interface";

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
}
