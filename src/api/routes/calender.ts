import DiaryService from "@/services/diary";
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { NextRequest, verifyToken } from "../middleware/middleware";

const route = Router();



export default (app: Router) => {
    app.use(`/calender`, route);
    // const DiaryServiceInstance = Container.get(DiaryService);
    route.post('/makeTodo', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            try {
            
            } catch (error) {
                console.log(error);
            }
        }
    })
    route.patch('/editTodo', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    })
    route.delete('/deleteTodo', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    })
    route.post('/makeNote', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            
        }
    })
    route.patch('/editNote', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    })
    route.delete('/deleteNote', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    })
    route.post('/calenderData', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    })

}
