import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT,
  mongoURL: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  token: process.env.TOKEN
}