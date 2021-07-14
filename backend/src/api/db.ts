import harperive from 'harperive'

const DB_CONF = {
  harperHost: process.env.DB_HOST,
  schema: process.env.DB_SCHEMA,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  token:''
}

//token: process.env.DB_TOKEN,

const Client = harperive.Client
const client = new Client(DB_CONF)


export default client
