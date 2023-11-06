export interface NoteInterface {
  id: string,
  creatorId: string,
  patientId: string,
  createdAt: Date,
  content: string,
}

export interface NoteRequest {
  creatorId: string,
  patientId: string,
  content: string,
}

export interface NoteEditRequest {
  id: string,
  content: string,
}
