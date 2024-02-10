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
            if(userToken.id !== user) return res.status(403).json({"msg":"권한 없음"});
        }
        const myDiaries = await DiaryServiceInstance.getMyDiaries(user);
        return res.status(201).json({"diaries" : myDiaries})
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
                id: Date.now()
            }
            console.log(reqObj);
            const result = DiaryServiceInstance.makeDiary(reqObj);
        }
    })
    route.delete('/deleteDiary', verifyToken, async(req:NextRequest, res:Response)=>{
        try {
            const userToken = req.verifiedToken;
            const {id} = req.body;
            if(userToken instanceof Object){
                const result = await DiaryServiceInstance.deleteDiary(id, userToken.id);
            }
            res.status(201).json({"msg":"diary deleted"})
        } catch (error) {
            res.status(500).json({"msg":"failed delete diary"});
        }
    })
    route.patch('/editDiary', verifyToken, async(req:NextRequest, res:Response)=>{
        const userToken = req.verifiedToken;
    })
    route.get('/:diaryId', async(req:Request, res:Response) => {
        const diaryId = req.params.diaryId;
    })
}
