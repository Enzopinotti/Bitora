const compressionService = require('../services/compressionService');

// Character length limit for texts to protect server resources
const MAX_TEXT_LENGTH = 100_000;

function validateTextInput(text, res) {
  if (typeof text !== 'string' || text.length === 0) {
    res.status(400).json({ error: 'Se requiere el campo "text" con un texto no vacío.' });
    return false;
  }
  if (text.length > MAX_TEXT_LENGTH) {
    res.status(413).json({ error: `El texto supera el máximo de ${MAX_TEXT_LENGTH} caracteres.` });
    return false;
  }
  return true;
}

function analyze(req, res) {
  try {
    const { text, algorithm = 'huffman' } = req.body || {};
    if (!validateTextInput(text, res)) return;

    if (algorithm !== 'huffman' && algorithm !== 'shannon-fano' && algorithm !== 'compare') {
      return res.status(400).json({ error: 'El algoritmo debe ser "huffman", "shannon-fano" o "compare".' });
    }

    const frequencies = compressionService.analyzeFrequencies(text);

    if (algorithm === 'compare') {
      const huffmanResult = compressionService.compressText(text, 'huffman');
      const shannonResult = compressionService.compressText(text, 'shannon-fano');

      const huffmanDecoded = compressionService.decompressText(huffmanResult.encodedText, huffmanResult.codeTable);
      const shannonDecoded = compressionService.decompressText(shannonResult.encodedText, shannonResult.codeTable);

      const best = huffmanResult.compressedSize <= shannonResult.compressedSize ? 'huffman' : 'shannon-fano';

      return res.json({
        frequencies,
        huffman: {
          ...huffmanResult,
          decodedText: huffmanDecoded,
          isValid: huffmanDecoded === text
        },
        shannonFano: {
          ...shannonResult,
          decodedText: shannonDecoded,
          isValid: shannonDecoded === text
        },
        best,
        difference: Math.abs(huffmanResult.compressedSize - shannonResult.compressedSize)
      });
    }

    const result = compressionService.compressText(text, algorithm);
    const decodedText = compressionService.decompressText(result.encodedText, result.codeTable);

    return res.json({
      frequencies,
      result: {
        ...result,
        decodedText,
        isValid: decodedText === text
      }
    });
  } catch (error) {
    console.error('Error during text analysis:', error);
    return res.status(500).json({ error: 'Ocurrió un error al procesar el texto.' });
  }
}

function analyzeFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Se requiere subir un archivo de texto.' });
    }

    const text = req.file.buffer.toString('utf8');
    if (text.length === 0) {
      return res.status(400).json({ error: 'El archivo está vacío.' });
    }
    if (text.length > MAX_TEXT_LENGTH) {
      return res.status(413).json({ error: `El archivo supera el máximo de ${MAX_TEXT_LENGTH} caracteres.` });
    }

    const { algorithm = 'huffman' } = req.body || {};
    
    // Mimic the same structure as analyze, but context-aware
    const frequencies = compressionService.analyzeFrequencies(text);

    if (algorithm === 'compare') {
      const huffmanResult = compressionService.compressText(text, 'huffman');
      const shannonResult = compressionService.compressText(text, 'shannon-fano');

      const huffmanDecoded = compressionService.decompressText(huffmanResult.encodedText, huffmanResult.codeTable);
      const shannonDecoded = compressionService.decompressText(shannonResult.encodedText, shannonResult.codeTable);

      const best = huffmanResult.compressedSize <= shannonResult.compressedSize ? 'huffman' : 'shannon-fano';

      return res.json({
        fileName: req.file.originalname,
        fileSize: req.file.size,
        frequencies,
        huffman: {
          ...huffmanResult,
          decodedText: huffmanDecoded,
          isValid: huffmanDecoded === text
        },
        shannonFano: {
          ...shannonResult,
          decodedText: shannonDecoded,
          isValid: shannonDecoded === text
        },
        best,
        difference: Math.abs(huffmanResult.compressedSize - shannonResult.compressedSize)
      });
    }

    const result = compressionService.compressText(text, algorithm);
    const decodedText = compressionService.decompressText(result.encodedText, result.codeTable);

    return res.json({
      fileName: req.file.originalname,
      fileSize: req.file.size,
      frequencies,
      result: {
        ...result,
        decodedText,
        isValid: decodedText === text
      }
    });
  } catch (error) {
    console.error('Error during file analysis:', error);
    return res.status(500).json({ error: 'Ocurrió un error al procesar el archivo.' });
  }
}

function decompress(req, res) {
  try {
    const { encodedText, codeTable } = req.body || {};

    if (typeof encodedText !== 'string' || !Array.isArray(codeTable)) {
      return res.status(400).json({
        error: 'Se requiere "encodedText" (string) y "codeTable" (array).'
      });
    }

    const decodedText = compressionService.decompressText(encodedText, codeTable);
    return res.json({ decodedText });
  } catch (error) {
    console.error('Error during decompression:', error);
    return res.status(500).json({ error: 'Ocurrió un error al decodificar.' });
  }
}

module.exports = {
  analyze,
  analyzeFile,
  decompress
};
