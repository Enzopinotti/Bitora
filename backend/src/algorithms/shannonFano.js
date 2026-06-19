const { calculateEntropy, calculateAverageCodeLength, calculateEfficiency } = require('../utils/metrics');

function shannonFanoRecursive(symbols, codes, currentCode = '', steps = [], context = { stepCounter: 1, level: 0 }) {
  if (symbols.length === 0) return;

  if (symbols.length === 1) {
    const sym = symbols[0];
    codes.set(sym.symbol, currentCode || '0');
    // If it's the root and only node, assign code '0'
    return;
  }

  const totalFreq = symbols.reduce((sum, s) => sum + s.frequency, 0);
  let runningSum = 0;
  let splitIndex = 0;
  let minDiff = Infinity;

  for (let i = 0; i < symbols.length - 1; i++) {
    runningSum += symbols[i].frequency;
    const diff = Math.abs(2 * runningSum - totalFreq);
    if (diff < minDiff) {
      minDiff = diff;
      splitIndex = i + 1;
    }
  }

  const leftGroup = symbols.slice(0, splitIndex);
  const rightGroup = symbols.slice(splitIndex);

  const leftSum = leftGroup.reduce((sum, s) => sum + s.frequency, 0);
  const rightSum = rightGroup.reduce((sum, s) => sum + s.frequency, 0);

  const stepNumber = context.stepCounter++;
  const groupLabels = symbols.map(s => `'${s.symbol}'`).join(', ');
  const leftLabels = leftGroup.map(s => `'${s.symbol}'`).join(', ');
  const rightLabels = rightGroup.map(s => `'${s.symbol}'`).join(', ');

  steps.push({
    stepNumber,
    level: context.level,
    description: `División del grupo [${groupLabels}] (frecuencia total = ${totalFreq}) en: grupo izquierdo [${leftLabels}] (suma = ${leftSum}, código +='0') y grupo derecho [${rightLabels}] (suma = ${rightSum}, código +='1').`,
    parentGroup: symbols.map(s => ({ symbol: s.symbol, frequency: s.frequency })),
    leftGroup: leftGroup.map(s => ({ symbol: s.symbol, frequency: s.frequency })),
    rightGroup: rightGroup.map(s => ({ symbol: s.symbol, frequency: s.frequency })),
    leftSum,
    rightSum
  });

  // Assign codes to groups
  leftGroup.forEach(s => {
    const existing = codes.get(s.symbol) || '';
    codes.set(s.symbol, existing + '0');
  });

  rightGroup.forEach(s => {
    const existing = codes.get(s.symbol) || '';
    codes.set(s.symbol, existing + '1');
  });

  // Recurse
  const nextLevel = context.level + 1;
  shannonFanoRecursive(leftGroup, codes, currentCode + '0', steps, { ...context, level: nextLevel });
  shannonFanoRecursive(rightGroup, codes, currentCode + '1', steps, { ...context, level: nextLevel });
}

function shannonFanoCompress(text, frequencies) {
  const codes = new Map();
  // Initialize symbols in the codes map
  frequencies.forEach(f => codes.set(f.symbol, ''));

  const steps = [];
  const context = { stepCounter: 1, level: 0 };
  
  shannonFanoRecursive(frequencies, codes, '', steps, context);
  const entropy = calculateEntropy(frequencies);

  const codeTable = frequencies.map((f) => ({
    ...f,
    code: codes.get(f.symbol) || '0', // Fallback to '0' if single character
    codeLength: (codes.get(f.symbol) || '0').length,
  }));

  let encodedText = '';
  for (const char of text) {
    encodedText += codes.get(char) || '0';
  }

  const originalSize = text.length * 8;
  const compressedSize = encodedText.length;
  const avgCodeLength = calculateAverageCodeLength(codeTable);
  const efficiency = calculateEfficiency(entropy, avgCodeLength);

  return {
    algorithm: 'shannon-fano',
    originalSize,
    compressedSize,
    reductionPercent: originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0,
    averageCodeLength: avgCodeLength,
    efficiency,
    entropy,
    codeTable,
    encodedText,
    steps
  };
}

module.exports = {
  shannonFanoCompress
};
