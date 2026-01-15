export enum EUserRole {
    CLIENT = 'CLIENT',
    MERCHANT = 'MERCHANT',
    ADMIN = 'ADMIN'
}

export interface ICreateUserInput {
    firebaseUid: string
    name: string
    email: string
}

export interface IUpdateUserInput {    
    name?: string
    email?: string
    role?: EUserRole
}