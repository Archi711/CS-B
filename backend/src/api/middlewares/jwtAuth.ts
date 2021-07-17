import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export default function jwtAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = Object.keys(req.body).includes("token")
    ? req.body
    : req.headers
  if (token == null) res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_SECRET, (err: any, login: any) => {
    if (err) {
      console.log("auth err: ", err)
      return res.sendStatus(403)
    }
    req.body = { ...req.body, login }
    next()
  })
}
