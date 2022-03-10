import { AlertType } from "./type"

export interface User {
    id?: string,
    name: string,
    surname: string,
    birthday: Date,
    phone: string,
    email: string,
    date?: Date
}

export interface Alert {
    type: AlertType,
    text: string
}