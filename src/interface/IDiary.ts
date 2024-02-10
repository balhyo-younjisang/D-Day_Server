import { IUser } from "./IUser";
import { IComment } from "./IComment";

export interface IDiary extends Object{
    title: string,
    contents: string,
    tags: string[],
    author: string,
    uid: string;
}
export interface IDiaryDTO extends IDiary {
    id: number
}