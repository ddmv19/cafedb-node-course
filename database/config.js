import mongoose from 'mongoose'
import 'dotenv/config'

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN)
    console.log('Database Online')
  } catch (error) {
    console.log(error)
    throw new Error('Error en la conección de la base de datos')
  }
}