import { IUser } from "./IUser";
import { IComment } from "./IComment";

export interface IDiary {
    title: string,
    contents: string,
    tags: string[],
    author: string,
    comment?: IComment[]
}
export interface IDiaryDTO extends IDiary {
    id: string
}