import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {NoteEditRequest, NoteInterface, NoteRequest} from "../interfaces/note.interface";
import {Observable, ReplaySubject} from "rxjs";

interface PatientNotes {
  patientId: string,
  notes: NoteInterface[]
  notes$: ReplaySubject<NoteInterface[]>
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  url: string = '/api/note';
  patientNotes: PatientNotes[] = [];

  constructor(private http: HttpClient) {
  }

  getNotesByPatientId(id: string) {
    const i = this.patientNotes.findIndex(pN => pN.patientId === id)
    if (i !== -1) {
      return this.patientNotes[i].notes$.asObservable();
    }

    const newIndex = this.patientNotes.push({
      patientId: id,
      notes: [],
      notes$: new ReplaySubject<NoteInterface[]>(1)
    }) - 1;

    this.fetchNotesByPatientId(id, newIndex);

    return this.patientNotes[newIndex].notes$.asObservable();
  }

  private fetchNotesByPatientId(id: string, newIndex: number) {
    const params = new HttpParams().set('patientId', id);

    return this.http.get<NoteInterface[]>(this.url, {params}).subscribe(data => {
      this.patientNotes[newIndex].notes = data;
      this.patientNotes[newIndex].notes$.next(data);
    })
  }

  addNote(noteRequest: NoteRequest) {
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.post<NoteInterface>(this.url, noteRequest).subscribe({
        next: (response: NoteInterface) => {
          this.updatePatientNotes(response.patientId, response, undefined);
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

  deleteNote(id: string, patientId: string) {
    const deleteUrl = `${this.url}/${id}`;

    this.http.delete<HttpResponse<any>>(deleteUrl).subscribe({
      next: () => {
        this.updatePatientNotes(patientId, undefined, undefined, id);
      },
      error: () => {
      },
    })
  }

  getNoteBy(id: any) {
    const getUrl = `${this.url}/${id}`;

    return this.http.get<NoteInterface>(getUrl);
  }

  editNote(noteEditRequest: NoteEditRequest, patientId: string) {
    return new Observable<{ status: HttpStatusCode, messages: string[] }>((observer) => {
      this.http.put<number>(this.url, noteEditRequest).subscribe({
        next: () => {
          this.updatePatientNotes(patientId, undefined, noteEditRequest);
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

  updatePatientNotes(patientId: string, note?: NoteInterface, editedNote?: NoteEditRequest, deletedNoteId?: string) {
    const i = this.patientNotes.findIndex(pN => pN.patientId === patientId)

    if (i === -1)
      return;

    if (note) {
      this.patientNotes[i].notes.unshift(note);
      this.patientNotes[i].notes$.next(this.patientNotes[i].notes); // todo: a separate class method, hashMap with patientNote as a key
      return;
    }

    if (editedNote) {
      const note = this.patientNotes[i].notes.find(n => n.id === editedNote.id)
      note ? note.content = editedNote.content : '';
      this.patientNotes[i].notes$.next(this.patientNotes[i].notes);
    }

    if (deletedNoteId) {
      const d = this.patientNotes[i].notes.findIndex(n => n.id === deletedNoteId)
      this.patientNotes[i].notes.splice(d, 1);
      this.patientNotes[i].notes$.next(this.patientNotes[i].notes);
    }
  }
}
