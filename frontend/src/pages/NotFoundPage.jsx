import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '8rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        La página que estás buscando no existe.
      </p>
      <Link to="/">
        <Button variant="primary">
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
}
