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

El proyecto incluye una suite completa de tests con 46+ casos de prueba:

- **controllerProfile.test.js** (11 tests) - Tests del controlador de perfil
- **modelProfile.test.js** (9 tests) - Tests del modelo de datos
- **routerApi.test.js** (11 tests) - Tests de rutas de API
- **validateProfile.test.js** (11 tests) - Tests de validación
- **integration.test.js** (4 tests) - Tests de integración

### Visualizar Reporte de Cobertura

Después de ejecutar `npm run test:coverage`, abre:
```
coverage/lcov-report/index.html
```

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
✅ Suite completa de tests (46+ casos)
✅ Reporte de cobertura de tests
✅ Documentación extensiva
✅ Jest con soporte para módulos ES6

## Notas

- El sistema usa SQLite para persistencia de datos
- Los archivos de BD se guardan en la carpeta `data/`
- Se implementó logger con timestamp para debugging
- Las rutas están organizadas por funcionalidad
- Todos los tests están centralizados en la carpeta `test/`
- La configuración de Jest soporta módulos ES6
