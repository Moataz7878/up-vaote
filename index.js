import express, { json } from 'express'
import { config } from "dotenv"
config({path:'./env/secret.env'})
import { DBConnection } from './DB/connection.js'
import userRouter from './modules/user/Routesuser.js'
import RouterPost from './modules/post/RoutesPost.js'
import RouterCommint from './modules/commint/RoutesCommint.js'

const app = express()
const port = process.env.port
const BaseURL =process.env.baseUrl

app.use(express.json())
DBConnection()

app.use(`${BaseURL}/use`,userRouter)
app.use(`${BaseURL}/post`,RouterPost)
app.use(`${BaseURL}/commint`,RouterCommint)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))