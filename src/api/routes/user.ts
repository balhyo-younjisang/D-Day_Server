import { Router, Request, Response, NextFunction } from "express";
import multer, { Multer } from 'multer';
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import UserService from "@/services/user";
import { IUser, IUserSignDTO } from "@/interface/IUser";
import TokenService from "@/services/token";

const route = Router();
const storage = multer.memoryStorage();
const upload: Multer = multer({ storage: storage });

interface MulterRequest extends Request {
  file: {
    buffer: Buffer;
  };
}

const validationSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};



export default (app: Router) => {
  app.use(`/user`, route);
  route.post('/register', upload.single('image'), async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
      const imageBuffer = req.file.buffer;
      const base64Image = imageBuffer.toString('base64');
      const {id, name, password } = req.body;
  
      const userServiceInstance = Container.get(UserService);
      console.log(req.body);
      const emailRegistered = await userServiceInstance.SignUp({
          name: name,
          password: password,
          profile: base64Image,
          id: id
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
  
      const userServiceInstance = Container.get(UserService);
      const tokenServiceInstance = Container.get(TokenService);
      const loginUser = await userServiceInstance.Login({
          password: password,
          id: id
      });
      const loginToken = tokenServiceInstance.LoginToken(loginUser[0]);
      console.log(loginToken);
  
      res.status(201).json({ token: loginToken });
    } catch (e) {
      console.log(e);
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
