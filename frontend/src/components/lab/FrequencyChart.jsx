import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { getSymbolDisplay } from '../../utils/format';

const COLORS = ['#38BDF8', '#22C55E', '#F97316', '#A78BFA', '#F59E0B', '#EF4444'];

export function FrequencyChart({ frequencies = [], codeTable, maxItems = 20 }) {
  const data = frequencies.slice(0, maxItems).map((f, i) => ({
    symbol: getSymbolDisplay(f.symbol),
    frequency: f.frequency,
    probability: (f.probability * 100).toFixed(1),
    color: COLORS[i % COLORS.length],
  }));

  const lengthData = codeTable
    ? frequencies.slice(0, maxItems).map((f, i) => {
        const entry = codeTable.find((c) => c.symbol === f.symbol);
        return {
          symbol: getSymbolDisplay(f.symbol),
          codeLength: entry?.codeLength ?? 0,
          code: entry?.code ?? '',
          color: COLORS[i % COLORS.length],
        };
      })
    : [];

  const chartHeight = Math.max(280, data.length * 26);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
      {/* Frequency chart */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontSize: '1.15rem', fontWeight: 600 }}>
            Frecuencia de símbolos
          </CardTitle>
          <p className="text-text-secondary" style={{ fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
            {frequencies.length > maxItems
              ? `Mostrando los ${maxItems} más frecuentes de ${frequencies.length} símbolos`
              : `${frequencies.length} símbolos detectados`}
          </p>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 10, right: 10 }}>
                <XAxis
                  type="number"
                  tick={{ fill: '#94A3B8', fontSize: 11 }}
                  axisLine={{ stroke: '#334155' }}
                  tickLine={{ stroke: '#334155' }}
                />
                <YAxis
                  type="category"
                  dataKey="symbol"
                  tick={{ fill: '#CBD5E1', fontSize: 11, fontFamily: 'monospace' }}
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  width={25}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                    fontSize: '0.85rem'
                  }}
                  formatter={(value, name, props) => [
                    `${value} veces (${props.payload.probability}%)`,
                    'Frecuencia',
                  ]}
                  labelFormatter={(label) => `Símbolo: "${label}"`}
                />
                <Bar dataKey="frequency" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Code length chart */}
      {codeTable && codeTable.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle style={{ fontSize: '1.15rem', fontWeight: 600 }}>
              Longitud de código (bits)
            </CardTitle>
            <p className="text-text-secondary" style={{ fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
              Bits asignados al código de cada símbolo
            </p>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lengthData} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    tick={{ fill: '#94A3B8', fontSize: 11 }}
                    axisLine={{ stroke: '#334155' }}
                    tickLine={{ stroke: '#334155' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="symbol"
                    tick={{ fill: '#CBD5E1', fontSize: 11, fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#334155' }}
                    tickLine={false}
                    width={25}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                      fontSize: '0.85rem'
                    }}
                    formatter={(value, name, props) => [
                      `${value} bits (${props.payload.code})`,
                      'Longitud',
                    ]}
                    labelFormatter={(label) => `Símbolo: "${label}"`}
                  />
                  <Bar dataKey="codeLength" radius={[0, 4, 4, 0]}>
                    {lengthData.map((entry, index) => (
                      <Cell key={`len-cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
