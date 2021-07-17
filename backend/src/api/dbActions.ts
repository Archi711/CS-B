import client from "./db"

import * as sqlQuery from "../api/sqlQueries"

export const getUserFromDB = async (login: string, password?: string) => {
  try {
    const credentialsIDResp = await client.query(
      password ? sqlQuery.login(login, password) : sqlQuery.relogin(login)
    )
    const credentialsID = credentialsIDResp.data[0]?.CredentialsID
    if (!credentialsID) return 401
    const clientIDResp = await client.query(sqlQuery.clientID(credentialsID))
    const clientID = clientIDResp.data[0].IDClient
    const userResp = await client.query(sqlQuery.clientFullData(clientID))
    const user = userResp.data[0]
    return user
  } catch (e) {
    console.log("Error getting user data from db ", e)
  }
}

export const getClientID = async (login: string) => {
  try {
    const credentialsIDResp = await client.query(sqlQuery.relogin(login))
    const credentialsID = credentialsIDResp.data[0]?.CredentialsID
    if (!credentialsID) return 401
    const clientIDResp = await client.query(sqlQuery.clientID(credentialsID))
    const clientID = clientIDResp.data[0].IDClient
    return clientID
  } catch (e) {
    console.log("Error getting user data from db ", e)
  }
}
