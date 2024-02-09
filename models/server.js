import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { router as userRouter } from '../routes/user.js'
import { dbConnection } from '../database/config.js'


export class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.usuariosPath = '/api/usuarios'

    //Conectar a base de datos
    this.conectarDB()
    //Middlewares
    this.middlewares()
    //Routes
    this.routes()
  }

  async conectarDB() {
    await dbConnection()
  }

  routes() {
    this.app.use(this.usuariosPath, userRouter)
  }

  middlewares() {
    this.app.use(express.static('public'))
    //Read & Parse of Body
    this.app.use(express.json())
    // Cors
    this.app.use(cors())
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App running at http://localhost:${this.port}`)
    })
  }
}