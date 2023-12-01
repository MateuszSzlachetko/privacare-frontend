export interface UserInterface {
  id: string,
  authId: string,
  createdAt: Date,
  name: string,
  surname: string,
  pesel: string,
  phoneNumber: string,
}

export interface UserRequest {
  authId?: string,
  name: string,
  surname: string,
  pesel: string,
  phoneNumber: string,
}
