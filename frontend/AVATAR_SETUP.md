# 🎭 Configuración del Avatar 3D - Ready Player Me

## ✅ Pasos Completados

1. ✅ Creaste tu avatar en Ready Player Me con tu foto
2. ✅ Instaladas las dependencias necesarias (Three.js, GLTFLoader)

## 📝 Siguiente Paso: Configurar la URL de tu Avatar

### 1. Obtén tu URL de Avatar

Cuando creaste tu avatar en Ready Player Me, recibiste una URL como:
```
https://models.readyplayer.me/65a1b2c3d4e5f6g7h8i9j0k1.glb
```

**¿Dónde la encuentro?**
- Al finalizar la creación del avatar, Ready Player Me te mostró la URL
- También puedes obtenerla desde tu perfil en https://readyplayer.me/
- O volver a generar el avatar y copiar la URL al final

### 2. Configura la URL en Avatar3D.vue

Abre: `frontend/src/components/Avatar3D.vue`

En la línea 10, reemplaza `TU_ID_AQUI` con tu ID real:

```javascript
// 🎭 CONFIGURA AQUÍ LA URL DE TU AVATAR
const AVATAR_URL = 'https://models.readyplayer.me/65a1b2c3d4e5f6g7h8i9j0k1.glb'
//                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                          REEMPLAZA ESTO CON TU ID
```

### 3. ¿Dónde usar el Avatar?

Actualmente el avatar está en el componente `Avatar3D.vue`, pero **no se está usando** en ninguna vista.

**Opciones de integración:**

#### Opción A: En la sección "Sobre Mí" (Recomendado)
Reemplazar la imagen estática por el avatar 3D interactivo:

```vue
<!-- AboutSection.vue -->
<template>
  <section id="sobre-mi" class="about section-padding">
    <div class="container">
      <div class="about-content">
        <!-- Reemplazar imagen por avatar 3D -->
        <Avatar3D />
        
        <div class="about-text">
          <!-- Tu contenido actual -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Avatar3D from '../Avatar3D.vue'
</script>
```

#### Opción B: En la sección Hero (Inicio)
Avatar como elemento principal de bienvenida:

```vue
<!-- HeroSection.vue -->
<template>
  <section id="inicio" class="hero">
    <div class="hero-content">
      <Avatar3D />
      <h1>Lorenzo Daniel Arteaga</h1>
      <p>Full-Stack Developer</p>
    </div>
  </section>
</template>
```

#### Opción C: Como modal/popup interactivo
Avatar que aparece al hacer clic en un botón "Conoce mi avatar 3D"

### 4. Parámetros de configuración del Avatar

En `Avatar3D.vue`, puedes ajustar:

```javascript
// Posición (altura del avatar)
avatar.position.set(0, -1.5, 0)  // x, y, z
//                     ^^^^
//                     -1.5 = centrado verticalmente
//                     Aumenta para subirlo, disminuye para bajarlo

// Tamaño
avatar.scale.set(2, 2, 2)  // Escala 2x del original
//               ^
//               Aumenta para más grande, disminuye para más pequeño

// Cámara
camera.position.z = 5  // Distancia de la cámara
//                  ^
//                  Aumenta para alejarse, disminuye para acercarse

// Controles
controls.autoRotate = true  // Rotación automática
controls.autoRotateSpeed = 2  // Velocidad de rotación
```

### 5. Optimización para producción

Ready Player Me permite optimizar el modelo:

```javascript
// Añade parámetros a la URL para optimizar
const AVATAR_URL = 'https://models.readyplayer.me/TU_ID.glb?morphTargets=none&textureAtlas=1024'
//                                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                                                          Reduce tamaño del archivo
```

**Parámetros disponibles:**
- `morphTargets=none` - Sin animaciones faciales (reduce peso)
- `textureAtlas=1024` - Textura optimizada 1024x1024
- `lod=1` - Nivel de detalle medio (mejor performance)

### 6. Testing

```bash
# Inicia el servidor de desarrollo
pnpm dev

# Abre http://localhost:5173
# Verifica que el avatar cargue correctamente
# Comprueba la consola del navegador para errores
```

### 7. Solución de problemas comunes

**❌ Error: "Failed to load resource"**
- Verifica que la URL sea correcta
- Comprueba tu conexión a internet
- Asegúrate de que el avatar no fue eliminado de Ready Player Me

**❌ Avatar demasiado grande/pequeño**
```javascript
avatar.scale.set(1.5, 1.5, 1.5)  // Ajusta el valor
```

**❌ Avatar muy oscuro**
```javascript
// Aumenta la iluminación ambiental
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)  // Aumenta de 0.6 a 1.2
```

**❌ Performance lento**
- Usa parámetros de optimización en la URL
- Reduce `particlesCount` de 1000 a 500
- Desactiva `controls.autoRotate` en móviles

---

## 🎨 Próximos pasos después de configurar

1. **Animaciones**: Agregar animaciones idle (respiración, parpadeo)
2. **Iluminación dinámica**: Luces que cambian con el tema (claro/oscuro)
3. **Efectos de hover**: Avatar reacciona cuando pasas el mouse
4. **Expresiones**: Cambiar expresión facial al hacer clic

---

## 📚 Recursos

- [Documentación Ready Player Me](https://docs.readyplayer.me/)
- [Three.js GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
- [Avatar API Parameters](https://docs.readyplayer.me/ready-player-me/api-reference/avatars/full-body-avatars)

---

**¿Necesitas ayuda?** Avísame:
1. La URL de tu avatar
2. Dónde quieres mostrarlo (Sobre mí, Hero, Modal)
3. Cualquier problema que encuentres
