// ============================================================
// Rutas REST de la API de Bitora (Refactorizado)
// ============================================================
const express = require('express');
const multer = require('multer');
const compressionController = require('./controllers/compressionController');

const router = express.Router();

// Configure multer for memory storage file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024 // Limit text files to 1MB
  }
});

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'bitora-backend', timestamp: new Date().toISOString() });
});

// Endpoint to compress text
router.post('/analyze', compressionController.analyze);

// Endpoint to compress files
router.post('/files/analyze', upload.single('file'), compressionController.analyzeFile);

// Endpoint to decompress binary codes
router.post('/decompress', compressionController.decompress);

module.exports = router;
