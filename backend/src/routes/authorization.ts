import { userLogin, userRelogin } from './../api/dbCommands';
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import pool from '../api/db'
import jwtAuth from '../api/middlewares/jwtAuth';
import { getUserFromDb } from './user'
const router = Router()

let refreshTokens = Array<string>();



router.post('/login', async (req, res) => {
  console.log("login")
  const { login, password } = req.body

  try {
    const credentials = (await pool.query(userLogin(login, password))).recordset
    if (credentials[0]) {
      const accessToken = jwt.sign({ login }, process.env.ACCESS_SECRET, { expiresIn: '10m' })
      const refreshToken = jwt.sign({ login }, process.env.REFRESH_SECRET)
      const user = await getUserFromDb(credentials[0].CredentialsID)
      refreshTokens.push(refreshToken)
      res.json({
        accessToken,
        refreshToken,
        user
      })
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

router.post('/relogin', jwtAuth, async (req, res) => {
  console.log('relogin')
  const { login } = req.body.login
  try {
    const credentialID = (await pool.query(userRelogin(login))).recordset[0].CredentialsID
    const user = await getUserFromDb(credentialID)
    if (!user?.FirstName) throw new Error('user data empty')
    return res.status(200).json(user)
  }
  catch (e) {
    console.log('error reloggin ', e)
    return res.sendStatus(403)
  }

})

router.post('/token', (req, res) => {
  console.log("token")
  const { token } = req.body;
  if (!token) return res.sendStatus(401)
  if (!refreshTokens.includes(token)) return res.sendStatus(403)

  jwt.verify(token, process.env.REFRESH_SECRET, (err: Error, login: object) => {
    if (err) return res.sendStatus(403)
  })
})

router.post('/logout', (req, res) => {
  console.log("logout")
  const { token } = req.body
  refreshTokens = refreshTokens.filter(t => t !== token)
  return res.sendStatus(200);
})

export default router