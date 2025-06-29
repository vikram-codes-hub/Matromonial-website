import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import http from 'http'
import { connectDb } from './config/db.js'
import userRouter from './Routes/UserRoutes.js'
import adminRouter from './Routes/adminroute.js'


const app=express()
const server=http.createServer(app)

connectDb()
app.use(express.json({ limit: '10mb' }))
app.use(cors())
app.get('/',(req,res)=>{
    res.send("API is working")
})
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)
const PORT=process.env.PORT ||5001
server.listen(PORT,()=>console.log("Server is running on the port: "+PORT))