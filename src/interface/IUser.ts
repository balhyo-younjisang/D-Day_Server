export interface IUser{
    id: string,
    name: string,
    email: string,
}
export interface IUserDTO extends IUser{
    profile: Buffer,
}
export interface IUserSignDTO extends IUser{
    password: string,
    profile: Buffer,
}