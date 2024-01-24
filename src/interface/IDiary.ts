import { IUser } from "./IUser";
import { IComment } from "./IComment";

export interface IDiary {
    title: string,
    contents: string,
    tags: string[],
    author: IUser,
    comment: IComment
}