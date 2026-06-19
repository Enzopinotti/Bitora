import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Binary } from 'lucide-react';
import { Button } from '../common/Button';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/laboratorio', label: 'Laboratorio' },
  { href: '/comparacion', label: 'Comparación' },
  { href: '/teoria', label: 'Teoría' },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <div className="header__logo-icon-wrap">
            <Binary className="header__logo-icon" />
            <div className="header__logo-dot" />
          </div>
          <span className="header__logo-text">Bitora</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="header__actions">
          <Link to="/laboratorio">
            <Button variant="primary">
              Iniciar laboratorio
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="header__mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="header__mobile-menu">
          <nav className="header__nav">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <Link to="/laboratorio" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" fullWidth>
                  Iniciar laboratorio
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
