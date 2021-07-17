export const login = (login: string, password: string) =>
  `SELECT CredentialsID FROM CS_B.Credentials WHERE Login = '${esc(
    login
  )}' AND Password = '${esc(password)}'`
export const relogin = (login: string) =>
  `SELECT CredentialsID FROM CS_B.Credentials WHERE Login = '${esc(login)}'`
export const clientID = (credentialID: string) =>
  `SELECT IDClient FROM CS_B.ClientsCredentials WHERE IDCredentials = '${esc(
    credentialID
  )}'`
export const clientFullData = (clientID: string) =>
  `SELECT c.FirstName, c.LastName, c.Email, c.PhoneNumber, a.BuildingNumber, a.FlatNumber, a.StreetName, a.PostalCode    FROM CS_B.Clients AS c INNER JOIN CS_B.Addresses AS a ON c.IDAddress = a.AddressID WHERE ClientID = '${esc(
    clientID
  )}'`
export const addressID = (clientID: string) =>
  `SELECT IDAddress FROM CS_B.Clients WHERE ClientID = '${clientID}'`

export const cltCases = (clientID: string) =>
  `SELECT * FROM CS_B.Cases WHERE IDClient = '${clientID}'`

// mysql_real_escape_string
function esc(str: string) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
    switch (char) {
      case "\0":
        return "\\0"
      case "\x08":
        return "\\b"
      case "\x09":
        return "\\t"
      case "\x1a":
        return "\\z"
      case "\n":
        return "\\n"
      case "\r":
        return "\\r"
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char // prepends a backslash to backslash, percent,
      // and double/single quotes
      default:
        return char
    }
  })
}
