# Bitora - Compresor de Datos Educativo

Bitora es una aplicación web interactiva y educativa diseñada para estudiar, visualizar y comparar algoritmos clásicos de compresión sin pérdida: **Huffman** y **Shannon-Fano**.

## Tecnologías utilizadas

### Frontend
- **React 18** + **Vite**
- **Sass (SCSS)**
- **Recharts** para frecuencias y métricas
- **Lucide React** para iconografía

### Backend
- **Node.js** + **Express**
- **Multer** para carga de archivos de texto
- **Jest** para tests de algoritmos y métricas

### Infraestructura
- **Docker** y **Docker Compose**
- **Nginx** para servir el frontend y enrutar la API en producción

---

## Puesta en marcha

### Opción 1: Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:8080
- API health: http://localhost:4000/api/health

### Opción 2: desarrollo local

Backend:

```bash
cd backend
npm ci
npm run dev
```

Frontend:

```bash
cd frontend
npm ci
npm run dev
```

Vite expone el cliente en http://localhost:5173 y el backend corre en http://localhost:4000.

---

## Quality gate

La validación de ingeniería del repositorio es deliberadamente pequeña y verificable:

```bash
cd backend
npm ci
npm test -- --runInBand

cd ../frontend
npm ci
npm run build

cd ..
docker compose config --quiet
```

GitHub Actions ejecuta el mismo contrato separando fallos de backend, frontend y Compose. El frontend todavía no tiene una suite de comportamiento propia; no se publica un test vacío sólo para obtener un check verde.

Los invariantes de compresión, métricas y compatibilidad del formato `.bitora` están documentados en [`docs/compression-contracts.md`](./docs/compression-contracts.md).

---

## Funcionalidades

1. **Laboratorio de compresión**
   - Ingreso de texto manual o carga de archivos `.txt`.
   - Selección de **Huffman**, **Shannon-Fano** o comparación de ambos.
   - Visualización de frecuencias, probabilidades y códigos binarios.
   - Árbol de Huffman en SVG.
   - Codificación, decodificación y validación del flujo sin pérdida.

2. **Comparador lado a lado**
   - Ejecuta ambos algoritmos sobre el mismo input.
   - Compara métricas y reducción lograda.

3. **Formato `.bitora`**
   - Exporta un análisis con sus metadatos y tabla de códigos.
   - Permite restaurar análisis anteriores desde archivos `.bitora`.

4. **Sección teórica**
   - Entropía de Shannon.
   - Árbol de Huffman.
   - Particionamiento Shannon-Fano.
   - Glosario de términos.

---

## Contratos de producto

Bitora prioriza comportamiento demostrable sobre una asignación binaria específica. Entre los contratos que deben mantenerse:

- `decode(encode(input)) === input` para los algoritmos soportados;
- frecuencias consistentes con el input analizado;
- probabilidades derivadas de esas frecuencias;
- comparación de algoritmos sobre exactamente el mismo input;
- métricas calculadas desde la misma tabla/codificación que muestra la UI;
- restauración segura de archivos `.bitora`, sin aceptar silenciosamente datos malformados.

Ver el detalle en [`docs/compression-contracts.md`](./docs/compression-contracts.md).
