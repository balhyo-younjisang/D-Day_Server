import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import { TokenExpiredError } from "jsonwebtoken";
import TokenService from "@/services/token";
import { Container } from "typedi";
import { IToken } from "@/interface/IToken";
dotenv.config();

const jwt = require('jsonwebtoken');
export interface NextRequest extends Request{
  verifiedToken: string | Object;
}

export const verifyToken = (req: NextRequest, res: Response, next: NextFunction) => {
  // 인증 완료
  try {
    const userToken = req.headers.authorization;
    const TokenServiceInstance = Container.get(TokenService);
    const response:string | object = TokenServiceInstance.verifyToken(userToken);
    req.verifiedToken = response;
    return next();
  }
  
  // 인증 실패 
  catch(error) {
    if (error instanceof TokenExpiredError) {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.'
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다.'
    });
  }
}