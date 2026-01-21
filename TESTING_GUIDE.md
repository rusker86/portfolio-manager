# Portfolio Manager - Guía de Testing

## Overview
Este proyecto incluye una suite completa de tests utilizando **Jest**, el framework de testing más popular para Node.js y JavaScript.

## 📋 Instalación Rápida

```bash
# Instalar dependencias (incluyendo Jest)
npm install

# Ejecutar tests
npm test

# Ver cobertura
npm run test:coverage
```

## 📁 Estructura de Tests

```
src/
├── controller/
│   └── controllerProfile.test.js    # Tests del controlador
├── middleware/
│   └── validateProfile.test.js      # Tests de validación
├── model/
│   └── modelProfile.test.js         # Tests del modelo/BD
├── routes/
│   └── routerApi.test.js            # Tests de rutas/API
├── integration.test.js              # Tests de integración
└── utils/
    └── testUtils.js                 # Utilidades para tests
```

## 🧪 Suite de Tests Disponibles

### 1️⃣ Tests del Controlador
**Archivo:** `src/controller/controllerProfile.test.js`

Prueba las funciones principales del controlador:

```javascript
✓ handleCreateProfile
  - Crear con datos válidos
  - Rechazar datos vacíos
  - Manejar errores de BD
  
✓ handleGetAllProfiles
  - Obtener todos exitosamente
  - Retornar array vacío
  - Manejar errores

✓ handleGetProfileById
  - Obtener por ID existente
  - Retornar null si no existe
  - Manejar errores

✓ handleGetLastProfile
  - Obtener último perfil
  - Retornar null si no hay
  - Manejar errores
```

### 2️⃣ Tests de Middleware
**Archivo:** `src/middleware/validateProfile.test.js`

Valida la entrada del usuario:

```javascript
✓ validateProfileInput
  - Pasar con datos válidos
  - Rechazar campos vacíos
  - Validar longitudes mínimas (about: 10, bio: 5)
  - Validar tipos de datos (strings)
  - Ignorar espacios en blanco
  - Casos límite (exactly 10 y 5 caracteres)
```

### 3️⃣ Tests del Modelo
**Archivo:** `src/model/modelProfile.test.js`

Prueba operaciones de base de datos:

```javascript
✓ createProfile
  - Insertar correctamente
  - Manejar errores SQL
  - Retornar nuevo perfil con ID

✓ getAllProfiles
  - Obtener múltiples registros
  - Retornar null si está vacía
  - Manejar errores

✓ getProfileById & getLastProfile
  - Búsqueda correcta
  - Manejo de no encontrados
```

### 4️⃣ Tests de Rutas API
**Archivo:** `src/routes/routerApi.test.js`

Prueba los endpoints HTTP:

```javascript
✓ POST /api/create-profile
  - Status 201 con datos válidos
  - Status 400 con datos inválidos
  - Status 500 con errores del servidor
  - Validación en middleware
  - Formato correcto de respuesta
```

### 5️⃣ Tests de Integración
**Archivo:** `src/integration.test.js`

Prueba flujos completos:

```javascript
✓ Flujo completo de creación
✓ Rechazo en cada capa
✓ Manejo de errores end-to-end
✓ Consistencia de datos
```

## 🚀 Comandos Disponibles

| Comando | Descripción |
|---------|------------|
| `npm test` | Ejecuta todos los tests una vez |
| `npm run test:watch` | Modo watch (tests en tiempo real) |
| `npm run test:coverage` | Genera reporte de cobertura |
| `npm start` | Inicia servidor |
| `npm run dev` | Servidor con auto-reload |

## 📊 Ejemplos de Uso

### Ejecutar todos los tests
```bash
npm test
```

**Salida esperada:**
```
PASS  src/controller/controllerProfile.test.js
  Profile Controller
    handleCreateProfile
      ✓ debe crear un perfil correctamente (45ms)
      ✓ debe lanzar error si no hay datos (5ms)
      ...
    
PASS  src/middleware/validateProfile.test.js
  Profile Validation Middleware
    validateProfileInput
      ✓ debe pasar validación con datos correctos (2ms)
      ✓ debe rechazar si falta el campo about (3ms)
      ...

Test Suites: 5 passed, 5 total
Tests:       45 passed, 45 total
```

### Ejecutar tests en modo watch
```bash
npm run test:watch
```
Vuelve a ejecutar tests automáticamente al cambiar archivos.

### Generar reporte de cobertura
```bash
npm run test:coverage
```

**Salida:**
```
------------|----------|----------|----------|----------|
File        |  % Stmts | % Branch | % Funcs  | % Lines  |
------------|----------|----------|----------|----------|
All files   |    85.2% |   78.9%  |  92.1%   |   85.5%  |
 controller |    92.3% |   88.5%  |  95.0%   |   92.1%  |
 middleware |    96.5% |   94.2%  |  98.0%   |   96.3%  |
 model      |    78.4% |   72.1%  |  85.7%   |   78.9%  |
------------|----------|----------|----------|----------|
```

## 🧩 Mocks Utilizados

### Mock del Modelo
```javascript
jest.mock('../../src/model/modelProfile.js');

// Uso:
model.createProfile.mockResolvedValue({...});
model.getAllProfiles.mockResolvedValue([...]);
```

### Mock del Logger
```javascript
jest.mock('../../src/utils/logger.js');

// Verificar logs
expect(logger.info).toHaveBeenCalledWith('...');
expect(logger.error).toHaveBeenCalled();
```

### Mock de SQLite
```javascript
jest.mock('sqlite3');

// Simular operaciones BD
mockDb.run.mockImplementation((sql, params, callback) => {...});
```

## ✅ Casos de Prueba Cubiertos

### Validación
- ✅ Campos obligatorios presentes
- ✅ Longitudes mínimas correctas
- ✅ Tipos de datos correctos
- ✅ Espacios en blanco ignorados
- ✅ Casos límite

### Controlador
- ✅ Creación exitosa
- ✅ Manejo de errores
- ✅ Logging correcto
- ✅ Retorno de datos esperados

### Base de Datos
- ✅ Inserción correcta
- ✅ Consultas correctas
- ✅ Manejo de errores SQL
- ✅ Resultados vacíos

### API
- ✅ Status codes correctos
- ✅ Formato de respuesta
- ✅ Validación de entrada
- ✅ Manejo de errores

## 🔍 Debugging Tests

### Ver output detallado
```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --verbose
```

### Ejecutar test específico
```bash
npm test -- controllerProfile.test.js
```

### Por nombre de test
```bash
npm test -- --testNamePattern="handleCreateProfile"
```

### Ver qué tests se ejecutarán
```bash
npm test -- --listTests
```

## 📝 Agregar Nuevos Tests

### Template básico
```javascript
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

describe('Mi Feature', () => {
  let mockData;

  beforeEach(() => {
    jest.clearAllMocks();
    mockData = { /* ... */ };
  });

  it('debe hacer algo específico', () => {
    expect(true).toBe(true);
  });
});
```

### Con async/await
```javascript
it('debe crear perfil', async () => {
  const result = await handleCreateProfile({...});
  expect(result).toBeDefined();
});
```

## ⚠️ Troubleshooting

### "Cannot find module"
```bash
# Verificar rutas relativas correctas
# Los tests deben estar en el mismo directorio que el archivo a probar
```

### "Timeout exceeded"
```javascript
// Aumentar timeout
jest.setTimeout(10000);
```

### Mocks no funcionan
```javascript
// Asegurarse de que jest.mock() esté al inicio del archivo
jest.mock('../../src/model/modelProfile.js');
```

## 🎯 Objetivos de Cobertura

Actualmente se mantiene una cobertura mínima del **70%** en:
- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

Objetivo: Aumentar a **90%+** en próximas versiones.

## 📚 Recursos Útiles

- [Jest Documentation](https://jestjs.io/)
- [Jest API Reference](https://jestjs.io/docs/api)
- [Testing Best Practices](https://jestjs.io/docs/testing-frameworks)

## 🤝 Contribuir

Al agregar nuevas features:
1. Escribir tests primero (TDD)
2. Implementar feature
3. Asegurar cobertura > 70%
4. Ejecutar `npm run test:coverage`

---

**Última actualización:** Enero 2026
