// ============================================================
// CLIENT API SERVICE FOR COMPRESSION
// ============================================================

// Base API URL. In Vite dev mode, we proxy via vite.config.js to /api.
// In production, we use the environment variable VITE_API_URL or default to relative path.
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function analyzeText(text, algorithm = 'huffman') {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, algorithm }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al analizar el texto.');
  }

  return response.json();
}

export async function analyzeFile(file, algorithm = 'huffman') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('algorithm', algorithm);

  const response = await fetch(`${API_BASE_URL}/files/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al analizar el archivo.');
  }

  return response.json();
}

export async function decompressCodes(encodedText, codeTable) {
  const response = await fetch(`${API_BASE_URL}/decompress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ encodedText, codeTable }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al decodificar.');
  }

  return response.json();
}
