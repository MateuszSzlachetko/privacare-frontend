import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {NoteEditRequest, NoteInterface, NoteRequest} from "../interfaces/note.interface";
import {Observable} from "rxjs";

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

  addNote(noteRequest: NoteRequest) {
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.post<NoteInterface>(this.url, noteRequest).subscribe({
        next: (response: NoteInterface) => {
          observer.next({status: HttpStatusCode.Created, messages: []})
        },
        error: (error: HttpErrorResponse) => {
          observer.next({status: HttpStatusCode.BadRequest, messages: [...error.error.messages]})
        },
        complete: () => {
          observer.complete()
        }
      });
    });
  }

  deleteNote(id: string) {
    const deleteUrl = `${this.url}/${id}`;

    this.http.delete<HttpResponse<any>>(deleteUrl).subscribe({
      next: () => {
      },
      error: () => {
      },
    })
  }

  getNoteBy(id: any) {
    const getUrl = `${this.url}/${id}`;

    return this.http.get<NoteInterface>(getUrl);
  }

  editNote(noteEditRequest: NoteEditRequest) {
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.put<number>(this.url, noteEditRequest).subscribe({
        next: () => {
          observer.next({status: HttpStatusCode.Ok, messages: []})
        },
        error: (error) => {
          observer.next({status: HttpStatusCode.BadRequest, messages: [...error.error.messages]})
        },
        complete: () => {
          observer.complete()
        }
      })
    });
  }
}
