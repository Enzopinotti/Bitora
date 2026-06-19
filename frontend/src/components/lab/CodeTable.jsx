import React, { useState } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { getSymbolDisplay } from '../../utils/format';

export function CodeTable({ codeTable = [], algorithm }) {
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const filteredTable = codeTable.filter(
    (entry) =>
      entry.symbol.toLowerCase().includes(search.toLowerCase()) ||
      entry.code.includes(search)
  );

  const handleCopy = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card style={{ height: '100%' }}>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <CardTitle style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              Tabla de códigos
            </CardTitle>
            <p className="text-text-secondary" style={{ fontSize: '0.85rem', margin: '0.25rem 0 0', textTransform: 'capitalize' }}>
              {algorithm === 'huffman' ? 'Algoritmo Huffman' : 'Algoritmo Shannon-Fano'}
            </p>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Search className="text-text-muted" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem' }} />
          <input
            type="text"
            placeholder="Buscar símbolo o código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '0.5rem 1rem 0.5rem 2.25rem',
              color: 'var(--color-text)',
              fontSize: '0.875rem',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </CardHeader>
      <CardContent style={{ padding: '0 1.5rem 1.5rem' }}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '0.5rem', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Símbolo</th>
                <th style={{ padding: '0.5rem', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)', textAlign: 'right' }}>Frec.</th>
                <th style={{ padding: '0.5rem', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)', textAlign: 'right' }}>Prob.</th>
                <th style={{ padding: '0.5rem', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Código</th>
                <th style={{ padding: '0.5rem', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)', textAlign: 'right' }}>Bits</th>
                <th style={{ padding: '0.5rem', width: '2.5rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredTable.map((entry, index) => (
                <tr
                  key={index}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '0.5rem' }}>
                    <span className="bg-primary-10" style={{ fontFamily: 'monospace', color: 'var(--color-accent-cyan)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85rem' }}>
                      {getSymbolDisplay(entry.symbol)}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 500 }}>
                    {entry.frequency.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                    {(entry.probability * 100).toFixed(1)}%
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{ fontFamily: 'monospace', color: 'var(--color-accent-green)', fontWeight: 600 }}>
                      {entry.code}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                    {entry.codeLength}
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      style={{ width: '1.75rem', height: '1.75rem', padding: 0 }}
                      onClick={() => handleCopy(entry.code, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-3.5 w-3.5 text-accent" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-text-muted" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredTable.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No se encontraron coincidencias.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
