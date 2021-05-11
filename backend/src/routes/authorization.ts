import { userLogin, getUser } from './../api/dbCommands';
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import pool from '../api/db'
const router = Router()

let refreshTokens = Array<string>();

router.post('/login', async (req, res) => {
  const { login, password } = req.body

  try {
    const credentials = (await pool.query(userLogin(login, password))).recordset
    if (credentials[0]) {
      const accessToken = jwt.sign({ login }, process.env.ACCESS_SECRET, { expiresIn: '10m' })
      const refreshToken = jwt.sign({ login }, process.env.REFRESH_SECRET)
      try {
        const user = (await pool.query(getUser(credentials[0].CredentialsID))).recordset[0]
        if (!user.FirstName) throw new Error("user data empty")
        refreshTokens.push(refreshToken)

        res.json({
          accessToken,
          refreshToken,
          user
        })
      }
      catch (e) {
        console.log("error getting data from DB ", e)
      }
    }
    else {
      return res.sendStatus(401)
    }
  }
  catch (e) {
    console.log("error getting data from DB", e)
    return res.sendStatus(500)
  }
})

router.post('/token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401)
  if (!refreshTokens.includes(token)) return res.sendStatus(403)

  jwt.verify(token, process.env.REFRESH_SECRET, (err: Error, login: object) => {
    if (err) return res.sendStatus(403)
  })
})

router.post('/logout', (req, res) => {
  const { token } = req.body
  refreshTokens = refreshTokens.filter(t => t !== token)
  return res.sendStatus(200);
})

export default router