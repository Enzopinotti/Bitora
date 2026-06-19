# Bitora - Compresor de Datos Educativo

Bitora es una aplicación web interactiva y educativa diseñada para estudiar, visualizar y comparar los algoritmos de compresión de datos sin pérdida más clásicos: **Huffman** y **Shannon-Fano**.

## Tecnologías Utilizadas

### Frontend
- **React 18** (desplegado con **Vite**)
- **Sass (SCSS)** para estilos modulares basados en BEM
- **Recharts** para el gráfico interactivo de frecuencias
- **Lucide React** para iconografía moderna y limpia

### Backend
- **Node.js** con **Express**
- **Multer** para el manejo de carga de archivos de texto
- **Jest** para los tests unitarios de algoritmos y métricas

### Infraestructura
- **Docker** y **Docker Compose** para orquestación en contenedores
- **Nginx** para servir el cliente estático y redirigir peticiones API en producción

---

## Cómo Levantar la Aplicación

### Opción 1: Con Docker (Recomendada)
Para levantar tanto el cliente como el servidor de forma local mediante Docker:

1. Asegúrate de tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Desde la raíz de este proyecto (`/bitora-app-design`), ejecuta:
   ```bash
   docker compose up --build
   ```
3. Accede a la aplicación en:
   - **Frontend**: [http://localhost:8080](http://localhost:8080)
   - **Backend API Health**: [http://localhost:4000/api/health](http://localhost:4000/api/health)

### Opción 2: Desarrollo Local (Sin Docker)

#### Levantando el Backend
1. Dirígete a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El backend correrá en [http://localhost:4000](http://localhost:4000).

#### Levantando el Frontend
1. Dirígete a la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el cliente de desarrollo:
   ```bash
   npm run dev
   ```
   Vite desplegará el cliente en [http://localhost:5173](http://localhost:5173).

---

## Ejecutando Tests

Para ejecutar los tests unitarios de la lógica de los algoritmos (Huffman, Shannon-Fano) y el cálculo de métricas matemáticas (Entropía, Eficiencia, Longitud promedio):

1. Dirígete a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Ejecuta:
   ```bash
   npm test
   ```

---

## Funcionalidades de Bitora

1. **Laboratorio de Compresión**:
   - Ingreso de texto manual o carga de archivos `.txt`.
   - Selección del algoritmo (**Huffman**, **Shannon-Fano** o **Comparar ambos**).
   - Visualización interactiva del gráfico de frecuencias de cada símbolo.
   - Tabla detallada de códigos binarios asignados por símbolo, incluyendo frecuencias y probabilidades.
   - Representación visual e interactiva del **Árbol de Huffman** generado vía SVG.
   - Sección de texto codificado en binario, texto decodificado y validación del flujo completo sin pérdida.

2. **Comparador Lado a Lado**:
   - Compara las métricas obtenidas con Huffman frente a Shannon-Fano simultáneamente para el mismo texto.
   - Identifica el ganador y la reducción lograda en bits.

3. **Formato `.bitora`**:
   - Permite descargar el resultado comprimido de tu análisis junto con los metadatos y la tabla de códigos en un archivo de formato `.bitora`.
   - Admite cargar archivos `.bitora` en el laboratorio para restaurar análisis de sesiones anteriores.

4. **Sección Teórica**:
   - Explicación de los fundamentos teóricos de la compresión sin pérdida, entropía de Shannon, árbol de Huffman, particionamiento de Shannon-Fano y un glosario de términos.
