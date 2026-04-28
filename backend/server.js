import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/blogRoutes.js'

const app = express()

await connectDB()

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173' // production frontend
]

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true, // if you need cookies / auth headers
  })
)

app.use(express.json())

// Routes
app.get('/', (req, res) => res.send('API is Working'))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})

export default app
