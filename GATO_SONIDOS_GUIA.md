# 🐱 Guía para Personalizar los Sonidos del Gato

Esta guía te explica cómo modificar los sonidos del gato en `CatNavigator.vue` de forma fácil y rápida.

## 📍 Ubicación del Código

Los sonidos están configurados en el archivo:
```
frontend/src/components/CatNavigator.vue
```

Busca las líneas que dicen:
```javascript
// 🎵 SONIDOS DEL GATO - PERSONALIZACIÓN FÁCIL
```

---

## 🎵 Sonido MIAU (Maullido)

### Configuración Actual:
```javascript
const MEOW_CONFIG = {
  type: 'sine',      // Tipo de onda
  startFreq: 400,    // Frecuencia inicial (Hz)
  peakFreq: 700,     // Frecuencia pico (Hz)
  endFreq: 250,      // Frecuencia final (Hz)
  duration: 0.4,     // Duración (segundos)
  volume: 0.4        // Volumen (0.0 a 1.0)
}
```

### Cómo Personalizarlo:

#### 1. Cambiar el **Tono** del Miau:
- **Miau más agudo** (gatito bebé):
  ```javascript
  startFreq: 600,
  peakFreq: 900,
  endFreq: 400
  ```

- **Miau más grave** (gato adulto):
  ```javascript
  startFreq: 300,
  peakFreq: 500,
  endFreq: 200
  ```

- **Miau súper agudo** (juguete):
  ```javascript
  startFreq: 800,
  peakFreq: 1200,
  endFreq: 600
  ```

#### 2. Cambiar la **Duración**:
- **Miau rápido** (corto):
  ```javascript
  duration: 0.2
  ```

- **Miau largo** (prolongado):
  ```javascript
  duration: 0.8
  ```

#### 3. Cambiar el **Tipo de Onda**:
- **`'sine'`**: Suave y natural (recomendado)
- **`'square'`**: Electrónico/robótico
- **`'sawtooth'`**: Áspero/ronco
- **`'triangle'`**: Intermedio

Ejemplo para miau robótico:
```javascript
type: 'square'
```

#### 4. Cambiar el **Volumen**:
- **Más silencioso**:
  ```javascript
  volume: 0.2
  ```

- **Más fuerte**:
  ```javascript
  volume: 0.6
  ```

---

## 😻 Sonido RONRONEO (Purr)

### Configuración Actual:
```javascript
const PURR_CONFIG = {
  type: 'sawtooth',  // Tipo de onda
  baseFreq: 70,      // Frecuencia base (Hz)
  duration: 1.5,     // Duración (segundos)
  pulses: 15,        // Número de vibraciones
  volume: 0.2        // Volumen (0.0 a 1.0)
}
```

### Cómo Personalizarlo:

#### 1. Cambiar la **Intensidad del Ronroneo**:
- **Ronroneo más fuerte** (gatito feliz):
  ```javascript
  volume: 0.3,
  pulses: 20
  ```

- **Ronroneo más suave** (gatito dormido):
  ```javascript
  volume: 0.15,
  pulses: 10,
  baseFreq: 60
  ```

#### 2. Cambiar la **Velocidad de Vibración**:
- **Ronroneo más rápido**:
  ```javascript
  pulses: 25,
  duration: 1.0
  ```

- **Ronroneo más lento** (relajado):
  ```javascript
  pulses: 10,
  duration: 2.0
  ```

#### 3. Cambiar el **Tono Base**:
- **Ronroneo más grave** (gato grande):
  ```javascript
  baseFreq: 50
  ```

- **Ronroneo más agudo** (gato pequeño):
  ```javascript
  baseFreq: 90
  ```

#### 4. Cambiar el **Tipo de Onda**:
- **`'sawtooth'`**: Vibrante y realista (recomendado)
- **`'triangle'`**: Más suave
- **`'square'`**: Más electrónico

---

## 🎨 Ejemplos de Configuraciones Predefinidas

### Gatito Bebé (Agudo y Juguetón):
```javascript
const MEOW_CONFIG = {
  type: 'sine',
  startFreq: 600,
  peakFreq: 900,
  endFreq: 400,
  duration: 0.3,
  volume: 0.5
}

const PURR_CONFIG = {
  type: 'sawtooth',
  baseFreq: 90,
  duration: 1.0,
  pulses: 20,
  volume: 0.25
}
```

### Gato Adulto (Grave y Relajado):
```javascript
const MEOW_CONFIG = {
  type: 'sine',
  startFreq: 300,
  peakFreq: 500,
  endFreq: 200,
  duration: 0.5,
  volume: 0.4
}

const PURR_CONFIG = {
  type: 'sawtooth',
  baseFreq: 60,
  duration: 2.0,
  pulses: 12,
  volume: 0.18
}
```

### Gato Robótico (Electrónico):
```javascript
const MEOW_CONFIG = {
  type: 'square',
  startFreq: 500,
  peakFreq: 800,
  endFreq: 300,
  duration: 0.4,
  volume: 0.3
}

const PURR_CONFIG = {
  type: 'square',
  baseFreq: 80,
  duration: 1.0,
  pulses: 30,
  volume: 0.2
}
```

### Gato Tímido (Silencioso):
```javascript
const MEOW_CONFIG = {
  type: 'sine',
  startFreq: 350,
  peakFreq: 550,
  endFreq: 250,
  duration: 0.3,
  volume: 0.25
}

const PURR_CONFIG = {
  type: 'triangle',
  baseFreq: 65,
  duration: 1.8,
  pulses: 10,
  volume: 0.15
}
```

---

## 🔧 Cómo Aplicar los Cambios

1. **Abre el archivo**: `frontend/src/components/CatNavigator.vue`

2. **Busca las configuraciones**: Encuentra `MEOW_CONFIG` y `PURR_CONFIG`

3. **Modifica los valores**: Cambia los números según lo que quieras

4. **Guarda el archivo**: Los cambios se aplicarán automáticamente si tienes el servidor de desarrollo corriendo

5. **Prueba el gato**: Haz clic en el gato para escuchar los nuevos sonidos

---

## 📊 Tabla de Referencia Rápida

| Parámetro | Valores Típicos | Efecto |
|-----------|----------------|--------|
| **startFreq** | 200-800 Hz | Tono inicial del miau |
| **peakFreq** | 400-1200 Hz | Tono más alto del miau |
| **endFreq** | 150-600 Hz | Tono final del miau |
| **baseFreq** | 50-100 Hz | Tono del ronroneo |
| **duration** | 0.2-2.0 s | Duración total del sonido |
| **pulses** | 5-30 | Vibraciones del ronroneo |
| **volume** | 0.1-0.6 | Volumen (no exceder 0.7) |

---

## 🎯 Consejos Profesionales

1. **No subas el volumen demasiado**: Valores mayores a 0.7 pueden distorsionar
2. **Mantén proporciones**: Si subes `startFreq`, también sube `peakFreq` y `endFreq`
3. **Prueba con diferentes navegadores**: Los sonidos pueden variar ligeramente
4. **Usa `sine` para naturalidad**: Es el tipo de onda más suave y realista
5. **Ajusta los pulses**: Más pulses = ronroneo más realista pero más procesamiento

---

## 🐾 Agregar Más Sonidos

Si quieres agregar un tercer sonido (por ejemplo, un bufido), puedes seguir este patrón:

```javascript
// Configuración de BUFIDO
const HISS_CONFIG = {
  type: 'sawtooth',
  startFreq: 200,
  endFreq: 100,
  duration: 0.8,
  volume: 0.3
}

// Función para reproducir BUFIDO
const playHissSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = HISS_CONFIG.type
  oscillator.frequency.setValueAtTime(HISS_CONFIG.startFreq, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(HISS_CONFIG.endFreq, audioContext.currentTime + HISS_CONFIG.duration)
  
  gainNode.gain.setValueAtTime(HISS_CONFIG.volume, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + HISS_CONFIG.duration)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + HISS_CONFIG.duration)
}
```

Luego puedes llamar `playHissSound()` en cualquier interacción del gato.

---

## 🎵 Usar Archivos de Audio (Alternativa)

Si prefieres usar archivos MP3/WAV reales en lugar de sonidos generados:

1. **Descarga sonidos de gato** de sitios como:
   - [Freesound.org](https://freesound.org)
   - [Mixkit.co](https://mixkit.co/free-sound-effects/cat/)
   - [Zapsplat.com](https://www.zapsplat.com)

2. **Guárdalos** en: `assets/sounds/meow.mp3` y `assets/sounds/purr.mp3`

3. **Reemplaza las funciones** con:
   ```javascript
   const playMeowSound = () => {
     const audio = new Audio('/assets/sounds/meow.mp3')
     audio.volume = 0.4
     audio.play()
   }

   const playPurrSound = () => {
     const audio = new Audio('/assets/sounds/purr.mp3')
     audio.volume = 0.3
     audio.play()
   }
   ```

---

## 📚 Recursos Adicionales

- **Web Audio API**: [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- **Frecuencias musicales**: [Frequency Chart](https://pages.mtu.edu/~suits/notefreqs.html)
- **Sonidos de animales**: [Animal Sound Database](https://animalsounds.fandom.com/wiki/Cat)

---

¡Diviértete personalizando los sonidos de tu gato! 🐱✨
