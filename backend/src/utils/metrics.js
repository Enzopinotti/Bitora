// ============================================================
// METRICS UTILITIES
// ============================================================

function calculateEntropy(frequencies) {
  let entropy = 0;
  for (const { probability } of frequencies) {
    if (probability > 0) {
      entropy -= probability * Math.log2(probability);
    }
  }
  return entropy;
}

function calculateAverageCodeLength(codeTable) {
  let avgCodeLength = 0;
  for (const entry of codeTable) {
    avgCodeLength += entry.probability * (entry.code ? entry.code.length : 0);
  }
  return avgCodeLength;
}

function calculateEfficiency(entropy, averageCodeLength) {
  if (averageCodeLength <= 0) return 0;
  return (entropy / averageCodeLength) * 100;
}

module.exports = {
  calculateEntropy,
  calculateAverageCodeLength,
  calculateEfficiency
};
