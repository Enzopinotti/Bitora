import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Binary,
  GitBranch,
  Lock,
  Gauge,
  BookOpen,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

const concepts = [
  {
    id: 'compresion',
    icon: Lock,
    title: 'Compresión sin pérdida',
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary-10',
    content: [
      'La compresión sin pérdida es una técnica que reduce el tamaño de los datos sin eliminar información. El mensaje original puede recuperarse exactamente después de la descompresión.',
      'A diferencia de la compresión con pérdida (usada en MP3 o JPEG), aquí no se descarta ningún dato. Esto es importante para textos, código fuente o cualquier información que deba preservarse intacta.',
      'Los algoritmos de Huffman y Shannon-Fano son ejemplos clásicos de compresión sin pérdida basados en códigos de longitud variable.'
    ]
  },
  {
    id: 'huffman',
    icon: GitBranch,
    title: 'Algoritmo de Huffman',
    colorClass: 'text-accent',
    bgColorClass: 'bg-accent-10',
    content: [
      'El algoritmo de Huffman, desarrollado por David Huffman en 1952, construye un árbol binario óptimo para la codificación.',
      'El proceso funciona así: primero, ordena los símbolos por frecuencia. Luego, toma los dos símbolos menos frecuentes y los combina en un nodo padre. Repite hasta formar un árbol completo.',
      'Los símbolos más frecuentes quedan más cerca de la raíz, recibiendo códigos más cortos. Los menos frecuentes quedan más lejos, con códigos más largos.',
      'Es un algoritmo goloso (greedy) que garantiza encontrar una codificación óptima para una fuente de símbolos dada.'
    ],
    steps: [
      'Calcular la frecuencia de cada símbolo',
      'Crear nodos hoja para cada símbolo',
      'Combinar los dos nodos con menor frecuencia',
      'Repetir hasta tener un solo árbol',
      'Asignar 0 a ramas izquierdas, 1 a derechas',
      'Leer códigos desde la raíz hasta cada hoja'
    ]
  },
  {
    id: 'shannon-fano',
    icon: Binary,
    title: 'Algoritmo de Shannon-Fano',
    colorClass: 'text-accent-orange',
    bgColorClass: 'bg-accent-orange-10',
    content: [
      'Shannon-Fano fue propuesto por Claude Shannon y Robert Fano como uno de los primeros métodos de codificación de longitud variable.',
      'El algoritmo ordena los símbolos por frecuencia y luego los divide recursivamente en dos grupos de peso similar. Cada división agrega un bit al código.',
      'Aunque no siempre produce la codificación óptima (Huffman lo hace), es más simple de entender y calcular manualmente.',
      'La diferencia con Huffman está en el enfoque: Shannon-Fano trabaja de arriba hacia abajo (divide), mientras que Huffman trabaja de abajo hacia arriba (combina).'
    ],
    steps: [
      'Ordenar símbolos por frecuencia descendente',
      'Dividir la lista en dos grupos de peso similar',
      'Asignar 0 al primer grupo, 1 al segundo',
      'Repetir recursivamente en cada grupo',
      'Continuar hasta que cada grupo tenga un símbolo'
    ]
  },
  {
    id: 'entropia',
    icon: Gauge,
    title: 'Entropía y eficiencia',
    colorClass: 'text-accent-purple',
    bgColorClass: 'bg-accent-purple-10',
    content: [
      'La entropía, definida por Claude Shannon, mide la cantidad mínima de bits necesarios para representar un símbolo en promedio.',
      'Se calcula como: H = -Σ p(x) × log₂(p(x)), donde p(x) es la probabilidad de cada símbolo.',
      'La longitud promedio del código nunca puede ser menor que la entropía. Cuando se acerca a la entropía, el código es más eficiente.',
      'La eficiencia se mide como el cociente entre la entropía y la longitud promedio real del código. Un 100% significa codificación perfecta.'
    ]
  },
  {
    id: 'frecuencias',
    icon: Binary,
    title: 'Análisis de frecuencias',
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary-10',
    content: [
      'El primer paso de ambos algoritmos es calcular cuántas veces aparece cada símbolo en el texto.',
      'La probabilidad de un símbolo se obtiene dividiendo su frecuencia por el total de caracteres.',
      'Los símbolos más frecuentes (como la letra \'e\' en español o el espacio) son los candidatos ideales para códigos cortos.',
      'Este análisis estadístico es la base de la compresión: aprovechamos que algunos símbolos aparecen más que otros.'
    ]
  }
];

const keyTerms = [
  {
    term: 'Código prefijo',
    definition: 'Un código donde ninguna palabra código es prefijo de otra. Permite decodificación instantánea sin ambigüedad.'
  },
  {
    term: 'Longitud promedio',
    definition: 'El número esperado de bits por símbolo, ponderado por las probabilidades de cada símbolo.'
  },
  {
    term: 'Tasa de compresión',
    definition: 'La relación entre el tamaño original y el comprimido. Se expresa como porcentaje de reducción.'
  },
  {
    term: 'Árbol binario',
    definition: 'Estructura de datos donde cada nodo tiene como máximo dos hijos. Se usa para representar los códigos.'
  },
  {
    term: 'Código de longitud variable',
    definition: 'Sistema donde diferentes símbolos pueden tener códigos de diferente longitud, a diferencia de ASCII que usa 8 bits fijos.'
  }
];

export default function TheoryPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1rem 4rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div className="bg-primary-10" style={{ padding: '0.5rem', borderRadius: '8px' }}>
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <Badge variant="cyan">
            Material educativo
          </Badge>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          Fundamentos de compresión de datos
        </h1>
        <p className="text-text-secondary" style={{ fontSize: '1.15rem', maxWidth: '700px', lineHeight: '1.6' }}>
          Conceptos teóricos detrás de los algoritmos de Huffman y Shannon-Fano, explicados de forma clara y práctica.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {concepts.map((concept) => {
          const Icon = concept.icon;
          return (
            <Card key={concept.id} id={concept.id} style={{ scrollMarginTop: '5rem' }}>
              <CardHeader>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className={concept.bgColorClass} style={{ padding: '0.75rem', borderRadius: '12px' }}>
                    <Icon className={`h-6 w-6 ${concept.colorClass}`} />
                  </div>
                  <CardTitle style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                    {concept.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {concept.content.map((paragraph, index) => (
                    <p key={index} className="text-text-secondary" style={{ lineHeight: '1.6' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {concept.steps && (
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.015)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1.5rem' }}>
                    <h4 style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 600, marginBottom: '1.25rem' }}>
                      <Lightbulb className="h-5 w-5 text-warning" />
                      Pasos del algoritmo
                    </h4>
                    <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {concept.steps.map((step, index) => (
                        <li key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          <span className="bg-primary-10 text-primary" style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>
                            {index + 1}
                          </span>
                          <span className="text-text-secondary" style={{ fontSize: '0.95rem', paddingTop: '1px' }}>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* Key Terms / Glossary */}
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="bg-accent-10" style={{ padding: '0.75rem', borderRadius: '12px' }}>
                <Binary className="h-6 w-6 text-accent" />
              </div>
              <CardTitle style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                Glosario de términos
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {keyTerms.map((item, index) => (
                <div key={index} style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.015)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{item.term}</h4>
                  <p className="text-text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{item.definition}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Practical Example Card */}
        <Card variant="accent-cyan">
          <CardHeader>
            <CardTitle style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '1.25rem', fontWeight: 600 }}>
              <GitBranch className="h-5 w-5 text-primary" />
              Ejemplo práctico
            </CardTitle>
          </CardHeader>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p className="text-text-secondary" style={{ margin: 0 }}>
              Supongamos que queremos codificar el texto {'"ABRACADABRA"'} usando Huffman:
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.015)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>1. Frecuencias</h4>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-primary">A:</span>
                    <span className="text-text-secondary">5 (45%)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-accent">B:</span>
                    <span className="text-text-secondary">2 (18%)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-accent-orange">R:</span>
                    <span className="text-text-secondary">2 (18%)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-accent-purple">C:</span>
                    <span className="text-text-secondary">1 (9%)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-warning">D:</span>
                    <span className="text-text-secondary">1 (9%)</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.015)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>2. Códigos Huffman</h4>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-primary">A:</span>
                    <span className="text-accent">0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-accent">B:</span>
                    <span className="text-accent">10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-accent-orange">R:</span>
                    <span className="text-accent">110</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-accent-purple">C:</span>
                    <span className="text-accent">1110</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-warning">D:</span>
                    <span className="text-accent">1111</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.015)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>3. Resultado</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div>
                    <span className="text-text-secondary">Original (ASCII):</span>
                    <p style={{ fontFamily: 'monospace', fontWeight: 600, margin: '2px 0 0' }}>88 bits</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Comprimido:</span>
                    <p style={{ fontFamily: 'monospace', fontWeight: 600, margin: '2px 0 0' }}>23 bits</p>
                  </div>
                  <div>
                    <span className="text-text-secondary">Reducción:</span>
                    <p style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--color-accent-green)', margin: '2px 0 0' }}>73.9%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
