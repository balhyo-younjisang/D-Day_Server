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
    route.patch('/editTodo', verifyToken, async (req:Request, res:Response) => {
        try {
            const {calendarId, todo} = req.body;
            const result = await CalendarServiceInstance.editTodo(calendarId, todo);
            res.status(201).json({"msg":"edit success"});
        } catch (error) {
            console.log(error);
            res.status(500).json({"msg":"edit failed"})
        }
    })
    route.patch('/editNote', verifyToken, async (req:Request, res:Response) => {
        try {
            const {calendarId, note} = req.body;
            const result = await CalendarServiceInstance.editTodo(calendarId, note);
            res.status(201).json({"msg":"edit success"});
        } catch (error) {
            console.log(error);
            res.status(500).json({"msg":"edit failed"})
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
    route.post('/makeNote', verifyToken, async (req:NextRequest, res:Response) => {
        const userToken = req.verifiedToken;
        try {
          if (userToken instanceof Object) {
            const uid = userToken.id;
            const { year, month, date, startTime, endTime, contents, calendarId } = req.body;
            let imageBuffer = null;
            let mimeType = null;
            const id = Date.now();
            
            const result = await CalendarServiceInstance.makeNote(
              {
                year: year,
                month: month,
                date: date,
                id: calendarId,
                uid: uid,
                note: [{
                    id: id,
                    contents: contents,
                }]
              }
            );
            return res.status(201).json({"msg": "note suceess"})
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({"msg": "note failed"})
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
            const {calendarId, noteId} = req.body;
            const result = CalendarServiceInstance.deleteNote(calendarId, noteId);
            res.status(201).json({"msg" : "삭제 와ㅏㄴ료"});
        } catch (error) {
            console.log(error);
            res.status(500).json({"msg": "삭제 실패"})
        }
    })
    route.post('/calenderData', verifyToken, (req:Request, res:Response) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    })
    route.post('/applyCalender', verifyToken, async (req:NextRequest, res:Response) => {
        try {
            const userToken = req.verifiedToken;
            if(userToken instanceof Object){
                const {id} = userToken;
                const uid = req.body.uid;
                const result = await CalendarServiceInstance.applyCalender(id, uid);
                console.log(result);
                if(result === 409) return res.status(409).json({"msg": "already exist"});
                return res.status(201).json({"msg":"applied successful"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({"msg":"applied failed"})
        }
    })
    route.post('/acceptUser', verifyToken, async (req:NextRequest, res:Response) => {
        try {
            const userToken = req.verifiedToken;
            if(userToken instanceof Object){
                const {id} = userToken;
                const {uid, isAccept} = req.body;
                const result = await CalendarServiceInstance.acceptUser(id, uid, isAccept);
                console.log(result);
                if(result === 409) return res.status(409).json({"msg": "already exist"});
                return res.status(201).json({"msg":"applied successful"})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({"msg":"applied failed"})
        }
    })

}
    