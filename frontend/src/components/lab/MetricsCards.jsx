import React from 'react';
import { Card, CardContent } from '../common/Card';
import { 
  FileText, 
  Archive, 
  TrendingDown, 
  Gauge, 
  Hash, 
  Trophy,
  Percent
} from 'lucide-react';
import { formatBytes } from '../../utils/format';

function MetricCard({ icon, label, value, subValue, colorClass }) {
  return (
    <Card>
      <CardContent style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <div className={colorClass} style={{ padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="text-text-muted" style={{ fontSize: '0.8rem', margin: '0 0 2px' }}>{label}</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</p>
            {subValue && (
              <p className="text-text-secondary" style={{ fontSize: '0.75rem', margin: '2px 0 0' }}>{subValue}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricsCards({ result, comparisonResult }) {
  if (!result) return null;

  const safeOriginalSize = result.originalSize?.toLocaleString() ?? '0';
  const safeCompressedSize = result.compressedSize?.toLocaleString() ?? '0';
  const safeReduction = (result.originalSize && result.compressedSize)
    ? (result.originalSize - result.compressedSize).toLocaleString()
    : '0';

  const bestAlgorithm = comparisonResult
    ? (result.compressedSize <= comparisonResult.compressedSize ? result.algorithm : comparisonResult.algorithm)
    : result.algorithm;

  const metrics = [
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      label: 'Tamaño original',
      value: formatBytes(result.originalSize),
      subValue: `${safeOriginalSize} bits`,
      colorClass: 'bg-primary-10',
    },
    {
      icon: <Archive className="h-5 w-5 text-accent" />,
      label: 'Tamaño comprimido',
      value: formatBytes(result.compressedSize),
      subValue: `${safeCompressedSize} bits`,
      colorClass: 'bg-accent-10',
    },
    {
      icon: <TrendingDown className="h-5 w-5 text-accent-orange" />,
      label: 'Reducción lograda',
      value: `${result.reductionPercent?.toFixed(1) ?? '0'}%`,
      subValue: `${safeReduction} bits menos`,
      colorClass: 'bg-accent-orange-10',
    },
    {
      icon: <Gauge className="h-5 w-5 text-accent-purple" />,
      label: 'Eficiencia',
      value: `${Math.min(result.efficiency ?? 0, 100).toFixed(1)}%`,
      subValue: `Entropía: ${result.entropy?.toFixed(3) ?? '0'}`,
      colorClass: 'bg-accent-purple-10',
    },
    {
      icon: <Hash className="h-5 w-5 text-primary" />,
      label: 'Long. promedio',
      value: `${result.averageCodeLength?.toFixed(2) ?? '0'} bits`,
      subValue: 'Por símbolo',
      colorClass: 'bg-primary-10',
    },
    {
      icon: <Percent className="h-5 w-5 text-accent" />,
      label: 'Caracteres únicos',
      value: (result.codeTable?.length ?? 0).toString(),
      subValue: 'En el alfabeto',
      colorClass: 'bg-accent-10',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Best Result Badge */}
      {comparisonResult && (
        <Card variant="accent-cyan" style={{ border: '1px solid var(--color-accent-cyan)' }}>
          <CardContent style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="bg-accent-10" style={{ padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-text-muted" style={{ fontSize: '0.8rem', margin: 0 }}>Mejor algoritmo para este texto</p>
                <p style={{ fontWeight: 600, margin: 0, textTransform: 'capitalize' }}>
                  {bestAlgorithm === 'huffman' ? 'Huffman' : 'Shannon-Fano'}
                </p>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <p className="text-text-muted" style={{ fontSize: '0.8rem', margin: 0 }}>Diferencia</p>
                <p style={{ fontFamily: 'monospace', fontWeight: 600, margin: 0 }}>
                  {Math.abs(result.compressedSize - comparisonResult.compressedSize).toLocaleString()} bits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
