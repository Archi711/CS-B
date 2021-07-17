import { Router } from "express"

import client from "../api/db"
import jwtAuth from "../api/middlewares/jwtAuth"

const router = Router()

router.post("/cases", jwtAuth, async (req, res) => {
  console.log("cases add")
  const { data } = req.body
  const { login } = req.body.login
  try {
    const cases = [
      {
        CaseNumber: "Test",
        Description: "Sprawa testowa",
        Answer: "",
        Status: "przyjęta",
        SendDate: "1626444379631",
        ClosingDate: "",
        IDClient: "81a5aa77-cde7-4450-b9b9-d7313473814f",
      },
    ]
    return res.json(cases)
  } catch (e) {
    console.log("error saving case to db: ", e)
    return res.sendStatus(500)
  }
})

router.get("/cases", jwtAuth, async (req, res) => {
  console.log("cases get")
  const { login } = req.body.login

  try {
    return res.json([
      {
        CaseNumber: "Test",
        Description: "Sprawa testowa",
        Answer: null,
        Status: "przyjęta",
        SendDate: 1626444379631,
        ClosingDate: null,
        IDClient: "81a5aa77-cde7-4450-b9b9-d7313473814f",
      },
    ])
  } catch (e) {
    console.log("error getting user cases from db: ", e)
  }
})

export default router
