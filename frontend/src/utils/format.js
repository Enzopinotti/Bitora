// ============================================================
// FORMATTING UTILITIES FOR UI DISPLAY
// ============================================================

export function formatBytes(bits) {
  const bytes = bits / 8;
  if (bytes < 1024) return `${bytes.toFixed(1)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function getSymbolDisplay(symbol) {
  if (symbol === ' ') return '␣';
  if (symbol === '\n') return '↵';
  if (symbol === '\t') return '→';
  if (symbol === '\r') return '⏎';
  return symbol;
}

export function getSymbolDescription(symbol) {
  if (symbol === ' ') return 'Espacio';
  if (symbol === '\n') return 'Salto de línea (LF)';
  if (symbol === '\t') return 'Tabulación';
  if (symbol === '\r') return 'Retorno de carro (CR)';
  return `Carácter '${symbol}'`;
}
