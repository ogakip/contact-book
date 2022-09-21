export interface iCreateUserTest {
    id?: string,
    accessToken?: string,
    name: string,
    email: string,
    password: string
}
export interface iLoginUserTest {
    email: string,
    password: string,
    accessToken?: string
}