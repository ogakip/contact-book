export interface iCreateContact {
    name: string,
    email: string,
    telephone: string
}
export interface iReturnCreateContact extends iCreateContact {
    id: string
    client_id: string
}
export interface iUpdateContact {
    name?: string,
    email?: string,
    telephone?: string
}