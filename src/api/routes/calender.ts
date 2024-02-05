import DiaryService from "@/services/diary";
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import multer, { Multer } from 'multer';
import { NextRequest, verifyToken } from "../middleware/middleware";
import CalendarService from "@/services/calendar";
import { IToken } from "@/interface/IToken";
import { MulterRequest } from "./user";

const route = Router();

const storage = multer.memoryStorage();
const upload: Multer = multer({ storage: storage });

export default (app: Router) => {
    app.use(`/calendar`, route);
    const CalendarServiceInstance = Container.get(CalendarService);
    route.post('/makeTodo', verifyToken, upload.single('image'), async (req: MulterRequest, res: Response) => {
        const userToken = req.verifiedToken;
        try {
          if (userToken instanceof Object) {
            const uid = userToken.id;
            const { year, month, date, startTime, endTime, contents, calendarId } = req.body;
            let imageBuffer = null;
            let mimeType = null;
            if (req.file && req.file.buffer instanceof Buffer) {
                imageBuffer = req.file.buffer;
                mimeType = req.file.mimetype;
            }
            const id = Date.now();
            
            const result = await CalendarServiceInstance.makeTodo(
              {
                year: year,
                month: month,
                date: date,
                id: calendarId,
                uid: uid,
                Todo: [{
                    id: id,
                    startTime: startTime,
                    endTime: endTime,
                    contents: contents,
                    img: imageBuffer,
                    mimeType: mimeType,
                }]
              }
            );
            return res.status(201).json({"msg": "todo suceess"})
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({"msg": "todo failed"})
        }
      });
    route.patch('/editTodo', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    })
    route.delete('/deleteTodo', verifyToken, (req:Request, res:Response) => {
        try {
            const {calendarId, todoId} = req.body;
            const result = CalendarServiceInstance.deleteTodo(calendarId, todoId);
            res.status(201).json({"msg" : "삭제 와ㅏㄴ료"});
        } catch (error) {
            console.log(error);
            res.status(500).json({"msg": "삭제 실패"})
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
    route.post('/applyCalender', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    })
    route.post('/acceptUser', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    })

}
