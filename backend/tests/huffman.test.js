const { huffmanCompress } = require('../src/algorithms/huffman');
const { analyzeFrequencies } = require('../src/services/compressionService');

describe('Algoritmo de Huffman', () => {
  test('Flujo completo de compresión y descompresión con ABRACADABRA', () => {
    const text = 'ABRACADABRA';
    const frequencies = analyzeFrequencies(text);
    const result = huffmanCompress(text, frequencies);

    expect(result.algorithm).toBe('huffman');
    expect(result.originalSize).toBe(text.length * 8);
    expect(result.compressedSize).toBeLessThan(result.originalSize);
    expect(result.encodedText.length).toBe(result.compressedSize);
    
    // Decodificar el texto usando la tabla de códigos
    const codeMap = {};
    result.codeTable.forEach(entry => {
      codeMap[entry.code] = entry.symbol;
    });

    let currentCode = '';
    let decoded = '';
    for (let char of result.encodedText) {
      currentCode += char;
      if (codeMap[currentCode] !== undefined) {
        decoded += codeMap[currentCode];
        currentCode = '';
      }
    }

    expect(decoded).toBe(text);
  });

  test('Texto de un único carácter', () => {
    const text = 'AAAAA';
    const frequencies = analyzeFrequencies(text);
    const result = huffmanCompress(text, frequencies);

    expect(result.codeTable.length).toBe(1);
    expect(result.codeTable[0].code).toBe('0');
  });

  test('Manejo de Unicode / Emojis / Caracteres especiales', () => {
    const text = 'hola 👋 ☕ café! 🚀';
    const frequencies = analyzeFrequencies(text);
    const result = huffmanCompress(text, frequencies);

    // Decodificar y validar que coincida
    const codeMap = {};
    result.codeTable.forEach(entry => {
      codeMap[entry.code] = entry.symbol;
    });

    let currentCode = '';
    let decoded = '';
    for (let char of result.encodedText) {
      currentCode += char;
      if (codeMap[currentCode] !== undefined) {
        decoded += codeMap[currentCode];
        currentCode = '';
      }
    }
    expect(decoded).toBe(text);
  });
});
