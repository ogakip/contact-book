export interface iCreateClient {
    name: string,
    email: string,
    telephone: string
}
export interface iReturnCreateClient {
    id: string,
    name: string,
    email: string,
    telephone: string,
    created_at: Date
}