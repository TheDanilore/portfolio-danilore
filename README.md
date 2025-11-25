# Portfolio TheDanilore - Vue 3

Portfolio personal desarrollado con Vue 3, Vite, Pinia, Vue Router y Three.js.

## 🚀 Características

- ✨ Animación de inicio con letras "Danilore Dev"
- 🐱 Gatito animado que navega por las secciones
- 🎭 Avatar 3D con rotación interactiva 360°
- 📱 Diseño responsive
- 🎨 Animaciones modernas con GSAP
- 🌙 Modo oscuro/claro
- 📦 Containerizado con Docker

## 📋 Requisitos previos

- Node.js >= 20.19.0
- pnpm >= 8.0.0
- Docker y Docker Compose (opcional)

## 🛠️ Instalación

### Opción 1: Desarrollo local con pnpm

```bash
# Navegar a la carpeta del frontend
cd frontend

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

El servidor estará disponible en `http://localhost:5173`

### Opción 2: Con Docker Compose

```bash
# Construir e iniciar los contenedores
docker-compose up --build

# O en modo detached (segundo plano)
docker-compose up -d --build
```

El servidor estará disponible en `http://localhost:5173`

## 📦 Scripts disponibles

```bash
# Desarrollo
pnpm dev

# Build para producción
pnpm build

# Preview del build de producción
pnpm preview

# Formatear código con Prettier
pnpm format

# Linting con ESLint
pnpm lint

# Tests unitarios
pnpm test:unit
```

## 🏗️ Estructura del proyecto

```
frontend/
├── src/
│   ├── assets/         # Recursos estáticos (imágenes, estilos)
│   ├── components/     # Componentes Vue reutilizables
│   │   ├── CatNavigator.vue       # Gatito navegador
│   │   └── Avatar3D.vue           # Avatar 3D
│   ├── views/          # Vistas principales
│   │   ├── HomeView.vue
│   │   └── ProyectosView.vue
│   ├── router/         # Configuración de rutas
│   ├── stores/         # Estado global con Pinia
│   ├── App.vue         # Componente raíz
│   └── main.js         # Punto de entrada
├── public/             # Archivos públicos
├── Dockerfile          # Configuración de Docker
└── package.json        # Dependencias del proyecto
```

## 🎨 Tecnologías utilizadas

- **Vue 3** - Framework progresivo de JavaScript
- **Vite** - Build tool y dev server ultra rápido
- **Pinia** - Estado global
- **Vue Router** - Enrutamiento
- **Three.js** - Gráficos 3D
- **GSAP** - Animaciones avanzadas
- **VueUse** - Composables útiles
- **Lottie Web** - Animaciones JSON

## 📝 Desarrollo

### Crear nuevo componente

```bash
# Los componentes van en src/components/
# Usar PascalCase: MiComponente.vue
```

### Agregar nueva vista

```bash
# Las vistas van en src/views/
# Registrar en src/router/index.js
```

### Agregar estado global

```bash
# Los stores van en src/stores/
# Usar Pinia para gestión de estado
```

## 🐳 Docker

### Detener contenedores

```bash
docker-compose down
```

### Ver logs

```bash
docker-compose logs -f frontend
```

### Reconstruir contenedores

```bash
docker-compose up --build --force-recreate
```

## 📄 Licencia

Este proyecto es de uso personal.

## 👤 Autor

**Lorenzo Daniel Arteaga Gordillo (TheDanilore)**

- GitHub: [@TheDanilore](https://github.com/TheDanilore)
- LinkedIn: [Lorenzo Daniel Arteaga Gordillo](https://www.linkedin.com/in/lorenzo-daniel-arteaga-gordillo-a01929307/)
- Email: arteagagordillol@gmail.com
