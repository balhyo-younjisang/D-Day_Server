import { IUser } from "./IUser"

export interface IComment {
    user: IUser,
    contents: string,
    time: number
}