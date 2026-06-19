import React, { useState, useEffect } from 'react';
import { Copy, Check, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { decompressCodes } from '../../services/compressionApi';
export function EncodedTextView({ originalText, result }) {
  if (!result) return null;

  const [copied, setCopied] = useState(false);
  const [showDecoded, setShowDecoded] = useState(false);
  const [decodedText, setDecodedText] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!result) return;
    // Try to decode locally using the codeTable first
    try {
      const codeMap = {};
      result.codeTable.forEach(entry => {
        codeMap[entry.code] = entry.symbol;
      });

      let currentCode = '';
      let decoded = '';
      for (let i = 0; i < (result?.encodedText?.length || 0); i++) {
        currentCode += result.encodedText[i];
        if (codeMap[currentCode] !== undefined) {
          decoded += codeMap[currentCode];
          currentCode = '';
        }
      }
      setDecodedText(decoded);
      setIsValid(decoded === originalText);
    } catch (err) {
      console.error('Local decoding failed, trying API...', err);
      // Fallback to API decoding if local decoding encounters issues
      decompressCodes(result?.encodedText, result?.codeTable)
        .then(res => {
          setDecodedText(res.decodedText);
          setIsValid(res.decodedText === originalText);
        })
        .catch(console.error);
    }
  }, [originalText, result]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.encodedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Format encoded text with line breaks for readability
  const formattedEncoded = result?.encodedText?.match(/.{1,64}/g)?.join('\n') || result?.encodedText || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Original Text */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontSize: '1.15rem', fontWeight: 600 }}>
            Texto original
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
            <pre style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
              {originalText}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Encoded Text */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <CardTitle style={{ fontSize: '1.15rem', fontWeight: 600 }}>
                Texto codificado
              </CardTitle>
              <p className="text-text-secondary" style={{ fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
                {result?.encodedText?.length?.toLocaleString() ?? 0} bits
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar binario
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
            <pre style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-accent-green)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
              {formattedEncoded}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Decoded Text */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CardTitle style={{ fontSize: '1.15rem', fontWeight: 600 }}>
              Texto decodificado
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowDecoded(!showDecoded)}>
              {showDecoded ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showDecoded ? (
            <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
              <pre style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0 }}>
                {decodedText}
              </pre>
            </div>
          ) : (
            <p className="text-text-muted" style={{ fontSize: '0.85rem', fontStyle: 'italic', margin: 0 }}>
              Hacé clic en "Mostrar" para ver el texto decodificado
            </p>
          )}
        </CardContent>
      </Card>

      {/* Validation */}
      <Card variant={isValid ? 'success' : 'error'}>
        <CardContent style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div className={isValid ? 'bg-accent-10' : 'bg-error-10'} style={{ padding: '0.5rem', borderRadius: '8px' }}>
              <CheckCircle2 className={`h-5 w-5 ${isValid ? 'text-accent' : 'text-error'}`} />
            </div>
            <div>
              <p style={{ fontWeight: 600, margin: 0, color: isValid ? 'var(--color-success)' : 'var(--color-error)' }}>
                {isValid ? 'Validación exitosa' : 'Error en la validación'}
              </p>
              <p className="text-text-secondary" style={{ fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
                {isValid
                  ? 'El texto fue decodificado correctamente. No hubo pérdida de información.'
                  : 'El texto decodificado no coincide con el original.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
