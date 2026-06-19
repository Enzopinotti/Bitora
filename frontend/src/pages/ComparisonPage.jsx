import React, { useState } from 'react';
import {
  Loader2,
  Scale,
  RotateCcw,
  Trophy,
  TrendingDown,
  Hash,
  Gauge,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Progress } from '../components/common/Progress';

// Import our frontend API service
import { analyzeText } from '../services/compressionApi';

export default function ComparisonPage() {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  // Results
  const [huffmanResult, setHuffmanResult] = useState(null);
  const [shannonFanoResult, setShannonFanoResult] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setError(null);

    try {
      // Call both compression endpoints
      const huffRes = await analyzeText(text, 'huffman');
      const sfRes = await analyzeText(text, 'shannon-fano');

      setHuffmanResult(huffRes);
      setShannonFanoResult(sfRes);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al procesar la comparación de los algoritmos.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setHuffmanResult(null);
    setShannonFanoResult(null);
    setError(null);
  };

  const hasResults = huffmanResult !== null && shannonFanoResult !== null;

  // Determine winner
  let winner = null;
  let winnerResult = null;
  let loserResult = null;
  let differenceBits = 0;

  if (hasResults) {
    if (huffmanResult.compressedSize < shannonFanoResult.compressedSize) {
      winner = 'huffman';
      winnerResult = huffmanResult;
      loserResult = shannonFanoResult;
    } else if (shannonFanoResult.compressedSize < huffmanResult.compressedSize) {
      winner = 'shannon-fano';
      winnerResult = shannonFanoResult;
      loserResult = huffmanResult;
    } else {
      winner = 'tie';
    }
    differenceBits = Math.abs(huffmanResult.compressedSize - shannonFanoResult.compressedSize);
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem 4rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Comparación de algoritmos
        </h1>
        <p className="text-text-secondary">
          Analizá el mismo texto con Huffman y Shannon-Fano para ver cuál logra mejor compresión en cada caso.
        </p>
      </div>

      {/* Input Section */}
      <Card style={{ marginBottom: '2rem' }}>
        <CardContent style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0 }}>Texto a comparar</h2>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribí tu texto aquí..."
                style={{
                  width: '100%',
                  height: '100px',
                  backgroundColor: 'rgba(255,255,255,0.015)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text)',
                  padding: '0.75rem',
                  fontSize: '0.95rem',
                  fontFamily: 'monospace',
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.75rem' }}>
              {error && (
                <div style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.75rem',
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <AlertCircle className="h-4 w-4" style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}
              <Button
                variant="primary"
                size="lg"
                disabled={!text.trim() || isProcessing}
                onClick={handleAnalyze}
                className="gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Comparando...
                  </>
                ) : (
                  <>
                    <Scale className="h-5 w-5" />
                    Comparar algoritmos
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={!text}>
                <RotateCcw className="h-4 w-4" style={{ marginRight: '0.5rem' }} />
                Reiniciar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {!hasResults ? (
        <Card style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardContent style={{ padding: '3rem', textAlign: 'center' }}>
            <div className="bg-primary-10" style={{ width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Compará algoritmos
            </h3>
            <p className="text-text-secondary" style={{ maxWidth: '400px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Ingresá un texto arriba y hacé clic en "Comparar algoritmos" para ver qué método funciona mejor para tu contenido.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Winner Banner */}
          <Card variant="accent-cyan" style={{ border: '2px solid var(--color-accent-cyan)' }}>
            <CardContent style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="bg-primary-10" style={{ padding: '1rem', borderRadius: '12px' }}>
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
                    {winner === 'tie' 
                      ? 'Empate técnico de compresión' 
                      : `${winner === 'huffman' ? 'Huffman' : 'Shannon-Fano'} logró mejor compresión`}
                  </h2>
                  <p className="text-text-secondary" style={{ margin: 0, fontSize: '0.95rem' }}>
                    {winner === 'tie'
                      ? 'Ambos algoritmos comprimieron el texto al mismo tamaño exacto en bits.'
                      : `En este caso, ${winner === 'huffman' ? 'Huffman' : 'Shannon-Fano'} asignó códigos más cortos en promedio, logrando mayor eficiencia.`}
                  </p>
                </div>
                {winner !== 'tie' && (
                  <div style={{ textAlign: 'right' }}>
                    <p className="text-text-muted" style={{ fontSize: '0.8rem', margin: 0 }}>Diferencia</p>
                    <p style={{ fontFamily: 'monospace', fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>
                      {differenceBits.toLocaleString()} bits
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Side by Side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Huffman card */}
            <Card variant={winner === 'huffman' ? 'accent-cyan' : 'default'} style={{ border: winner === 'huffman' ? '2px solid var(--color-accent-cyan)' : '1px solid var(--color-border)' }}>
              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CardTitle style={{ fontSize: '1.25rem', fontWeight: 600 }}>Huffman</CardTitle>
                  {winner === 'huffman' && <Badge variant="cyan">Mejor</Badge>}
                  {winner === 'tie' && <Badge variant="default">Empate</Badge>}
                </div>
              </CardHeader>
              <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.015)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                      <TrendingDown className="h-4 w-4" />
                      <span style={{ fontSize: '0.8rem' }}>Reducción</span>
                    </div>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{huffmanResult.reductionPercent.toFixed(1)}%</p>
                  </div>
                  <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.015)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                      <Hash className="h-4 w-4" />
                      <span style={{ fontSize: '0.8rem' }}>Long. promedio</span>
                    </div>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{huffmanResult.averageCodeLength.toFixed(2)} bits</p>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <span className="text-text-muted" style={{ fontSize: '0.8rem' }}>Tamaño original</span>
                    <p style={{ fontWeight: 600, margin: '2px 0 0' }}>{huffmanResult.originalSize.toLocaleString()} bits</p>
                  </div>
                  <div>
                    <span className="text-text-muted" style={{ fontSize: '0.8rem' }}>Tamaño comprimido</span>
                    <p style={{ fontWeight: 600, margin: '2px 0 0' }}>{huffmanResult.compressedSize.toLocaleString()} bits</p>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span className="text-text-secondary">Eficiencia del árbol</span>
                    <span>{Math.min(huffmanResult.efficiency, 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(huffmanResult.efficiency, 100)} />
                </div>
              </CardContent>
            </Card>

            {/* Shannon-Fano card */}
            <Card variant={winner === 'shannon-fano' ? 'accent-cyan' : 'default'} style={{ border: winner === 'shannon-fano' ? '2px solid var(--color-accent-cyan)' : '1px solid var(--color-border)' }}>
              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CardTitle style={{ fontSize: '1.25rem', fontWeight: 600 }}>Shannon-Fano</CardTitle>
                  {winner === 'shannon-fano' && <Badge variant="cyan">Mejor</Badge>}
                  {winner === 'tie' && <Badge variant="default">Empate</Badge>}
                </div>
              </CardHeader>
              <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.015)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                      <TrendingDown className="h-4 w-4" />
                      <span style={{ fontSize: '0.8rem' }}>Reducción</span>
                    </div>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{shannonFanoResult.reductionPercent.toFixed(1)}%</p>
                  </div>
                  <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.015)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                      <Hash className="h-4 w-4" />
                      <span style={{ fontSize: '0.8rem' }}>Long. promedio</span>
                    </div>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{shannonFanoResult.averageCodeLength.toFixed(2)} bits</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <span className="text-text-muted" style={{ fontSize: '0.8rem' }}>Tamaño original</span>
                    <p style={{ fontWeight: 600, margin: '2px 0 0' }}>{shannonFanoResult.originalSize.toLocaleString()} bits</p>
                  </div>
                  <div>
                    <span className="text-text-muted" style={{ fontSize: '0.8rem' }}>Tamaño comprimido</span>
                    <p style={{ fontWeight: 600, margin: '2px 0 0' }}>{shannonFanoResult.compressedSize.toLocaleString()} bits</p>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span className="text-text-secondary">Eficiencia del árbol</span>
                    <span>{Math.min(shannonFanoResult.efficiency, 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(shannonFanoResult.efficiency, 100)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
