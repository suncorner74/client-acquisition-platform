import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import leadRoutes from './routes/leadRoutes.js'

const app = express()
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.use(rateLimit({ windowMs: 15*60*1000, limit: 200, standardHeaders: true }))
app.get('/api/health', (_,res)=>res.json({success:true,message:'API is healthy'}))
app.use('/api/leads', leadRoutes)
app.use((err,req,res,next)=>{
  console.error(err)
  res.status(err.status || 500).json({success:false,message:'Something went wrong. Please try again.',errors:[]})
})

const port = process.env.PORT || 5000
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(()=>app.listen(port,()=>console.log(`API running on ${port}`)))
    .catch(err=>{ console.error('MongoDB connection failed',err); process.exit(1) })
} else {
  app.listen(port,()=>console.log(`API running on ${port} (MongoDB not configured)`))
}
