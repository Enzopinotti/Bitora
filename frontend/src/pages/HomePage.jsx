import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Binary,
  Code2,
  FileText,
  RefreshCcw,
  Zap,
  GitBranch,
  Scale,
  Lock,
  Gauge
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

const features = [
  {
    icon: BarChart3,
    title: 'Frecuencias',
    description: 'Detectá cuántas veces aparece cada símbolo en el texto.',
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary-10',
    borderColorClass: 'card--accent-cyan'
  },
  {
    icon: Code2,
    title: 'Codificación',
    description: 'Generá códigos binarios según el algoritmo elegido.',
    colorClass: 'text-accent',
    bgColorClass: 'bg-accent-10',
    borderColorClass: 'card--accent-green'
  },
  {
    icon: Zap,
    title: 'Compresión',
    description: 'Compará el tamaño original con el tamaño comprimido.',
    colorClass: 'text-accent-orange',
    bgColorClass: 'bg-accent-orange-10',
    borderColorClass: 'card--accent-orange'
  },
  {
    icon: RefreshCcw,
    title: 'Decodificación',
    description: 'Reconstruí el mensaje original y verificá que no se pierda información.',
    colorClass: 'text-accent-purple',
    bgColorClass: 'bg-accent-purple-10',
    borderColorClass: 'card--accent-purple'
  }
];

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Ingresá tu texto',
    description: 'Escribí o cargá un archivo .txt con el contenido que querés analizar.',
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary-10'
  },
  {
    number: '02',
    icon: BarChart3,
    title: 'Analizá frecuencias',
    description: 'El sistema detecta cada símbolo y cuenta cuántas veces aparece.',
    colorClass: 'text-accent',
    bgColorClass: 'bg-accent-10'
  },
  {
    number: '03',
    icon: GitBranch,
    title: 'Generá códigos',
    description: 'Elegí entre Huffman, Shannon-Fano o compará ambos algoritmos.',
    colorClass: 'text-accent-orange',
    bgColorClass: 'bg-accent-orange-10'
  }
];

const concepts = [
  {
    icon: Lock,
    title: 'Compresión sin pérdida',
    description: 'Reduce el tamaño del mensaje sin eliminar información. El texto original puede recuperarse exactamente.',
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary-10'
  },
  {
    icon: GitBranch,
    title: 'Huffman',
    description: 'Construye un árbol donde los símbolos más frecuentes quedan más cerca de la raíz y reciben códigos más cortos.',
    colorClass: 'text-accent',
    bgColorClass: 'bg-accent-10'
  },
  {
    icon: Binary,
    title: 'Shannon-Fano',
    description: 'Ordena los símbolos por frecuencia y los divide en grupos para asignar códigos binarios.',
    colorClass: 'text-accent-orange',
    bgColorClass: 'bg-accent-orange-10'
  },
  {
    icon: Gauge,
    title: 'Longitud promedio',
    description: 'Indica cuántos bits se usan, en promedio, para representar cada símbolo del mensaje.',
    colorClass: 'text-accent-purple',
    bgColorClass: 'bg-accent-purple-10'
  }
];

export default function HomePage() {
  return (
    <div className="homepage animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="relative section" style={{ overflow: 'hidden' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 binary-pattern" style={{ opacity: 0.2 }} />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-10 rounded-full blur-3xl" style={{ opacity: 0.5 }} />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-10 rounded-full blur-3xl" style={{ opacity: 0.5 }} />
        
        <div className="container relative" style={{ zIndex: 10 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            {/* Badge */}
            <div className="animate-fade-in-up animate-delay-1" style={{ marginBottom: '1.5rem' }}>
              <Badge variant="cyan" style={{ padding: '0.5rem 1rem' }}>
                <Binary className="h-4 w-4" style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Laboratorio de compresión de datos
              </Badge>
            </div>

            {/* Title */}
            <h1 className="animate-fade-in-up animate-delay-2" style={{ marginBottom: '1.5rem', lineHeight: '1.2' }}>
              Comprimí datos y entendé cómo se forman los{' '}
              <span className="text-primary">códigos binarios</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up animate-delay-3 text-text-secondary" style={{ fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '650px', marginInline: 'auto' }}>
              Bitora permite analizar textos, calcular frecuencias, generar códigos Huffman y Shannon-Fano, y comparar cuál comprime mejor en cada caso.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up animate-delay-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
              <Link to="/laboratorio">
                <Button variant="primary" size="lg" className="gap-2">
                  Iniciar laboratorio
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/comparacion">
                <Button variant="outline" size="lg">
                  Ver comparación
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="animate-fade-in-up animate-delay-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', width: '100%' }}>
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} variant={feature.borderColorClass.replace('card--', '')} hover>
                    <CardContent style={{ padding: '1.5rem', textAlign: 'left' }}>
                      <div className={`inline-flex ${feature.bgColorClass}`} style={{ padding: '0.6rem', borderRadius: '8px', marginBottom: '1rem' }}>
                        <Icon className={`h-5 w-5 ${feature.colorClass}`} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {feature.title}
                      </h3>
                      <p className="text-text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="section bg-background-secondary">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '1rem' }}>Cómo funciona</h2>
            <p className="text-text-secondary" style={{ maxWidth: '500px', margin: '0 auto' }}>
              Un proceso simple para entender la compresión de datos paso a paso.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', position: 'relative' }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} style={{ position: 'relative' }}>
                  <Card variant="outline" style={{ height: '100%', position: 'relative' }}>
                    <CardContent style={{ padding: '1.5rem', zIndex: 10 }}>
                      <div className={`inline-flex ${step.bgColorClass}`} style={{ padding: '0.75rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                        <Icon className={`h-6 w-6 ${step.colorClass}`} />
                      </div>
                      <span style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontFamily: 'monospace', fontSize: '2.5rem', fontWeight: 700, opacity: 0.15 }}>
                        {step.number}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                        {step.title}
                      </h3>
                      <p className="text-text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CONCEPTS / EDUCATIONAL SECTION */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '1rem' }}>Conceptos clave</h2>
            <p className="text-text-secondary" style={{ maxWidth: '500px', margin: '0 auto' }}>
              Entendé los fundamentos detrás de la compresión de datos.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {concepts.map((concept) => {
              const Icon = concept.icon;
              return (
                <Card key={concept.title} hover>
                  <CardContent style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div className={`inline-flex ${concept.bgColorClass}`} style={{ padding: '0.75rem', borderRadius: '12px', flexShrink: 0 }}>
                        <Icon className={`h-6 w-6 ${concept.colorClass}`} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem', textAlign: 'left' }}>
                          {concept.title}
                        </h3>
                        <p className="text-text-secondary" style={{ fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'left' }}>
                          {concept.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="section bg-background-secondary">
        <div className="container">
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <Card variant="outline" style={{ overflow: 'hidden', position: 'relative' }}>
              {/* Binary Pattern Background decoration */}
              <div className="absolute inset-0" style={{ opacity: 0.05, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  01001000 01110101 01100110<br />
                  01100110 01101101 01100001
                </div>
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  10110101 10100110 01100110<br />
                  11101101 01100001 10101110
                </div>
              </div>

              <CardContent style={{ padding: '3rem 2rem', zIndex: 10, position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
                  <div style={{ textAlign: 'left' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>
                      Empezá a experimentar con compresión de datos
                    </h2>
                    <p className="text-text-secondary" style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                      Cargá cualquier texto, visualizá cómo se construyen los códigos y comprendé en profundidad los algoritmos de Huffman y Shannon-Fano.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <Link to="/laboratorio">
                        <Button variant="primary" className="gap-2">
                          Abrir laboratorio
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to="/teoria">
                        <Button variant="outline">
                          Leer la teoría
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                      <div className="bg-primary-10" style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
                        <Binary className="h-5 w-5 text-primary" />
                      </div>
                      <p style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>2</p>
                      <p className="text-text-secondary" style={{ fontSize: '0.8rem', margin: 0 }}>Algoritmos</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                      <div className="bg-accent-10" style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
                        <GitBranch className="h-5 w-5 text-accent" />
                      </div>
                      <p style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>∞</p>
                      <p className="text-text-secondary" style={{ fontSize: '0.8rem', margin: 0 }}>Posibilidades</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                      <div className="bg-accent-orange-10" style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
                        <Scale className="h-5 w-5 text-accent-orange" />
                      </div>
                      <p style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>100%</p>
                      <p className="text-text-secondary" style={{ fontSize: '0.8rem', margin: 0 }}>Sin pérdida</p>
                    </div>
                    <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                      <div className="bg-accent-purple-10" style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: '8px', marginBottom: '0.75rem' }}>
                        <Binary className="h-5 w-5 text-accent-purple" />
                      </div>
                      <p style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Live</p>
                      <p className="text-text-secondary" style={{ fontSize: '0.8rem', margin: 0 }}>En vivo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
