import React, { useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '../common/Button';

export function TextInput({ value, onChange, onClear, onBitoraLoaded }) {
  const handleFileUpload = useCallback(
    (file) => {
      const reader = new FileReader();
      
      // If it's a .bitora file, parse the JSON
      if (file.name.endsWith('.bitora') || file.name.endsWith('.json')) {
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result);
            if (data.originalText !== undefined) {
              if (onBitoraLoaded) {
                onBitoraLoaded(data);
              } else {
                onChange(data.originalText);
              }
            } else {
              alert('El archivo cargado no contiene el formato compatible de Bitora.');
            }
          } catch (err) {
            alert('Error al leer el archivo compatible de Bitora.');
          }
        };
        reader.readAsText(file);
        return;
      }

      // Default to plain text
      reader.onload = (e) => {
        const content = e.target?.result || '';
        onChange(content);
      };
      reader.readAsText(file);
    },
    [onChange, onBitoraLoaded]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Text Area */}
      <div style={{ position: 'relative' }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribí o pegá el texto que querés analizar..."
          style={{
            width: '100%',
            minHeight: '200px',
            backgroundColor: 'rgba(255,255,255,0.015)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            color: 'var(--color-text)',
            padding: '1rem 2.5rem 1rem 1rem',
            fontSize: '0.95rem',
            fontFamily: 'monospace',
            resize: 'vertical',
            outline: 'none',
            lineHeight: '1.5'
          }}
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              width: '2rem',
              height: '2rem',
              padding: 0
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* File Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          position: 'relative',
          border: '2px dashed var(--color-border)',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
          backgroundColor: 'rgba(255, 255, 255, 0.005)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-accent-cyan)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
      >
        <input
          type="file"
          accept=".txt,.bitora,.json,text/plain"
          onChange={handleFileSelect}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div className="bg-primary-10" style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p style={{ fontWeight: 500, margin: 0, fontSize: '0.95rem' }}>
              Arrastrá un archivo .txt o .bitora, o hacé clic para seleccionar
            </p>
            <p className="text-text-muted" style={{ fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
              Soporta archivos de texto plano y exportaciones de Bitora
            </p>
          </div>
        </div>
      </div>

      {/* Character count */}
      {value && (
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FileText className="h-4 w-4 text-primary" />
            <span>{value.length.toLocaleString()} caracteres</span>
          </div>
          <div>
            <span>{new Set(value).size} símbolos únicos</span>
          </div>
        </div>
      )}
    </div>
  );
}
