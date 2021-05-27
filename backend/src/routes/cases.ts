import { Router } from 'express'

import pool from '../api/db'
import jwtAuth from '../api/middlewares/jwtAuth'
import { getCases, addCase } from '../api/dbCommands'
export const router = Router()

router.post('/cases', jwtAuth, async (req, res) => {
  console.log('cases add')
  const { data } = req.body
  const { login } = req.body.login
  try {
    console.log(addCase(login, data))
    const response = (await pool.query(addCase(login, data)))
    const cases = await (await pool.query(getCases(login))).recordset
    return res.json(cases)
  }
  catch (e) {
    console.log("error saving case to db: ", e)
    return res.sendStatus(500)
  }
})

router.get('/cases', jwtAuth, async (req, res) => {
  console.log('cases get')
  const { login } = req.body.login

  try {
    const cases = (await pool.query(getCases(login))).recordset
    return res.json(cases)
  }
  catch (e) {
    console.log("error getting user cases from db: ", e)
  }
})
