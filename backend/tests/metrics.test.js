const { calculateEntropy, calculateAverageCodeLength, calculateEfficiency } = require('../src/utils/metrics');

describe('Métricas de Compresión', () => {
  test('Cálculo de Entropía con probabilidades uniformes', () => {
    // 4 símbolos con igual frecuencia -> p = 0.25 cada uno
    // H = -4 * (0.25 * log2(0.25)) = -4 * (0.25 * -2) = 2.0
    const frequencies = [
      { symbol: 'A', frequency: 1, probability: 0.25 },
      { symbol: 'B', frequency: 1, probability: 0.25 },
      { symbol: 'C', frequency: 1, probability: 0.25 },
      { symbol: 'D', frequency: 1, probability: 0.25 }
    ];
    
    const entropy = calculateEntropy(frequencies);
    expect(entropy).toBeCloseTo(2.0, 5);
  });

  test('Cálculo de longitud promedio de código', () => {
    const codeTable = [
      { symbol: 'A', probability: 0.5, code: '0', codeLength: 1 },
      { symbol: 'B', probability: 0.25, code: '10', codeLength: 2 },
      { symbol: 'C', probability: 0.25, code: '11', codeLength: 2 }
    ];
    
    // L = 0.5*1 + 0.25*2 + 0.25*2 = 0.5 + 0.5 + 0.5 = 1.5
    const avgLen = calculateAverageCodeLength(codeTable);
    expect(avgLen).toBeCloseTo(1.5, 5);
  });

  test('Cálculo de eficiencia', () => {
    const entropy = 1.5;
    const avgCodeLength = 1.5;
    
    const efficiency = calculateEfficiency(entropy, avgCodeLength);
    expect(efficiency).toBe(100.0);
  });
});
