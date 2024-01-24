import { Router, Request, Response, NextFunction } from "express";
import multer, { Multer } from 'multer';
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import UserService from "@/services/user";
import { IUser, IUserSignDTO } from "@/interface/IUser";

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
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

route.post('/register', upload.single('image'), celebrate(validationSchema), async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
      const imageBuffer = req.file.buffer;
      const {id, username, email, password } = req.body;
  
      const userServiceInstance = Container.get(UserService);
      const emailRegistered = await userServiceInstance.SignUp({
          name: username,
          email: email,
          password: password,
          profile: imageBuffer,
          id: id
      });
  
      res.status(201).json({ email: emailRegistered });
    } catch (e) {
      next(e);
    }
  });

export default (app: Router) => {
  app.use(`/user`, route);
}
