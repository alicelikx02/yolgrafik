import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.js'
import haberlerRoutes from './routes/haberler.js'
import programcilarRoutes from './routes/programcilar.js'
import sarkilarRoutes from './routes/sarkilar.js'
import sponsorlarRoutes from './routes/sponsorlar.js'
import ayarlarRoutes from './routes/ayarlar.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/haberler', haberlerRoutes)
app.use('/api/programcilar', programcilarRoutes)
app.use('/api/sarkilar', sarkilarRoutes)
app.use('/api/sponsorlar', sponsorlarRoutes)
app.use('/api/ayarlar', ayarlarRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Radyo Yol API çalışıyor' })
})

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))

  // ❗ Express 5'te app.get('*') hata verebiliyor. Bunun yerine app.use kullan.
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`🎵 Radyo Yol API çalışıyor: http://localhost:${PORT}`)
})

export default app