# Test Suite - Portfolio Manager

## Descripción
Suite completa de tests para el proyecto Portfolio Manager, incluyendo tests unitarios, de integración y de validación.

## Instalación

```bash
npm install
```

## Ejecutar Tests

### Ejecutar todos los tests
```bash
npm test
```

### Modo watch (ejecutar tests en tiempo real)
```bash
npm run test:watch
```

### Generar reporte de cobertura
```bash
npm run test:coverage
```

## Estructura de Tests

### 1. **Controller Tests** (`src/controller/controllerProfile.test.js`)
Tests para las funciones del controlador:
- ✅ `handleCreateProfile` - Creación de perfil con validación de datos
- ✅ `handleGetAllProfiles` - Obtención de todos los perfiles
- ✅ `handleGetProfileById` - Obtención de perfil por ID
- ✅ `handleGetLastProfile` - Obtención del último perfil creado
- ✅ Manejo de errores de base de datos
- ✅ Validación de parámetros

**Casos de prueba:**
- Crear perfil con datos válidos
- Rechazar datos faltantes o vacíos
- Manejar errores de BD
- Retornar arreglos vacíos correctamente

### 2. **Middleware Tests** (`src/middleware/validateProfile.test.js`)
Tests para la validación de entrada:
- ✅ Validar longitud mínima (about: 10 caracteres, bio: 5)
- ✅ Validar tipo de datos (strings)
- ✅ Validar presencia de campos obligatorios
- ✅ Ignorar espacios en blanco
- ✅ Casos límite (exactamente 10 y 5 caracteres)

**Casos de prueba:**
- Pasar validación con datos válidos
- Rechazar datos inválidos
- Validar longitudes
- Validar tipos de datos

### 3. **Model Tests** (`src/model/modelProfile.test.js`)
Tests para las operaciones de base de datos:
- ✅ `createProfile` - Insertar nuevo perfil
- ✅ `getAllProfiles` - Obtener todos los perfiles
- ✅ `getProfileById` - Buscar por ID
- ✅ `getLastProfile` - Obtener el último registrado
- ✅ Manejo de errores de SQL

**Casos de prueba:**
- Crear perfil correctamente
- Manejar errores de inserción
- Obtener múltiples registros
- Manejar resultados vacíos

### 4. **API Routes Tests** (`src/routes/routerApi.test.js`)
Tests para los endpoints API:
- ✅ POST `/api/create-profile` - Crear perfil
- ✅ Validación de entrada en rutas
- ✅ Códigos de estado HTTP correctos
- ✅ Formato de respuesta

**Casos de prueba:**
- Crear perfil con datos válidos (201)
- Rechazar datos faltantes (400)
- Rechazar datos con longitud incorrecta (400)
- Manejar errores del servidor (500)
- Validar tipos de datos

### 5. **Integration Tests** (`src/integration.test.js`)
Tests de integración del flujo completo:
- ✅ Flujo de creación de perfil end-to-end
- ✅ Rechazo de datos inválidos en cada capa
- ✅ Manejo de errores entre componentes
- ✅ Consistencia de datos

## Mocks Implementados

### Jest Mocks
```javascript
// Mock del modelo
jest.mock('../../src/model/modelProfile.js');

// Mock del logger
jest.mock('../../src/utils/logger.js');

// Mock de SQLite3
jest.mock('sqlite3');
```

## Cobertura de Tests

La configuración de Jest en `jest.config.js` establece umbrales de cobertura:
- **Branches:** 70%
- **Functions:** 70%
- **Lines:** 70%
- **Statements:** 70%

## Ejemplos de Uso

### Ejecutar un test específico
```bash
npm test -- controllerProfile.test.js
```

### Ejecutar con match pattern
```bash
npm test -- --testNamePattern="handleCreateProfile"
```

### Verbose output
```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --verbose
```

## Dependencias de Testing

```json
{
  "jest": "^29.7.0",
  "@jest/globals": "^29.7.0"
}
```

## Comandos npm disponibles

| Comando | Descripción |
|---------|------------|
| `npm start` | Inicia el servidor |
| `npm run dev` | Inicia en modo desarrollo con nodemon |
| `npm test` | Ejecuta todos los tests |
| `npm run test:watch` | Tests en tiempo real |
| `npm run test:coverage` | Reporte de cobertura |

## Notas Importantes

1. **ES Modules**: El proyecto usa ES6 modules (`"type": "module"` en package.json)
2. **Jest Configuration**: Se usa `--experimental-vm-modules` para soportar ES modules
3. **Mocking**: Los tests mockean la base de datos para evitar dependencias externas
4. **Logger**: El logger está mockeado para verificar mensajes de error/info

## Próximas Mejoras

- [ ] Tests para endpoints GET (getAllProfiles, getProfileById, getLastProfile)
- [ ] Tests de autenticación/autorización cuando se implemente
- [ ] Tests de carga y rendimiento
- [ ] Tests de seguridad (validación de entrada más exhaustiva)
- [ ] Coverage hacia 90%+

## Troubleshooting

### Error: "Cannot find module"
Asegúrate de que las rutas en los imports sean correctas y relativas al directorio del test.

### Error: "Timeout" en tests
Aumenta el timeout en la configuración de Jest:
```javascript
jest.setTimeout(10000);
```

### Tests no se ejecutan
Verifica que el archivo termine con `.test.js` o esté en una carpeta `__tests__`.

