import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {NoteInterface} from "../interfaces/note.interface";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  url: string = '/api/note';

  constructor(private http: HttpClient) {
  }

  getNotesByPatientId(id: string) {
    const params = new HttpParams().set('patientId', id);

    return this.http.get<NoteInterface[]>(this.url, {params});
  }
}
