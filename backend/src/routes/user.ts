import { Router } from 'express'

import jwtAuth from '../api/middlewares/jwtAuth'
import pool from '../api/db'
import { updateUserData, getUser, userRelogin } from '../api/dbCommands'

export const router = Router()

export const getUserFromDb = async (credentialID: number) => {
  try {
    const user = (await pool.query(getUser(credentialID))).recordset[0]
    if (!user.FirstName) throw new Error("user data empty")
    return user
  }
  catch (e) {
    console.log("error getting user from DB ", e)
  }
}

router.put('/user', jwtAuth, async (req, res) => {
  console.log('update user')
  const { login } = req.body.login
  const data = req.body.data
  try {
    await pool.query(updateUserData(login, data))
    const credentialID = (await pool.query(userRelogin(login))).recordset[0].CredentialsID
    const user = await getUserFromDb(credentialID)
    if (!user?.FirstName) throw new Error('user data empty')
    return res.status(200).json(user)
  }
  catch (e) {
    console.log('Error updating user in db: ', e)
    return res.sendStatus(500)
  }
})


