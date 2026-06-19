import React from 'react';

const options = [
  { value: 'huffman', label: 'Huffman' },
  { value: 'shannon-fano', label: 'Shannon-Fano' },
  { value: 'compare', label: 'Comparar ambos' },
];

export function AlgorithmSelector({ value, onChange }) {
  return (
    <div style={{
      display: 'inline-flex',
      backgroundColor: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: '8px',
      padding: '4px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = isActive ? 'var(--color-accent-cyan)' : 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = isActive ? 'var(--color-accent-cyan)' : 'transparent'}
            aria-pressed={isActive}
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: isActive ? '2px solid var(--color-accent-cyan)' : '2px solid var(--color-border)',
              cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s, border 0.2s',
              backgroundColor: isActive ? 'var(--color-accent-cyan)' : 'transparent',
              color: isActive ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-sans)',
              outline: 'none'
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
