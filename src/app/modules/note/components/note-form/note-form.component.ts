import {Component, OnInit} from '@angular/core';
import {NoteEditRequest, NoteInterface, NoteRequest} from "../../../../core/interfaces/note.interface";
import {FormBuilder, Validators} from "@angular/forms";
import {NoteService} from "../../../../core/services/note.service";
import {ActivatedRoute} from "@angular/router";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  isEditMode: boolean = false;
  noteToEdit?: NoteInterface;
  isLoading: boolean = false;
  displaySuccess: boolean = false;
  displayError: boolean = false;
  errors: string[] = [];
  patientId: string = '';
  noteForm = this.fb.group({
    content: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private noteService: NoteService, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['patientId'])
        this.patientId = params['patientId'];
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.isLoading = true;
        this.noteService.getNoteBy(params['id']).subscribe(data => {
          this.noteToEdit = data;
          this.noteForm.patchValue(data);
          this.isLoading = false;
        });
      }
    })
  }

  onSubmit() {
    if (!this.noteForm.valid) {
      return;
    }

    this.isLoading = true;

    if (!this.isEditMode) {
      const noteRequest: NoteRequest = {
        creatorId: '9dbae116-3954-4a2c-9308-31fb971dc6fc',
        patientId: this.patientId,
        content: this.noteForm.value.content || '',
      };
      this.addNote(noteRequest)
    } else {
      const noteEditRequest: NoteEditRequest = {
        id: this.noteToEdit?.id || '',
        content: this.noteForm.value.content || '',
      };
      this.editNote(noteEditRequest)
    }
  }

  resetForm() {
    this.noteForm.reset({
      content: '',
    });
  }

  addNote(noteRequest: NoteRequest) {
    this.noteService.addNote(noteRequest).subscribe(response => {
        setTimeout(() => {
          this.isLoading = false;
          if (response.status === HttpStatusCode.Created) {
            this.onSuccess();
            this.resetForm();
          }
          if (response.status === HttpStatusCode.BadRequest) {
            this.onError(response.messages)
          }
        }, 500)
      }
    )
  }

  editNote(noteEditRequest: NoteEditRequest) {
    this.noteService.editNote(noteEditRequest, this.patientId).subscribe(response => {
        setTimeout(() => {
          this.isLoading = false;
          if (response.status === HttpStatusCode.Ok) {
            this.onSuccess();
          }
          if (response.status === HttpStatusCode.BadRequest) {
            this.onError(response.messages)
          }
        }, 500)
      }
    )
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
