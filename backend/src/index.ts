
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import pool from './api/db'
import routes from './routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes.forEach(route => {
  app.use(route)
});


pool.connect().then(() => {
  app.listen(process.env.APP_PORT, () => console.log(`App on port: ${process.env.APP_PORT}`))
})

