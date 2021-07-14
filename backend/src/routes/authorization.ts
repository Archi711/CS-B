import jwt from 'jsonwebtoken'
import { Router } from 'express'
import client from '../api/db'
import jwtAuth from '../api/middlewares/jwtAuth';
const router = Router()

let refreshTokens = Array<string>();

// const getUserFromDb = async (credentialID: number) => {
//   console.log((getUser(credentialID)))
//   try {
//     const user = (await pool.query(getUser(credentialID))).recordset[0]
//     if (!user.FirstName) throw new Error("user data empty")
//     return user
//   }
//   catch (e) {
//     console.log("error getting user from DB ", e)
//   }
// }

router.post('/login', async (req, res) => {
  console.log("login")
  const { login, password } = req.body
  const loginSQL = `SELECT CredentialsID FROM CS_B.Credentials WHERE Login = '${login}' AND Password = '${password}'`

  try {
    const response = await client.query(loginSQL)
    if(response.statusCode !== 200) throw new Error()
    if(response.data[0].CredentialsID){
      const accessToken = jwt.sign({ login }, process.env.ACCESS_SECRET, { expiresIn: '10m' })
      const refreshToken = jwt.sign({ login }, process.env.REFRESH_SECRET)
      const clientIDres = await client.query(
        `SELECT IDClient FROM CS_B.ClientsCredentials WHERE IDCredentials = '${response.data[0].CredentialsID}'`
      )
      console.log(clientIDres.data[0].IDClient)
      const userres = await client.query(
        `SELECT c.FirstName, c.LastName, c.Email, c.PhoneNumber, a.BuildingNumber, a.FlatNumber, a.StreetName, a.PostalCode    FROM CS_B.Clients AS c INNER JOIN CS_B.Addresses AS a ON c.IDAddress = a.AddressID WHERE ClientID = '${clientIDres.data[0].IDClient}'`
      )
      console.log(userres)
      const user = userres.data[0]
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
  // try {
  //   const credentialID = (await pool.query(userRelogin(login))).recordset[0].CredentialsID
  //   const user = await getUserFromDb(credentialID)
  //   if (!user?.FirstName) throw new Error('user data empty')
  //   return res.status(200).json(user)
  // }
  // catch (e) {
  //   console.log('error reloggin ', e)
  //   return res.sendStatus(403)
  // }

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
