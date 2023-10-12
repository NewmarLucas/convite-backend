import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = String(process.env?.JWT_SECRET_KEY);

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization');

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Token não fornecido' });
  }

  const jwtToken = token?.replace('Bearer ', '');
  jwt.verify(jwtToken, secretKey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: 'Token inválido' });
    }
    // @ts-expect-error
    req.user = user; // O usuário autenticado está disponível em req.user
    next();
  });
}
