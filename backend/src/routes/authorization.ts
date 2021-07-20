import jwt from 'jsonwebtoken'
import { Router } from "express"
import jwtAuth from "../api/middlewares/jwtAuth"
import { getClientIDwithCredentials, getUserFromDB } from "../api/dbActions"
const router = Router()

let refreshTokens = Array<string>()

router.post("/login", async (req, res) => {
  console.log("login")
  const { login, password } = req.body

  try {
    const clientID = await getClientIDwithCredentials(login, password)
    const user = await getUserFromDB(clientID)
    if (clientID === 401 || !user) return res.sendStatus(401)
    const accessToken = jwt.sign({ clientID }, process.env.ACCESS_SECRET, {
      expiresIn: "10m",
    })
    const refreshToken = jwt.sign({ clientID }, process.env.REFRESH_SECRET)
    refreshTokens.push(refreshToken)
    res.json({
      accessToken,
      refreshToken,
      user,
    })
  } catch (e) {
    console.log("error getting data from DB", e)
    return res.sendStatus(500)
  }
})

router.post("/relogin", jwtAuth, async (req, res) => {
  console.log("relogin")
  const { clientID } = req.body.clientID
  try {
    const user = await getUserFromDB(clientID)
    if (!user?.FirstName) throw new Error("user data empty")
    return res.status(200).json(user)
  } catch (e) {
    console.log("error relogging ", e)
    return res.sendStatus(403)
  }
})

router.post("/token", (req, res) => {
  console.log("token")
  const { token } = req.body
  if (!token) return res.sendStatus(401)
  if (!refreshTokens.includes(token)) return res.sendStatus(403)

  jwt.verify(
    token,
    process.env.REFRESH_SECRET,
    (err: Error, clientID: object) => {
      if (err) return res.sendStatus(403)
    }
  )
})

router.post('/logout', (req, res) => {
  console.log("logout")
  const { token } = req.body
  refreshTokens = refreshTokens.filter(t => t !== token)
  return res.sendStatus(200);
})

export default router
