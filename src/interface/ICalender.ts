export interface ICalendar {
    id: number,
    year: number,
    month: number,
    date: number,
    uid: string,
    vid?: string[],
    aid?: string[],
    Todo?: ITodo[],
    note?: INote[]
}

export interface ITodo {
    id:number,
    startTime: string,
    endTime: string,
    contents: string,
    img?: Buffer|undefined,
    mimeType?: string
}

export interface INote {
    id: number,
    contents: string
}