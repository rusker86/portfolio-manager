# Panel Control - Portfolio Manager

Sistema de gestión de perfil con Node.js, Express y SQLite.

## Requisitos

- Node.js >= 16
- npm >= 8

## Instalación

```bash
npm install
```

## Configuración

Copiar `.env.example` a `.env` y ajustar según necesidades:

```bash
cp .env.example .env
```

Variables disponibles:
- `PORT`: Puerto del servidor (por defecto 3000)
- `NODE_ENV`: Ambiente de ejecución (development/production)
- `DB_PATH`: Ruta del archivo de BD

## Uso

### Modo desarrollo
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

### Tests

#### Ejecutar todos los tests
```bash
npm test
```

#### Modo watch (tests en tiempo real)
```bash
npm run test:watch
```

#### Cobertura de tests
```bash
npm run test:coverage
```

## Estructura del Proyecto

```
src/
├── api/           # Punto de entrada de la aplicación
├── controller/    # Lógica de negocio
├── db/            # Conexión y configuración de BD
├── middleware/    # Middleware de Express
├── model/         # Modelos de datos
├── routes/        # Rutas de la aplicación
├── schema/        # Esquemas de validación
└── utils/         # Utilidades (logger, testUtils, etc)

test/             # Suite de tests
├── controllerProfile.test.js
├── modelProfile.test.js
├── routerApi.test.js
├── validateProfile.test.js
└── integration.test.js

public/           # Archivos estáticos
view/             # Plantillas EJS
data/             # Archivos de BD (generado)
coverage/         # Reportes de cobertura (generado)
```

## Suite de Tests

El proyecto incluye una suite completa de tests con **168+ casos de prueba**:

### Archivos de Tests Principales

- **controllerProfile.test.js** (11 tests) - Tests del controlador de perfil
- **modelProfile.test.js** (9 tests) - Tests del modelo de datos
- **routerApi.test.js** (11 tests) - Tests de rutas de API
- **validateProfile.test.js** (11 tests) - Tests de validación
- **integration.test.js** (4 tests) - Tests de integración

### Archivos de Tests Adicionales para Cobertura Mejorada

- **db.test.js** (22 tests) - Tests de capa de base de datos
  - Validación de conexiones
  - Inicialización de tablas
  - Manejo de errores en BD
  - Pool de conexiones
  - Resolución de rutas
  - Logging de operaciones

- **routes.test.js** (26 tests) - Tests de rutas (frontend y admin)
  - Rutas GET frontend
  - Rutas GET admin
  - Manejo de errores en rutas
  - Validación de parámetros
  - Status codes HTTP
  - Content type handling
  - Renderización de vistas

- **errorHandling.test.js** (41 tests) - Tests de manejo de errores y edge cases
  - Validación de edge cases
  - Boundary value analysis
  - Null/Undefined handling
  - Error object creation
  - Async error handling
  - Concurrency issues
  - Resource exhaustion
  - Security edge cases

- **additionalCoverage.test.js** (33 tests) - Tests adicionales de modelo y controlador
  - Operaciones de creación
  - Operaciones de lectura
  - Propagación de errores
  - Operaciones async
  - Validación de datos
  - Construcción de respuestas
  - Logging en controlador
  - Batch operations

### Resumen de Cobertura

- **Total de Tests:** 168 tests ✅
- **Archivos de test:** 9 archivos
- **Status:** Todos los tests pasan
- **Middleware validación:** 100% de cobertura

### Visualizar Reporte de Cobertura

Después de ejecutar `npm run test:coverage`, abre:
```
coverage/lcov-report/index.html
```

Este reporte genera:
- Cobertura de statements
- Cobertura de branches
- Cobertura de functions
- Cobertura de líneas
- Líneas no cubiertas por archivo

## Endpoints

### Frontend
- `GET /` - Página principal con último perfil

### Admin
- `GET /admin/panel` - Panel de administración

### API
- `POST /api/create-profile` - Crear nuevo perfil
  ```json
  {
    "about": "Descripción (mín 10 caracteres)",
    "bio": "Biografía (mín 5 caracteres)"
  }
  ```

## Mejoras Implementadas

✅ Pool de conexiones SQLite (conexión única)
✅ Variables de entorno (.env)
✅ Logger centralizado
✅ Validación de entrada con middleware
✅ Manejo de errores global
✅ Graceful shutdown
✅ Naming consistente
✅ **Suite extendida de 168 tests (4x cobertura anterior)**
✅ Tests de base de datos (db.test.js)
✅ Tests de rutas frontend/admin (routes.test.js)
✅ Tests de manejo de errores y edge cases (errorHandling.test.js)
✅ Tests adicionales de modelo y controlador (additionalCoverage.test.js)
✅ Reporte de cobertura de tests
✅ Documentación extensiva
✅ Jest con soporte para módulos ES6
✅ 100% cobertura en validación de profiles

## Notas

- El sistema usa SQLite para persistencia de datos
- Los archivos de BD se guardan en la carpeta `data/`
- Se implementó logger con timestamp para debugging
- Las rutas están organizadas por funcionalidad
- Todos los tests están centralizados en la carpeta `test/`
- La configuración de Jest soporta módulos ES6
