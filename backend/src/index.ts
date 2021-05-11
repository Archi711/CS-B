
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import pool from './api/db'
<<<<<<< HEAD
//import routes from './routes'
=======
import routes from './routes'
>>>>>>> main

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
<<<<<<< HEAD
=======
routes.forEach(route => {
  app.use(route)
});
>>>>>>> main


pool.connect().then(() => {
  app.listen(process.env.APP_PORT, () => console.log(`App on port: ${process.env.APP_PORT}`))
})

