import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { getSymbolDisplay } from '../../utils/format';

function buildTreeData(node, x = 0, y = 0, level = 0, spread = 200) {
  if (!node) return null;

  const isLeaf = node.symbol !== null;
  const label = isLeaf ? getSymbolDisplay(node.symbol) : '';

  const result = {
    id: `${x}-${y}-${level}`,
    label,
    frequency: node.frequency,
    isLeaf,
    x,
    y,
    children: [],
  };

  const nextSpread = spread * 0.6;
  const nextY = y + 60;

  if (node.left) {
    const leftChild = buildTreeData(node.left, x - spread / 2, nextY, level + 1, nextSpread);
    if (leftChild) result.children.push(leftChild);
  }

  if (node.right) {
    const rightChild = buildTreeData(node.right, x + spread / 2, nextY, level + 1, nextSpread);
    if (rightChild) result.children.push(rightChild);
  }

  return result;
}

function TreeNode({ node, parentX, parentY }) {
  const nodeSize = node.isLeaf ? 36 : 28;

  return (
    <g>
      {/* Connection line to parent */}
      {parentX !== undefined && parentY !== undefined && (
        <line
          x1={parentX}
          y1={parentY + 14}
          x2={node.x}
          y2={node.y - nodeSize / 2}
          stroke="#334155"
          strokeWidth={2}
        />
      )}

      {/* Node circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={nodeSize / 2}
        fill={node.isLeaf ? '#38BDF8' : '#1E293B'}
        stroke={node.isLeaf ? '#38BDF8' : '#334155'}
        strokeWidth={2}
      />

      {/* Node label */}
      {node.isLeaf ? (
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fill="#0F172A"
          fontSize="14"
          fontFamily="monospace"
          fontWeight="bold"
        >
          {node.label}
        </text>
      ) : (
        <text
          x={node.x}
          y={node.y + 4}
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="10"
          fontFamily="monospace"
        >
          {node.frequency}
        </text>
      )}

      {/* Frequency label for leaves */}
      {node.isLeaf && (
        <text
          x={node.x}
          y={node.y + nodeSize / 2 + 14}
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="10"
          fontFamily="monospace"
        >
          {node.frequency}
        </text>
      )}

      {/* Edge labels (0 for left, 1 for right) */}
      {node.children.map((child, index) => {
        const midX = (node.x + child.x) / 2;
        const midY = (node.y + child.y) / 2;
        const offsetX = child.x < node.x ? -10 : 10;
        return (
          <text
            key={child.id}
            x={midX + offsetX}
            y={midY}
            textAnchor="middle"
            fill="#22C55E"
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {index === 0 ? '0' : '1'}
          </text>
        );
      })}

      {/* Render children */}
      {node.children.map((child) => (
        <TreeNode key={child.id} node={child} parentX={node.x} parentY={node.y} />
      ))}
    </g>
  );
}

function getAllNodes(node) {
  const nodes = [node];
  node.children.forEach(child => nodes.push(...getAllNodes(child)));
  return nodes;
}

export function HuffmanTree({ tree }) {
  const treeData = useMemo(() => {
    if (!tree) return null;
    return buildTreeData(tree, 300, 40, 0, 250);
  }, [tree]);

  if (!treeData) {
    return (
      <Card>
        <CardContent style={{ padding: '3rem', textAlign: 'center' }}>
          <p className="text-text-secondary">No hay árbol para mostrar</p>
        </CardContent>
      </Card>
    );
  }

  const allNodes = getAllNodes(treeData);
  const minX = Math.min(...allNodes.map(n => n.x)) - 50;
  const maxX = Math.max(...allNodes.map(n => n.x)) + 50;
  const maxY = Math.max(...allNodes.map(n => n.y)) + 50;
  const width = maxX - minX;
  const height = maxY + 20;

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '1.15rem', fontWeight: 600 }}>
          Árbol de Huffman
        </CardTitle>
        <p className="text-text-secondary" style={{ fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
          Los símbolos más frecuentes están más cerca de la raíz
        </p>
      </CardHeader>
      <CardContent>
        <div style={{ overflowX: 'auto', textAlign: 'center' }}>
          <svg
            width={Math.max(width, 600)}
            height={height}
            viewBox={`${minX} 0 ${width} ${height}`}
            style={{ margin: '0 auto' }}
          >
            <TreeNode node={treeData} />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#38BDF8' }} />
            <span className="text-text-secondary">Símbolo (hoja)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#1E293B', border: '2px solid #334155' }} />
            <span className="text-text-secondary">Nodo interno</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'monospace', color: '#22C55E', fontWeight: 600 }}>0/1</span>
            <span className="text-text-secondary">Código de rama</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
