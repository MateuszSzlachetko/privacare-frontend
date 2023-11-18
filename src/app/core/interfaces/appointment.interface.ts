export interface AppointmentInterface {
  id: string,
  creatorId: string,
  patientId: string,
  slotId: string
}

export interface AppointmentRequest {
  creatorId: string,
  patientId: string,
  slotId: string
}
