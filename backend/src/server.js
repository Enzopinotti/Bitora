// ============================================================
// Servidor Express de Bitora
// ============================================================
const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes')

const app = express()
const PORT = process.env.PORT || 4000

// CORS: en produccion limitamos al dominio del frontend (Vercel).
// Configurable via la variable de entorno FRONTEND_URL.
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((o) => o.trim())
  : '*'

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  })
)

// Permite cuerpos JSON grandes (textos largos)
app.use(express.json({ limit: '2mb' }))

// Rutas de la API bajo /api
app.use('/api', apiRouter)

// Ruta raiz informativa
app.get('/', (_req, res) => {
  res.json({
    name: 'Bitora API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/compress', '/api/compare', '/api/decompress'],
  })
})

// Manejo de rutas no encontradas
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' })
})

app.listen(PORT, () => {
  console.log(`[bitora-backend] escuchando en el puerto ${PORT}`)
})
