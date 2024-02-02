import DiaryService from "@/services/diary";
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { NextRequest, verifyToken } from "../middleware/middleware";
import { IToken } from "@/interface/IToken";

const route = Router();



export default (app: Router) => {
    app.use(`/diary`, route);
    const DiaryServiceInstance = Container.get(DiaryService);
    route.get('/mydiary/:user', verifyToken, async(req:NextRequest, res:Response)=>{
        const user = req.params.user;
        const userToken = req.verifiedToken;
        if(userToken instanceof Object){
            if(userToken.id === user) return res.status(403).json({"msg":"권한 없음"});
        }
        const myDiaries = DiaryServiceInstance.getMyDiaries(user);
    })
    route.post('/makeDiary', verifyToken, async(req:NextRequest, res:Response)=>{
        const userToken = req.verifiedToken;
        if(userToken instanceof Object){
            const {id, name} = userToken;
            const reqObj = {
                uid: id,
                author: name,
                title: req.body.title,
                contents: req.body.contents,
                tags: req.body.tags,
            }
            const result = DiaryServiceInstance.makeDiary(reqObj);
        }
    })
    route.delete('/deleteDiary', verifyToken, async(req:NextRequest, res:Response)=>{
        const userToken = req.verifiedToken;
    })
    route.patch('/editDiary', verifyToken, async(req:NextRequest, res:Response)=>{
        const userToken = req.verifiedToken;
    })
    route.get('/:diaryId', async(req:Request, res:Response) => {
        const diaryId = req.params.diaryId;
    })
}
