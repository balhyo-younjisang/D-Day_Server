import DiaryService from "@/services/diary";
import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { NextRequest, verifyToken } from "../middleware/middleware";

const route = Router();



export default (app: Router) => {
    app.use(`/diary`, route);
    const DiaryServiceInstance = Container.get(DiaryService);
    route.get('/mydiary/:user', verifyToken, async(req:NextRequest, res:Response)=>{
        const user = req.params.user;
        const userToken = req.verifiedToken;
        if(userToken instanceof Object){
            console.log(userToken);
        }
    })
    route.delete('/mydiary/:user', verifyToken, async(req:NextRequest, res:Response)=>{
        const user = req.params.user;
    })
    route.patch('/mydiary/:user', verifyToken, async(req:NextRequest, res:Response)=>{
        const user = req.params.user;
    })
}
