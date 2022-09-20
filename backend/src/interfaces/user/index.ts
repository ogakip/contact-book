export interface iCreateUser {
    name: string,
    email: string,
    password: string
}
export interface iReturnCreateUser {
    id: string,
    name: string,
    email: string
}
export interface iLoginUser {
    email: string,
    password: string
}
export interface iReturnLoginUser {
    acessToken: string
}