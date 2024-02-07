import { Router, Request, Response, NextFunction } from "express";
import multer, { Multer } from 'multer';
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import UserService from "@/services/user";
import { IUser, IUserSignDTO } from "@/interface/IUser";
import TokenService from "@/services/token";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestorage } from "@/config/firebase";
import { NextRequest } from "../middleware/middleware";

const route = Router();
const storage = multer.memoryStorage();
const upload: Multer = multer({ storage: storage });

export interface MulterRequest extends NextRequest {
  file?: {
    buffer?: Buffer;
    mimetype?: string;
  };
}

const validationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    id: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const validLoginSchema = {
  body: Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  }),
}



export default (app: Router) => {
  app.use(`/user`, route);
  route.post('/register', upload.single('image'), async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
      const imageBuffer = req.file.buffer;
      const {id, name, password } = req.body;
  
      const userServiceInstance = Container.get(UserService);
      const emailRegistered = await userServiceInstance.SignUp({
          name: name,
          password: password,
          profile: imageBuffer,
          id: id,
          mimetype: req.file.mimetype
      });
  
      res.status(201).json({ email: emailRegistered });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
  route.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id, password } = req.body;
      console.log(req.body);
  
      const userServiceInstance = Container.get(UserService);
      const tokenServiceInstance = Container.get(TokenService);
      const loginUser = await userServiceInstance.Login({
          password: password,
          id: id
      });
      console.log(loginUser);
      const loginToken = await tokenServiceInstance.LoginToken(loginUser[0]);
  
      res.status(201).json({ token: loginToken });
    } catch (e) {
      res.status(403).json({"msg":"user not found"});
      next(e);
    }
  });
  route.post('/oauth/google/login', async(req:Request, res:Response) => {
    try{
      console.log("hi");
      const userServiceInstance = Container.get(UserService);
      console.log("get");
      const googleRegistered = await userServiceInstance.OAuthLogin({
        email: req.body.email,
        name: req.body.name,
        id: req.body.uid,
        profile: null
      })
      
    } catch{

    }
  })
  route.post('/oauth/kakao/login', async(req:Request, res:Response) => {
    try{

    } catch{

    }
  })
}
