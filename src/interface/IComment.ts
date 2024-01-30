import { IUser } from "./IUser"

export interface IComment {
    diaryId: string,
    user: IUser,
    contents: string,
    time: number
}