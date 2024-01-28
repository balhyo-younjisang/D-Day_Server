export interface IUser{
    id: string,
    name: string,
    // email: string,
}
export interface IUserDTO extends IUser{
    profile: Buffer,
}
export interface IUserSDTO extends IUser{
    password: string,
    profile: string
}
export interface IUserOAuthDTO extends IUserDTO{
    email: string
}
export interface IUserSignDTO extends IUser{
    password: string,
    profile: Buffer,
}
export interface IUserLoginDTO{
    id: string,
    password: string,
}