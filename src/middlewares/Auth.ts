import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import auth from '../config/auth';

import { AppError } from '../utils/AppError';

interface IPayload {
  sub: string;
}

export class Auth {
  userAuth(request: Request, response: Response, next: NextFunction) {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) throw new AppError('JWT token is missing', 401);

    const [, token] = authHeaders.split(' ');
    
    try {
      const verifyToken = verify(token, auth.jwt.secret);

      const { sub } = verifyToken as IPayload;

      request.user = {
        id: sub
      }

      return next()

    } catch {
      throw new AppError('Invalid token', 401)
    }

  }
}