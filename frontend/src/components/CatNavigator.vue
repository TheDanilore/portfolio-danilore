<template>
  <div class="cat-navigator" :class="{ 'cat-visible': isVisible }">
    <div class="cat-container" :style="catStyle" @click="handleCatClick">
      <div class="cat" :class="[catState, { 'cat-jumping': isJumping, 'cat-dancing': isDancing, 'cat-shaking': isShaking }]">
        <!-- Cabeza del gato -->
        <div class="cat-head">
          <!-- Orejas -->
          <div class="ear ear-left"></div>
          <div class="ear ear-right"></div>
          
          <!-- Cara -->
          <div class="cat-face">
            <!-- Ojos -->
            <div class="eye eye-left" :class="{ 'eye-happy': isHappy }">
              <div class="pupil"></div>
            </div>
            <div class="eye eye-right" :class="{ 'eye-happy': isHappy }">
              <div class="pupil"></div>
            </div>
            
            <!-- Nariz -->
            <div class="nose"></div>
            
            <!-- Boca (sonrisa cuando está feliz) -->
            <div class="mouth" :class="{ 'mouth-happy': isHappy }"></div>
            
            <!-- Bigotes -->
            <div class="whiskers whiskers-left">
              <div class="whisker"></div>
              <div class="whisker"></div>
              <div class="whisker"></div>
            </div>
            <div class="whiskers whiskers-right">
              <div class="whisker"></div>
              <div class="whisker"></div>
              <div class="whisker"></div>
            </div>
          </div>
        </div>
        
        <!-- Cuerpo (se muestra cuando está visible completo) -->
        <div class="cat-body" v-if="catState === 'full-visible' || isDancing || isJumping">
          <div class="cat-belly"></div>
        </div>
        
        <!-- Patas -->
        <div class="cat-legs" v-if="catState === 'full-visible' || isDancing || isJumping">
          <div class="cat-leg leg-left"></div>
          <div class="cat-leg leg-right"></div>
        </div>
        
        <!-- Cola -->
        <div class="cat-tail" v-if="catState === 'full-visible' || isDancing || isJumping"></div>
        
        <!-- Pata asomando (solo cuando está escondido) -->
        <div class="cat-paw" v-if="catState !== 'full-visible' && !isDancing && !isJumping"></div>
      </div>
      
      <!-- Mensaje del gato -->
      <div class="cat-message" v-if="showMessage">
        {{ currentMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const isVisible = ref(false)
const catState = ref('hidden') // hidden, peeking, visible, full-visible
const catStyle = ref({})
const isJumping = ref(false)
const isDancing = ref(false)
const isHappy = ref(false)
const isShaking = ref(false)
const showMessage = ref(false)
const currentMessage = ref('')

const { y: scrollY } = useWindowScroll()

let hideTimeout = null
let peekInterval = null
let clickCount = 0
let isInteracting = ref(false) // Nueva bandera para saber si el usuario está interactuando

// 🎵 SONIDOS DEL GATO - PERSONALIZACIÓN FÁCIL
// Puedes cambiar estos valores para modificar los sonidos:

// Sonido MIAU - Configuración
// const MEOW_CONFIG = {
//   type: 'sine', // Tipo de onda: 'sine', 'square', 'sawtooth', 'triangle'
//   startFreq: 400, // Frecuencia inicial (Hz) - más alto = más agudo
//   peakFreq: 700,  // Frecuencia pico (Hz) - 600-800 suena más realista
//   endFreq: 250,   // Frecuencia final (Hz) - más bajo = más grave
//   duration: 0.4,  // Duración total (segundos)
//   volume: 0.4     // Volumen (0.0 a 1.0)
// }

// Sonido RONRONEO - Configuración
// const PURR_CONFIG = {
//   type: 'square', // 'sawtooth' da efecto más vibrante
//   baseFreq: 100,     // Frecuencia base (Hz) - 60-90 suena natural
//   duration: 1.5,    // Duración total (segundos)
//   pulses: 15,       // Número de vibraciones - más = más realista
//   volume: 0.4       // Volumen (0.0 a 1.0)
// }

// Función para reproducir MIAU
// const playMeowSound = () => {
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)()
//   const oscillator = audioContext.createOscillator()
//   const gainNode = audioContext.createGain()
  
//   oscillator.connect(gainNode)
//   gainNode.connect(audioContext.destination)
  
//   // Aplicar configuración personalizada
//   oscillator.type = MEOW_CONFIG.type
//   oscillator.frequency.setValueAtTime(MEOW_CONFIG.startFreq, audioContext.currentTime)
//   oscillator.frequency.exponentialRampToValueAtTime(MEOW_CONFIG.peakFreq, audioContext.currentTime + MEOW_CONFIG.duration * 0.25)
//   oscillator.frequency.exponentialRampToValueAtTime(MEOW_CONFIG.endFreq, audioContext.currentTime + MEOW_CONFIG.duration)
  
//   // Envelope de volumen (fade in/out más natural)
//   gainNode.gain.setValueAtTime(0, audioContext.currentTime)
//   gainNode.gain.linearRampToValueAtTime(MEOW_CONFIG.volume, audioContext.currentTime + 0.05)
//   gainNode.gain.linearRampToValueAtTime(MEOW_CONFIG.volume * 0.7, audioContext.currentTime + MEOW_CONFIG.duration * 0.5)
//   gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + MEOW_CONFIG.duration)
  
//   oscillator.start(audioContext.currentTime)
//   oscillator.stop(audioContext.currentTime + MEOW_CONFIG.duration)
// }
const playMeowSound = () => {
  try {
    const audio = new Audio('/sounds/meow.mp3')
    audio.volume = 0.5
    audio.play().catch(err => {
      console.error('❌ Error reproduciendo meow:', err)
      console.log('Verifica que el archivo esté en: frontend/public/sounds/meow.mp3')
    })
  } catch (error) {
    console.error('❌ Error creando audio:', error)
  }
}


// Función para reproducir RONRONEO
// const playPurrSound = () => {
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)()
//   const oscillator = audioContext.createOscillator()
//   const gainNode = audioContext.createGain()
  
//   oscillator.connect(gainNode)
//   gainNode.connect(audioContext.destination)
  
//   // Aplicar configuración personalizada
//   oscillator.type = PURR_CONFIG.type
//   oscillator.frequency.setValueAtTime(PURR_CONFIG.baseFreq, audioContext.currentTime)
  
//   // Modulación para efecto de ronroneo (vibraciones)
//   const pulseInterval = PURR_CONFIG.duration / PURR_CONFIG.pulses
//   gainNode.gain.setValueAtTime(PURR_CONFIG.volume * 0.3, audioContext.currentTime)
  
//   for (let i = 0; i < PURR_CONFIG.pulses; i++) {
//     const time = audioContext.currentTime + (i * pulseInterval)
//     gainNode.gain.linearRampToValueAtTime(PURR_CONFIG.volume * 0.6, time)
//     gainNode.gain.linearRampToValueAtTime(PURR_CONFIG.volume * 0.3, time + pulseInterval * 0.5)
//   }
  
//   gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + PURR_CONFIG.duration)
  
//   oscillator.start(audioContext.currentTime)
//   oscillator.stop(audioContext.currentTime + PURR_CONFIG.duration)
// }
const playPurrSound = () => {
  try {
    const audio = new Audio('/sounds/purr.mp3')
    audio.volume = 0.9
    audio.play().catch(err => {
      console.error('❌ Error reproduciendo purr:', err)
      console.log('Verifica que el archivo esté en: frontend/public/sounds/purr.mp3')
    })
  } catch (error) {
    console.error('❌ Error creando audio:', error)
  }
}

// Función para reproducir MIAU ENOJADO (NUEVO)
const playAngryMeowSound = () => {
  try {
    const audio = new Audio('/sounds/meow-angry.mp3')
    audio.volume = 0.5
    audio.play().catch(err => {
      console.error('❌ Error reproduciendo meow-angry:', err)
      console.log('Verifica que el archivo esté en: frontend/public/sounds/meow-angry.mp3')
    })
  } catch (error) {
    console.error('❌ Error creando audio:', error)
  }
}

// Mensajes aleatorios del gato (más variedad y personalidad)
const catMessages = [
  '¡Miau! 😸',
  '¡Hola humano! 👋',
  '¿Me das comida? 🐟',
  '¡Soy adorable! 💖',
  '¡Bailemos! 🎵',
  '¡Ronroneo! 😻',
  '¡Salta conmigo! 🦘',
  '¡Eres genial! ⭐',
  '¡Acaríciame! 🤗',
  '¡Estoy feliz! 😊',
  '¡Mira mi cola! 🎨',
  '¡Juguemos! 🎮',
  '¡Qué bonito día! ☀️',
  '¡Te quiero! ❤️',
  '¡Soy el mejor! 👑',
  '¡Súper salto! 🦘',
  '¡Fiesta! 🎉',
  '¡Sorpresa! ✨'
]

// Función para mostrar mensaje
const showCatMessage = () => {
  currentMessage.value = catMessages[Math.floor(Math.random() * catMessages.length)]
  showMessage.value = true
  
  setTimeout(() => {
    showMessage.value = false
  }, 2000)
}

// Función para hacer que el gato baile
const makeCatDance = () => {
  isDancing.value = true
  isHappy.value = true
  catState.value = 'full-visible'
  
  setTimeout(() => {
    isDancing.value = false
    isHappy.value = false
  }, 3000)
}

// Función para hacer que el gato salte
const makeCatJump = () => {
  isJumping.value = true
  isHappy.value = true
  catState.value = 'full-visible' // Mostrar completo al saltar
  
  setTimeout(() => {
    isJumping.value = false
    isHappy.value = false
  }, 600)
}

// Función para hacer que el gato se sacuda (nuevo)
const makeCatShake = () => {
  isShaking.value = true
  isHappy.value = true
  catState.value = 'full-visible'
  
  setTimeout(() => {
    isShaking.value = false
    isHappy.value = false
  }, 800)
}

// Manejar clic en el gato (¡aquí está la magia! ✨)
const handleCatClick = () => {
  if (!isVisible.value) return
  
  clickCount++
  isInteracting.value = true
  
  // Cancelar TODOS los timeouts anteriores
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  
  // Diferentes comportamientos según el número de clics
  if (clickCount === 1) {
    // Primer clic: Mostrar completo + Miau + Sonrisa
    playMeowSound()
    catState.value = 'full-visible'
    isHappy.value = true
    showCatMessage()
    
    setTimeout(() => {
      isHappy.value = false
    }, 2000)
  } else if (clickCount === 2) {
    // Segundo clic: Saltar + Miau
    playMeowSound()
    makeCatJump()
    showCatMessage()
  } else if (clickCount === 3) {
    // Tercer clic: Bailar + Ronroneo
    playPurrSound()
    makeCatDance()
    showCatMessage()
  } else if (clickCount === 4) {
    // Cuarto clic: Sacudida + Ronroneo
    playPurrSound()
    makeCatShake()
    showCatMessage()
  } else if (clickCount === 5) {
    // Quinto clic: Salto especial + Miau
    playMeowSound()
    makeCatJump()
    catState.value = 'full-visible'
    isHappy.value = true
    showCatMessage()
    setTimeout(() => {
      isHappy.value = false
    }, 1500)
  } else {
    // Más clics: Acción aleatoria (4 opciones)
    const randomAction = Math.floor(Math.random() * 4)
    
    if (randomAction === 0) {
      playMeowSound()
      makeCatJump()
    } else if (randomAction === 1) {
      playPurrSound()
      makeCatDance()
    } else if (randomAction === 2) {
      playPurrSound()
      makeCatShake()
    } else {
      // randomAction === 3
      playAngryMeowSound()
      makeCatShake()
    }
    
    showCatMessage()
  }
  
  // Programar ocultación después de 5 segundos (CON clic)
  hideTimeout = setTimeout(() => {
    isInteracting.value = false
    hideCat()
  }, 5000) // 5 segundos con clic
  
  // Resetear el contador después de 5 segundos sin clics
  setTimeout(() => {
    clickCount = 0
  }, 5000)
}

// Programar ocultación del gato
const scheduleHide = () => {
  clearTimeout(hideTimeout)
  if (!isInteracting.value) {
    hideTimeout = setTimeout(() => {
      hideCat()
    }, 3000) // 3 segundos SIN clic
  }
}

// Función para mostrar el gato
const showCat = () => {
  // No mostrar si el usuario está interactuando
  if (isInteracting.value) return
  
  isVisible.value = true
  catState.value = 'peeking'
  
  // Después de un momento, muestra más al gato
  setTimeout(() => {
    if (isVisible.value && !isInteracting.value) {
      catState.value = 'visible'
    }
  }, 500)
  
  // Ocultar después de más tiempo
  scheduleHide()
}

// Función para ocultar el gato
const hideCat = () => {
  // No ocultar si el usuario está interactuando
  if (isInteracting.value) return
  
  catState.value = 'peeking'
  setTimeout(() => {
    if (!isInteracting.value) {
      catState.value = 'hidden'
      setTimeout(() => {
        if (!isInteracting.value) {
          isVisible.value = false
        }
      }, 500)
    }
  }, 300)
}

// Detección de scroll
let lastScrollY = 0
let scrollTimeout = null

const handleScroll = () => {
  clearTimeout(scrollTimeout)
  
  scrollTimeout = setTimeout(() => {
    const currentScrollY = scrollY.value
    const scrollDiff = Math.abs(currentScrollY - lastScrollY)
    
    // Si hay un scroll significativo, mostrar el gato
    if (scrollDiff > 100 && !isVisible.value && !isInteracting.value) {
      showCat()
    }
    
    lastScrollY = currentScrollY
  }, 100)
}

// Apariciones aleatorias
const randomPeek = () => {
  peekInterval = setInterval(() => {
    // 20% de probabilidad de aparecer cada 8 segundos (aumentado de 5s)
    if (Math.random() < 0.2 && !isVisible.value && !isInteracting.value) {
      showCat()
    }
  }, 8000)
}

// Posicionar aleatoriamente el gato
const randomPosition = () => {
  const positions = ['bottom-left', 'bottom-right']
  const position = positions[Math.floor(Math.random() * positions.length)]
  
  switch (position) {
    case 'bottom-left':
      catStyle.value = { left: '2rem', bottom: '0', transform: 'translateY(100%)' }
      break
    case 'bottom-right':
      catStyle.value = { right: '2rem', bottom: '0', transform: 'translateY(100%)' }
      break
  }
}

onMounted(() => {
  randomPosition()
  randomPeek()
  
  // Primera aparición después de 3 segundos
  setTimeout(() => {
    showCat()
  }, 3000)
  
  // Observar scroll
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  clearTimeout(hideTimeout)
  clearInterval(peekInterval)
  clearTimeout(scrollTimeout)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.cat-navigator {
  position: fixed;
  z-index: 998;
  pointer-events: auto; /* Permitir clics en el gato */
}

.cat-container {
  position: fixed;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  cursor: pointer;
  pointer-events: auto; /* Asegurar que los clics funcionen */
}

.cat-container:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.cat {
  position: relative;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  will-change: transform;
}

/* Estados del gato */
.cat.hidden {
  transform: translateY(120%);
}

.cat.peeking {
  transform: translateY(-30%);
}

.cat.visible {
  transform: translateY(-60%);
}

.cat.full-visible {
  transform: translateY(-200%); /* Aumentado para que se vea completamente */
}

/* Animación de salto */
.cat-jumping {
  animation: cat-jump 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes cat-jump {
  0%, 100% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(-180%);
  }
}

/* Animación de baile */
.cat-dancing {
  animation: cat-dance 0.5s ease-in-out infinite;
}

@keyframes cat-dance {
  0%, 100% {
    transform: translateY(-100%) rotate(-5deg);
  }
  50% {
    transform: translateY(-112%) rotate(5deg);
  }
}

/* Animación de sacudida (nuevo) */
.cat-shaking {
  animation: cat-shake 0.1s ease-in-out infinite;
}

@keyframes cat-shake {
  0%, 100% {
    transform: translateY(-100%) translateX(-3px);
  }
  50% {
    transform: translateY(-100%) translateX(3px);
  }
}

/* Cabeza del gato */
.cat-head {
  position: relative;
  width: 95px;
  height: 90px;
  background: linear-gradient(145deg, #ffb347 0%, #ffa500 50%, #ff8c00 100%);
  border-radius: 50% 50% 45% 45%;
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 -5px 15px rgba(255, 140, 0, 0.4),
    inset 0 5px 15px rgba(255, 179, 71, 0.3);
  animation: cat-breathe 2s ease-in-out infinite;
}

@keyframes cat-breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* Orejas */
.ear {
  position: absolute;
  width: 30px;
  height: 40px;
  background: linear-gradient(145deg, #ffb347 0%, #ffa500 50%, #ff8c00 100%);
  border-radius: 85% 85% 0 0;
  top: -18px;
  box-shadow: 
    inset 0 -3px 8px rgba(255, 140, 0, 0.3),
    2px 2px 8px rgba(0, 0, 0, 0.2);
}

.ear::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 24px;
  background: linear-gradient(145deg, #ffd699 0%, #ffcc80 100%);
  border-radius: 85% 85% 0 0;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: inset 0 1px 3px rgba(255, 140, 0, 0.2);
}

.ear-left {
  left: 10px;
  transform: rotate(-25deg);
}

.ear-right {
  right: 10px;
  transform: rotate(25deg);
}

/* Cara */
.cat-face {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

/* Ojos */
.eye {
  position: absolute;
  width: 16px;
  height: 20px;
  background: linear-gradient(145deg, #fff 0%, #f5f5f5 100%);
  border-radius: 60% 60% 55% 55%;
  top: 35%;
  animation: blink 4s infinite;
  transition: all 0.3s ease;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(255, 255, 255, 0.8);
}

/* Ojos felices (forma de medialuna) */
.eye-happy {
  height: 10px;
  border-radius: 50% 50% 0 0;
  transform: translateY(5px);
  animation: none;
}

.eye-left {
  left: 24%;
}

.eye-right {
  right: 24%;
}

.pupil {
  position: absolute;
  width: 8px;
  height: 10px;
  background: radial-gradient(circle at 30% 30%, #333 0%, #000 100%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: look-around 5s infinite;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.pupil::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  top: 25%;
  left: 30%;
}

@keyframes blink {
  0%, 48%, 52%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.1);
  }
}

@keyframes look-around {
  0%, 100% {
    transform: translate(-50%, -50%);
  }
  25% {
    transform: translate(-30%, -50%);
  }
  75% {
    transform: translate(-70%, -50%);
  }
}

/* Nariz */
.nose {
  position: absolute;
  width: 10px;
  height: 8px;
  background: linear-gradient(145deg, #ff8b8b 0%, #ff6b6b 50%, #ff4757 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  top: 52%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.3),
    inset 0 -1px 2px rgba(255, 71, 87, 0.4),
    inset 0 1px 1px rgba(255, 139, 139, 0.6);
}

.nose::after {
  content: '';
  position: absolute;
  width: 1px;
  height: 4px;
  background: linear-gradient(to bottom, #ff4757 0%, transparent 100%);
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
}

/* Boca */
.mouth {
  position: absolute;
  width: 20px;
  height: 10px;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mouth-happy {
  opacity: 1;
}

.mouth-happy::before,
.mouth-happy::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border: 2px solid #333;
  border-top: none;
  border-right: none;
  border-radius: 0 0 0 100%;
}

.mouth-happy::before {
  left: 0;
  transform: rotate(-20deg);
}

.mouth-happy::after {
  right: 0;
  transform: rotate(20deg) scaleX(-1);
}

/* Bigotes */
.whiskers {
  position: absolute;
  top: 52%;
}

.whiskers-left {
  left: -18px;
}

.whiskers-right {
  right: -18px;
  transform: scaleX(-1);
}

.whisker {
  width: 24px;
  height: 1.5px;
  background: linear-gradient(to right, rgba(51, 51, 51, 0.9) 0%, rgba(51, 51, 51, 0.5) 70%, transparent 100%);
  margin: 5px 0;
  border-radius: 50%;
  transform-origin: right;
  animation: whisker-move 2s ease-in-out infinite;
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.2);
}

.whisker:nth-child(1) {
  transform: rotate(-15deg);
  width: 26px;
}

.whisker:nth-child(2) {
  transform: rotate(0deg);
  animation-delay: 0.2s;
  width: 24px;
}

.whisker:nth-child(3) {
  transform: rotate(15deg);
  animation-delay: 0.4s;
  width: 22px;
}

@keyframes whisker-move {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

/* Pata */
.cat-paw {
  position: absolute;
  width: 32px;
  height: 16px;
  background: linear-gradient(145deg, #ffb347 0%, #ffa500 50%, #ff8c00 100%);
  border-radius: 42% 42% 52% 52%;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 
    0 6px 18px rgba(0, 0, 0, 0.25),
    inset 0 -2px 6px rgba(255, 140, 0, 0.3);
}

.cat-paw::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 11px;
  background: linear-gradient(145deg, #ffd699 0%, #ffcc80 50%, #ffb84d 100%);
  border-radius: 50%;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: inset 0 1px 3px rgba(255, 140, 0, 0.2);
}

/* Cuerpo del gato */
.cat-body {
  position: absolute;
  width: 80px;
  height: 90px;
  background: linear-gradient(145deg, #ffb347 0%, #ffa500 50%, #ff8c00 100%);
  border-radius: 45% 45% 38% 38%;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 
    0 12px 30px rgba(0, 0, 0, 0.25),
    inset 0 -8px 20px rgba(255, 140, 0, 0.3),
    inset 0 8px 20px rgba(255, 179, 71, 0.2);
}

.cat-belly {
  position: absolute;
  width: 56px;
  height: 70px;
  background: linear-gradient(145deg, #ffd699 0%, #ffcc80 50%, #ffb84d 100%);
  border-radius: 50%;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 
    inset 0 2px 8px rgba(255, 140, 0, 0.2),
    0 2px 4px rgba(255, 255, 255, 0.3);
}

/* Patas del gato */
.cat-legs {
  position: absolute;
  top: 158px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 24px;
}

.cat-leg {
  width: 24px;
  height: 44px;
  background: linear-gradient(145deg, #ffb347 0%, #ffa500 50%, #ff8c00 100%);
  border-radius: 12px 12px 45% 45%;
  box-shadow: 
    0 6px 18px rgba(0, 0, 0, 0.25),
    inset -2px 0 8px rgba(255, 140, 0, 0.3),
    inset 2px 0 8px rgba(255, 179, 71, 0.2);
}

.cat-leg::after {
  content: '';
  position: absolute;
  width: 26px;
  height: 18px;
  background: linear-gradient(145deg, #ffd699 0%, #ffcc80 50%, #ffb84d 100%);
  border-radius: 50%;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.2),
    inset 0 1px 3px rgba(255, 140, 0, 0.2);
}

.cat-leg::before {
  content: '';
  position: absolute;
  width: 7px;
  height: 7px;
  background: rgba(255, 140, 0, 0.3);
  border-radius: 50%;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
}

/* Cola del gato */
.cat-tail {
  position: absolute;
  width: 16px;
  height: 90px;
  background: linear-gradient(145deg, #ffb347 0%, #ffa500 40%, #ff8c00 100%);
  border-radius: 50% 50% 28px 28px;
  top: 105px;
  right: 20px;
  transform-origin: top center;
  animation: tail-wag 1.2s ease-in-out infinite;
  box-shadow: 
    2px 2px 12px rgba(0, 0, 0, 0.25),
    inset -2px 0 8px rgba(255, 140, 0, 0.3);
}

.cat-tail::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: linear-gradient(145deg, #ffcc80 0%, #ff8c00 100%);
  border-radius: 50%;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

@keyframes tail-wag {
  0%, 100% {
    transform: rotate(-65deg);
  }
  50% {
    transform: rotate(-85deg);
  }
}

/* Mensaje del gato */
.cat-message {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 8px 15px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  animation: message-bounce 0.5s ease-out;
  pointer-events: none;
}

.cat-message::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(255, 255, 255, 0.95);
}

@keyframes message-bounce {
  0% {
    transform: translateX(-50%) translateY(10px) scale(0);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) translateY(-5px) scale(1.1);
  }
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .cat-head {
    width: 75px;
    height: 72px;
  }
  
  .ear {
    width: 24px;
    height: 32px;
    top: -14px;
  }
  
  .ear::after {
    width: 13px;
    height: 19px;
  }
  
  .cat-body {
    width: 62px;
    height: 70px;
    top: 68px;
  }
  
  .cat-belly {
    width: 44px;
    height: 55px;
  }
  
  .cat-legs {
    top: 125px;
    gap: 18px;
  }
  
  .cat-leg {
    width: 18px;
    height: 34px;
  }
  
  .cat-leg::after {
    width: 20px;
    height: 14px;
  }
  
  .cat-tail {
    width: 13px;
    height: 70px;
    top: 82px;
  }
  
  .cat-tail::after {
    width: 16px;
    height: 16px;
  }
  
  .cat-paw {
    width: 28px;
    height: 14px;
  }
  
  .cat-paw::after {
    width: 19px;
    height: 10px;
  }
  
  .eye {
    width: 13px;
    height: 16px;
  }
  
  .pupil {
    width: 6px;
    height: 8px;
  }
  
  .cat-message {
    font-size: 12px;
    padding: 6px 12px;
    top: -35px;
  }
}
</style>
