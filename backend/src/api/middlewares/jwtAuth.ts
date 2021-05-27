import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export default function jwtAuth(req: Request, res: Response, next: NextFunction) {
  const { token } = req.headers || req.body
  if (token == null) res.sendStatus(401)

  jwt.verify(token as string, process.env.ACCESS_SECRET, (err: any, login: any) => {
    if (err) {
      console.log("auth err: ", err)
      return res.sendStatus(403)
    }
    req.body = { ...req.body, login }
    next()
  })
}