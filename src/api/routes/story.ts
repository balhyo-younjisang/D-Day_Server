import { Router, Request, Response, NextFunction } from "express";
import multer, { Multer } from 'multer';
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import TokenService from "@/services/token";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestorage } from "@/config/firebase";
import { NextRequest, verifyToken } from "../middleware/middleware";

const route = Router();
const storage = multer.memoryStorage();
const upload: Multer = multer({ storage: storage });

interface MulterRequest extends Request {
  file: {
    buffer: Buffer;
    mimetype: string;
  };
}

export default (app: Router) => {
  app.use(`/story`, route);
  route.post('/makeStory', upload.single('image'), async (req: MulterRequest, res: Response) => {
    try {

    } catch (e) {
      console.log(e);
    }
  });
  route.patch('/editStory', verifyToken, async (req: Request, res: Response)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
  })
  route.delete('deleteStory', verifyToken, async (req:Request, res:Response)=>{

  })
  route.get('/:user',verifyToken ,async (req:NextRequest, res:Response) => {
    try {
      const user = req.params.user;
      const userToken = req.verifiedToken;
    } catch (error) {
      
    }
  })
}
