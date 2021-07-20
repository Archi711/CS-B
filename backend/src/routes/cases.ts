import { Router } from "express"
import { queryOptions } from "harperive"
import { nanoid } from "nanoid"

import { cltCases } from "../api/sqlQueries"

import client from "../api/db"
import jwtAuth from "../api/middlewares/jwtAuth"

const router = Router()

interface ICase {
  Answer: string
  CaseNumber: string
  ClosingDate: number
  Description: string
  IDClient: string
  SendDate: number
  Status: "przyjęta" | "w realizacji" | "zamknięta"
}

router.post("/cases", jwtAuth, async (req, res) => {
  console.log("cases add")
  const { data } = req.body
  const { clientID } = req.body.clientID
  const newCase: ICase = {
    Answer: null,
    CaseNumber: `SC/2021/${nanoid(4)}`,
    ClosingDate: null,
    Description: data,
    IDClient: null,
    SendDate: Date.now(),
    Status: "przyjęta",
  }
  try {
    newCase.IDClient = clientID
    const addCaseOptions: queryOptions = {
      table: "Cases",
      records: [newCase],
    }
    await client.insert(addCaseOptions)
    const cases = (await client.query(cltCases(clientID))).data
    return res.json(cases)
  } catch (e) {
    console.log("error saving case to db: ", e)
    return res.sendStatus(500)
  }
})

router.get("/cases", jwtAuth, async (req, res) => {
  console.log("cases get")
  const { clientID } = req.body.clientID
  try {
    const cases = (await client.query(cltCases(clientID))).data
    return res.json(cases)
  } catch (e) {
    console.log("error getting user cases from db: ", e)
    return res.sendStatus(500)
  }
})

export default router
