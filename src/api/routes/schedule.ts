import DiaryService from "@/services/diary";
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { NextRequest, verifyToken } from "../middleware/middleware";

const route = Router();



export default (app: Router) => {
    app.use(`/schedule`, route);
    // const DiaryServiceInstance = Container.get(DiaryService);
    route.post('/makeSchedule', verifyToken, (req:Request, res:Response) => {

    })
    route.patch('/editSchedule', verifyToken, (req:Request, res: Response)=>{

    })
    route.delete('/deleteSchedule', verifyToken, (req:Request, res:Response)=>{
        
    })
}
