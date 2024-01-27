import { auth, database } from "@/config/firebase";
import { Inject, Service } from "typedi";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


@Service()
export default class TokenService {
  constructor(@Inject("logger") private logger) {}

  verifyToken(data: string|undefined):string{
    try {      
        if (!data) {
          return "Token doesn't exist";
        }
    
        const jwtDecoded: any = jwt.verify(data, process.env.JWT_SECRET);
        return jwtDecoded;
      }
      
      catch(error) {
        if (error instanceof TokenExpiredError) {
          return "Token expired";
        }
        return ""
      }    
    }

  public async LoginToken(data): Promise<String> {
    try {
        const token = jwt.sign({
            id : data.id, 
            profile: data.profile,
            name : data.name,
        }, process.env.JWT_SECRET, {
            expiresIn: '1m',
            issuer: '토큰 발급자'
        });
        return token;
    } catch (e) {
      throw e;
    }
  }
}