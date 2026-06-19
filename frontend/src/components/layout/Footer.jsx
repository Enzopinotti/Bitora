import React from 'react';
import { Link } from 'react-router-dom';
import { Binary, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon-wrap">
                <Binary className="footer__logo-icon" />
                <div className="footer__logo-dot" />
              </div>
              <span className="footer__logo-text">Bitora</span>
            </Link>
            <p className="footer__desc">
              Herramienta educativa para analizar textos, calcular frecuencias y generar códigos de compresión usando Huffman y Shannon-Fano.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer__title">Navegación</h3>
            <ul className="footer__list">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/laboratorio', label: 'Laboratorio' },
                { to: '/comparacion', label: 'Comparación' },
                { to: '/teoria', label: 'Teoría' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="footer__title">Recursos</h3>
            <ul className="footer__list">
              <li>
                <Link to="/teoria#huffman" className="footer__link">
                  Algoritmo Huffman
                </Link>
              </li>
              <li>
                <Link to="/teoria#shannon-fano" className="footer__link">
                  Algoritmo Shannon-Fano
                </Link>
              </li>
              <li>
                <Link to="/teoria#compresion" className="footer__link">
                  Compresión sin pérdida
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © 2026 Bitora. Herramienta educativa de compresión de datos.
          </p>
          <div className="footer__social">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
