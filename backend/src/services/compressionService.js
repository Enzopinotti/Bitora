const { huffmanCompress } = require('../algorithms/huffman');
const { shannonFanoCompress } = require('../algorithms/shannonFano');

// Calculates standard frequency array
function analyzeFrequencies(text) {
  const frequencyMap = new Map();

  for (const char of text) {
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
  }

  const total = text.length;
  const frequencies = [];

  frequencyMap.forEach((count, symbol) => {
    frequencies.push({
      symbol,
      frequency: count,
      probability: count / total,
    });
  });

  // Sort by frequency descending, then by symbol label
  return frequencies.sort((a, b) => {
    if (b.frequency !== a.frequency) {
      return b.frequency - a.frequency;
    }
    return a.symbol.localeCompare(b.symbol);
  });
}

function compressText(text, algorithm) {
  const frequencies = analyzeFrequencies(text);
  
  if (algorithm === 'huffman') {
    return huffmanCompress(text, frequencies);
  } else if (algorithm === 'shannon-fano') {
    return shannonFanoCompress(text, frequencies);
  } else {
    throw new Error(`Algoritmo no soportado: ${algorithm}`);
  }
}

function decompressText(encodedText, codeTable) {
  const reverseCodes = new Map();
  for (const entry of codeTable) {
    reverseCodes.set(entry.code, entry.symbol);
  }

  let decodedText = '';
  let currentCode = '';

  for (const bit of encodedText) {
    currentCode += bit;
    if (reverseCodes.has(currentCode)) {
      decodedText += reverseCodes.get(currentCode);
      currentCode = '';
    }
  }

  return decodedText;
}

module.exports = {
  analyzeFrequencies,
  compressText,
  decompressText
};
