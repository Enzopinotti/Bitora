const { shannonFanoCompress } = require('../src/algorithms/shannonFano');
const { analyzeFrequencies } = require('../src/services/compressionService');

describe('Algoritmo de Shannon-Fano', () => {
  test('Flujo completo de compresión y descompresión con ABRACADABRA', () => {
    const text = 'ABRACADABRA';
    const frequencies = analyzeFrequencies(text);
    const result = shannonFanoCompress(text, frequencies);

    expect(result.algorithm).toBe('shannon-fano');
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
    const result = shannonFanoCompress(text, frequencies);

    expect(result.codeTable.length).toBe(1);
    expect(result.codeTable[0].code).toBe('0');
  });
});
