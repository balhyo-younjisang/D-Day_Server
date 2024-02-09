export interface ISchedule{
    startTime: Date,
    endTime: Date,
    type: string,
    uid: string,
    vid: string[],
    aid: string[],
    location: string
}