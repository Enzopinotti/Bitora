const { calculateEntropy, calculateAverageCodeLength, calculateEfficiency } = require('../utils/metrics');

// Helper to format nodes nicely for step-by-step display
function formatNodeLabel(node) {
  if (node.symbol !== null) {
    return `'${node.symbol}'`;
  }
  return `(${formatNodeLabel(node.left)}+${formatNodeLabel(node.right)})`;
}

function buildHuffmanTreeWithSteps(frequencies) {
  if (frequencies.length === 0) return { tree: null, steps: [] };

  // Initialize leaves
  let nodes = frequencies.map((f) => ({
    id: `leaf_${f.symbol}`,
    symbol: f.symbol,
    frequency: f.frequency,
    left: null,
    right: null,
  }));

  // If there's only 1 symbol, we handle it specially
  if (nodes.length === 1) {
    const singleNode = nodes[0];
    return {
      tree: singleNode,
      steps: [{
        stepNumber: 1,
        description: `Solo hay un símbolo: ${formatNodeLabel(singleNode)}. No es necesario fusionar nodos.`,
        nodesBefore: [formatNodeLabel(singleNode)],
        nodesAfter: [formatNodeLabel(singleNode)]
      }]
    };
  }

  const steps = [];
  let stepCounter = 1;

  while (nodes.length > 1) {
    // Sort nodes ascending by frequency, and by symbol name for deterministic results
    nodes.sort((a, b) => {
      if (a.frequency !== b.frequency) {
        return a.frequency - b.frequency;
      }
      const labelA = formatNodeLabel(a);
      const labelB = formatNodeLabel(b);
      return labelA.localeCompare(labelB);
    });

    const nodesBefore = nodes.map(n => ({
      label: formatNodeLabel(n),
      frequency: n.frequency
    }));

    // Take two lowest frequency nodes
    const left = nodes.shift();
    const right = nodes.shift();

    // Create a new parent node
    const parent = {
      id: `node_${stepCounter}`,
      symbol: null,
      frequency: left.frequency + right.frequency,
      left,
      right,
    };

    nodes.push(parent);

    const nodesAfter = nodes.map(n => ({
      label: formatNodeLabel(n),
      frequency: n.frequency
    }));

    steps.push({
      stepNumber: stepCounter++,
      description: `Fusión de los dos nodos con menor frecuencia: ${formatNodeLabel(left)} (${left.frequency}) y ${formatNodeLabel(right)} (${right.frequency}) en un nodo padre con frecuencia ${parent.frequency}.`,
      left: { label: formatNodeLabel(left), frequency: left.frequency },
      right: { label: formatNodeLabel(right), frequency: right.frequency },
      mergedLabel: formatNodeLabel(parent),
      nodesBefore,
      nodesAfter
    });
  }

  return { tree: nodes[0], steps };
}

function generateHuffmanCodes(node, code = '', codes = new Map()) {
  if (!node) return codes;

  if (node.symbol !== null) {
    // If it's a single node root tree, code could be empty. We assign '0' in that case.
    codes.set(node.symbol, code || '0');
  } else {
    generateHuffmanCodes(node.left, code + '0', codes);
    generateHuffmanCodes(node.right, code + '1', codes);
  }

  return codes;
}

function huffmanCompress(text, frequencies) {
  const treeInfo = buildHuffmanTreeWithSteps(frequencies);
  const codes = generateHuffmanCodes(treeInfo.tree);
  const entropy = calculateEntropy(frequencies);

  const codeTable = frequencies.map((f) => ({
    ...f,
    code: codes.get(f.symbol) || '',
    codeLength: (codes.get(f.symbol) || '').length,
  }));

  let encodedText = '';
  for (const char of text) {
    encodedText += codes.get(char) || '';
  }

  const originalSize = text.length * 8;
  const compressedSize = encodedText.length;
  const avgCodeLength = calculateAverageCodeLength(codeTable);
  const efficiency = calculateEfficiency(entropy, avgCodeLength);

  return {
    algorithm: 'huffman',
    originalSize,
    compressedSize,
    reductionPercent: originalSize > 0 ? ((originalSize - compressedSize) / originalSize) * 100 : 0,
    averageCodeLength: avgCodeLength,
    efficiency,
    entropy,
    codeTable,
    encodedText,
    tree: treeInfo.tree,
    steps: treeInfo.steps
  };
}

module.exports = {
  huffmanCompress
};
