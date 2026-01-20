# Panel Control

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

## Estructura del Proyecto

```
src/
├── api/           # Punto de entrada de la aplicación
├── controller/    # Lógica de negocio
├── db/            # Conexión y configuración de BD
├── middleware/    # Middleware de Express
├── model/         # Modelos de datos
├── routes/        # Rutas de la aplicación
└── utils/         # Utilidades (logger, etc)

public/           # Archivos estáticos
view/             # Plantillas EJS
data/             # Archivos de BD (generado)
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
✅ Documentación

## Notas

- El sistema usa SQLite para persistencia de datos
- Los archivos de BD se guardan en la carpeta `data/`
- Se implementó logger con timestamp para debugging
- Las rutas están organizadas por funcionalidad
