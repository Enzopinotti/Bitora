import React, { useState } from 'react';
import {
  Loader2,
  Play,
  RotateCcw,
  Download,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/common/Tabs';

// Import our migrated lab components
import { TextInput } from '../components/lab/TextInput';
import { AlgorithmSelector } from '../components/lab/AlgorithmSelector';
import { MetricsCards } from '../components/lab/MetricsCards';
import { FrequencyChart } from '../components/lab/FrequencyChart';
import { CodeTable } from '../components/lab/CodeTable';
import { HuffmanTree } from '../components/lab/HuffmanTree';
import { EncodedTextView } from '../components/lab/EncodedTextView';

// Import our frontend API service
import { analyzeText } from '../services/compressionApi';

export default function LaboratoryPage() {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState('huffman'); // 'huffman' | 'shannon-fano' | 'compare'
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // States for results from the API
  const [frequencies, setFrequencies] = useState([]);
  const [huffmanResult, setHuffmanResult] = useState(null);
  const [shannonFanoResult, setShannonFanoResult] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsProcessing(true);
    setError(null);

    try {
      if (algorithm === 'huffman' || algorithm === 'compare') {
        const res = await analyzeText(text, 'huffman');
        setFrequencies(res.frequencies || []);
        setHuffmanResult(res);
      } else {
        setHuffmanResult(null);
      }

      if (algorithm === 'shannon-fano' || algorithm === 'compare') {
        const res = await analyzeText(text, 'shannon-fano');
        setFrequencies(res.frequencies || []);
        setShannonFanoResult(res);
      } else {
        setShannonFanoResult(null);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Ocurrió un error al procesar el texto.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setFrequencies([]);
    setHuffmanResult(null);
    setShannonFanoResult(null);
    setError(null);
  };

  // Called when a .bitora export is loaded
  const handleBitoraLoaded = (data) => {
    if (!data) return;
    
    setText(data.originalText || '');
    setFrequencies(data.frequencies || []);
    
    if (data.algorithm === 'huffman') {
      setAlgorithm('huffman');
      setHuffmanResult(data);
      setShannonFanoResult(null);
    } else if (data.algorithm === 'shannon-fano') {
      setAlgorithm('shannon-fano');
      setShannonFanoResult(data);
      setHuffmanResult(null);
    }
  };

  const handleDownload = () => {
    const result = algorithm === 'shannon-fano' ? shannonFanoResult : huffmanResult;
    if (!result) return;

    const content = JSON.stringify({
      algorithm: result.algorithm,
      originalText: text,
      encodedText: result.encodedText,
      codeTable: result.codeTable,
      frequencies: frequencies,
      originalSize: result.originalSize,
      compressedSize: result.compressedSize,
      reductionPercent: result.reductionPercent,
      averageCodeLength: result.averageCodeLength,
      efficiency: result.efficiency,
      entropy: result.entropy,
      tree: result.tree, // Huffman tree if available
      steps: result.steps  // Partition steps if available
    }, null, 2);

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bitora-${result.algorithm}-result.bitora`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentResult = algorithm === 'shannon-fano' ? shannonFanoResult : huffmanResult;
  const hasResults = huffmanResult !== null || shannonFanoResult !== null;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem 4rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Laboratorio de compresión
        </h1>
        <p className="text-text-secondary">
          Ingresá texto, cargá un archivo o importá una sesión previa para analizar los algoritmos.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Left Panel - Input Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Text Input */}
          <Card>
            <CardContent style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                Entrada de texto
              </h2>
              <TextInput 
                value={text} 
                onChange={setText} 
                onClear={handleClear}
                onBitoraLoaded={handleBitoraLoaded}
              />
            </CardContent>
          </Card>

          {/* Algorithm Selection */}
          <Card>
            <CardContent style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                Algoritmo
              </h2>
              <AlgorithmSelector value={algorithm} onChange={setAlgorithm} />
            </CardContent>
          </Card>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#ef4444',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle className="h-4 w-4" style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!text.trim() || isProcessing}
              onClick={handleAnalyze}
              className="gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Analizar y comprimir
                </>
              )}
            </Button>
            
            {hasResults && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button variant="outline" onClick={handleClear} style={{ flex: 1 }}>
                  <RotateCcw className="h-4 w-4" style={{ marginRight: '0.5rem' }} />
                  Reiniciar
                </Button>
                <Button variant="outline" onClick={handleDownload} style={{ flex: 1 }}>
                  <Download className="h-4 w-4" style={{ marginRight: '0.5rem' }} />
                  Descargar
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Results */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {!hasResults ? (
            <Card style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
              <CardContent style={{ padding: '3rem', textAlign: 'center' }}>
                <div className="bg-primary-10" style={{ width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <AlertCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Sin resultados todavía
                </h3>
                <p className="text-text-secondary" style={{ maxWidth: '400px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  Ingresá un texto en el panel izquierdo y hacé clic en "Analizar y comprimir" para ver los resultados de la codificación.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Metrics cards */}
              <MetricsCards 
                result={algorithm === 'compare' ? huffmanResult : currentResult}
                comparisonResult={algorithm === 'compare' ? shannonFanoResult : undefined}
              />

              {/* Tabs */}
              <Tabs defaultValue="frequencies">
                <TabsList>
                  <TabsTrigger value="frequencies">Frecuencias</TabsTrigger>
                  <TabsTrigger value="codes">Códigos</TabsTrigger>
                  {(algorithm === 'huffman' || algorithm === 'compare') && huffmanResult?.tree && (
                    <TabsTrigger value="tree">Árbol</TabsTrigger>
                  )}
                  <TabsTrigger value="encoded">Codificación</TabsTrigger>
                </TabsList>
                
                <TabsContent value="frequencies">
                  <FrequencyChart
                    frequencies={frequencies}
                    codeTable={
                      algorithm === 'compare'
                        ? huffmanResult?.codeTable
                        : currentResult?.codeTable
                    }
                  />
                </TabsContent>
                
                <TabsContent value="codes">
                  {algorithm === 'compare' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                      {huffmanResult && (
                        <CodeTable codeTable={huffmanResult.codeTable} algorithm="huffman" />
                      )}
                      {shannonFanoResult && (
                        <CodeTable codeTable={shannonFanoResult.codeTable} algorithm="shannon-fano" />
                      )}
                    </div>
                  ) : (
                    currentResult && (
                      <CodeTable codeTable={currentResult.codeTable} algorithm={algorithm} />
                    )
                  )}
                </TabsContent>
                
                {(algorithm === 'huffman' || algorithm === 'compare') && huffmanResult?.tree && (
                  <TabsContent value="tree">
                    <HuffmanTree tree={huffmanResult.tree} />
                  </TabsContent>
                )}
                
                <TabsContent value="encoded">
                  {currentResult && (
                    <EncodedTextView originalText={text} result={currentResult} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
