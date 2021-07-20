import { Router } from "express"
import client from "../api/db"
import { getUserFromDB } from "../api/dbActions"
import { addressID as addressIDQuery } from "../api/sqlQueries"
import jwtAuth from "../api/middlewares/jwtAuth"

const router = Router()

interface IContactRecord {
  ClientID: string
  PhoneNumber?: number
  Email?: string
}

interface IAddressRecord {
  AddressID: number
  StreetName?: string
  BuildingNumber?: string
  FlatNumber?: string
  PostalCode?: string
}

router.put("/user", jwtAuth, async (req, res) => {
  console.log("update user")
  let addressID
  const { clientID } = req.body.login
  try {
    addressID = await client.query(addressIDQuery(clientID))
    console.log(addressID)
    addressID = addressID.data[0]?.IDAddress
    if (!addressID) throw new Error()
  } catch (e) {
    console.log(e)
    return res.sendStatus(500)
  }
  const contactData = req.body.data.slice(0, 2)
  const addressData = req.body.data.slice(2)
  const contactDBRecord: IContactRecord = Object.assign(
    { ClientID: clientID },
    contactData[0] && { PhoneNumber: contactData[0] },
    contactData[1] && { Email: contactData[1] }
  )
  const addressDBRecord: IAddressRecord = Object.assign(
    { AddressID: addressID },
    addressData[0] && { StreetName: addressData[0] },
    addressData[1] && { BuildingNumber: addressData[1] },
    addressData[2] && { FlatNumber: addressData[2] },
    addressData[3] && { PostalCode: addressData[3] }
  )

  const contactUpdateOptions = {
    table: "Clients",
    records: [contactDBRecord],
  }
  const addressUpdateOptions = {
    table: "Addresses",
    records: [addressDBRecord],
  }
  try {
    client.update(contactUpdateOptions)
    client.update(addressUpdateOptions)
    const user = await getUserFromDB(clientID)
    return res.status(200).json(user)
  } catch (e) {
    console.log("Error updating user in db: ", e)
    return res.sendStatus(500)
  }
})

export default router
