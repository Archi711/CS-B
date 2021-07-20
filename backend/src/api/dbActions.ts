import client from "./db"

import * as sqlQuery from "../api/sqlQueries"

export const getUserFromDB = async (clientID: string) => {
  try {
    const userResp = await client.query(sqlQuery.clientFullData(clientID))
    const user = userResp.data[0]
    return user
  } catch (e) {
    console.log("Error getting user data from db ", e)
  }
}

export const getClientIDwithCredentials = async (
  login: string,
  password: string
) => {
  try {
    const credentialsIDResp = await client.query(
      sqlQuery.login(login, password)
    )
    const credentialsID = credentialsIDResp.data[0]?.CredentialsID
    if (!credentialsID) return 401
    const clientIDResp = await client.query(sqlQuery.clientID(credentialsID))
    const clientID = clientIDResp.data[0].IDClient
    return clientID
  } catch (e) {
    console.log("Error getting user data from db ", e)
  }
}
