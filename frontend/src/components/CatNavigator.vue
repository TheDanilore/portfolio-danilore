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
const MEOW_CONFIG = {
  type: 'sine', // Tipo de onda: 'sine', 'square', 'sawtooth', 'triangle'
  startFreq: 400, // Frecuencia inicial (Hz) - más alto = más agudo
  peakFreq: 700,  // Frecuencia pico (Hz) - 600-800 suena más realista
  endFreq: 250,   // Frecuencia final (Hz) - más bajo = más grave
  duration: 0.4,  // Duración total (segundos)
  volume: 0.4     // Volumen (0.0 a 1.0)
}

// Sonido RONRONEO - Configuración
const PURR_CONFIG = {
  type: 'sawtooth', // 'sawtooth' da efecto más vibrante
  baseFreq: 60,     // Frecuencia base (Hz) - 60-90 suena natural
  duration: 1.5,    // Duración total (segundos)
  pulses: 15,       // Número de vibraciones - más = más realista
  volume: 0.2       // Volumen (0.0 a 1.0)
}

// Función para reproducir MIAU
const playMeowSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  // Aplicar configuración personalizada
  oscillator.type = MEOW_CONFIG.type
  oscillator.frequency.setValueAtTime(MEOW_CONFIG.startFreq, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(MEOW_CONFIG.peakFreq, audioContext.currentTime + MEOW_CONFIG.duration * 0.25)
  oscillator.frequency.exponentialRampToValueAtTime(MEOW_CONFIG.endFreq, audioContext.currentTime + MEOW_CONFIG.duration)
  
  // Envelope de volumen (fade in/out más natural)
  gainNode.gain.setValueAtTime(0, audioContext.currentTime)
  gainNode.gain.linearRampToValueAtTime(MEOW_CONFIG.volume, audioContext.currentTime + 0.05)
  gainNode.gain.linearRampToValueAtTime(MEOW_CONFIG.volume * 0.7, audioContext.currentTime + MEOW_CONFIG.duration * 0.5)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + MEOW_CONFIG.duration)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + MEOW_CONFIG.duration)
}

// Función para reproducir RONRONEO
const playPurrSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  // Aplicar configuración personalizada
  oscillator.type = PURR_CONFIG.type
  oscillator.frequency.setValueAtTime(PURR_CONFIG.baseFreq, audioContext.currentTime)
  
  // Modulación para efecto de ronroneo (vibraciones)
  const pulseInterval = PURR_CONFIG.duration / PURR_CONFIG.pulses
  gainNode.gain.setValueAtTime(PURR_CONFIG.volume * 0.3, audioContext.currentTime)
  
  for (let i = 0; i < PURR_CONFIG.pulses; i++) {
    const time = audioContext.currentTime + (i * pulseInterval)
    gainNode.gain.linearRampToValueAtTime(PURR_CONFIG.volume * 0.6, time)
    gainNode.gain.linearRampToValueAtTime(PURR_CONFIG.volume * 0.3, time + pulseInterval * 0.5)
  }
  
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + PURR_CONFIG.duration)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + PURR_CONFIG.duration)
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
  '¡Soy el mejor! 👑'
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
  clickCount++
  isInteracting.value = true
  
  // Cancelar cualquier timeout de ocultación
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
    }, 2000) // Más tiempo de sonrisa
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
  } else {
    // Más clics: Acción aleatoria (más variedad)
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
      playMeowSound()
      catState.value = 'full-visible'
      isHappy.value = true
      setTimeout(() => {
        isHappy.value = false
      }, 1500)
    }
    
    showCatMessage()
  }
  
  // Resetear la bandera de interacción después de 3 segundos
  setTimeout(() => {
    isInteracting.value = false
    // Solo ocultar si no está en estado full-visible
    if (catState.value !== 'full-visible') {
      scheduleHide()
    }
  }, 8000) // Más tiempo antes de ocultarse después de interactuar
  
  // Resetear el contador después de 5 segundos sin clics
  setTimeout(() => {
    clickCount = 0
  }, 5000)
}

// Programar ocultación del gato
const scheduleHide = () => {
  if (!isInteracting.value) {
    hideTimeout = setTimeout(() => {
      hideCat()
    }, 8000) // Aumentado de 3s a 8s
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
  transform: translateY(-20%);
}

.cat.visible {
  transform: translateY(-50%);
}

.cat.full-visible {
  transform: translateY(-80%);
}

/* Animación de salto */
.cat-jumping {
  animation: cat-jump 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes cat-jump {
  0%, 100% {
    transform: translateY(-80%);
  }
  50% {
    transform: translateY(-150%);
  }
}

/* Animación de baile */
.cat-dancing {
  animation: cat-dance 0.5s ease-in-out infinite;
}

@keyframes cat-dance {
  0%, 100% {
    transform: translateY(-80%) rotate(-5deg);
  }
  50% {
    transform: translateY(-90%) rotate(5deg);
  }
}

/* Animación de sacudida (nuevo) */
.cat-shaking {
  animation: cat-shake 0.1s ease-in-out infinite;
}

@keyframes cat-shake {
  0%, 100% {
    transform: translateY(-80%) translateX(-2px);
  }
  50% {
    transform: translateY(-80%) translateX(2px);
  }
}

/* Cabeza del gato */
.cat-head {
  position: relative;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
  border-radius: 45% 45% 40% 40%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
  height: 35px;
  background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
  border-radius: 80% 80% 0 0;
  top: -12px;
}

.ear::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 20px;
  background: #ffb84d;
  border-radius: 80% 80% 0 0;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
}

.ear-left {
  left: 10px;
  transform: rotate(-20deg);
}

.ear-right {
  right: 10px;
  transform: rotate(20deg);
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
  width: 12px;
  height: 16px;
  background: #fff;
  border-radius: 50% 50% 50% 50%;
  top: 35%;
  animation: blink 4s infinite;
  transition: all 0.3s ease;
}

/* Ojos felices (forma de medialuna) */
.eye-happy {
  height: 8px;
  border-radius: 50% 50% 0 0;
  transform: translateY(4px);
  animation: none;
}

.eye-left {
  left: 25%;
}

.eye-right {
  right: 25%;
}

.pupil {
  position: absolute;
  width: 6px;
  height: 8px;
  background: #000;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: look-around 5s infinite;
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
  width: 8px;
  height: 6px;
  background: #ff6b6b;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  top: 55%;
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
  top: 55%;
}

.whiskers-left {
  left: -15px;
}

.whiskers-right {
  right: -15px;
  transform: scaleX(-1);
}

.whisker {
  width: 20px;
  height: 1px;
  background: #333;
  margin: 4px 0;
  border-radius: 50%;
  transform-origin: right;
  animation: whisker-move 2s ease-in-out infinite;
}

.whisker:nth-child(1) {
  transform: rotate(-10deg);
}

.whisker:nth-child(2) {
  transform: rotate(0deg);
  animation-delay: 0.2s;
}

.whisker:nth-child(3) {
  transform: rotate(10deg);
  animation-delay: 0.4s;
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
  width: 30px;
  height: 15px;
  background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
  border-radius: 40% 40% 50% 50%;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.cat-paw::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 10px;
  background: #ffb84d;
  border-radius: 50%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

/* Cuerpo del gato */
.cat-body {
  position: absolute;
  width: 70px;
  height: 80px;
  background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
  border-radius: 40% 40% 30% 30%;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.cat-belly {
  position: absolute;
  width: 50px;
  height: 60px;
  background: #ffb84d;
  border-radius: 50%;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

/* Patas del gato */
.cat-legs {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
}

.cat-leg {
  width: 20px;
  height: 40px;
  background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
  border-radius: 10px 10px 40% 40%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.cat-leg::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 15px;
  background: #ffb84d;
  border-radius: 50%;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}

/* Cola del gato */
.cat-tail {
  position: absolute;
  width: 15px;
  height: 80px;
  background: linear-gradient(135deg, #ffa500 0%, #ff8c00 100%);
  border-radius: 20px;
  top: 100px;
  right: -20px;
  transform-origin: top;
  animation: tail-wag 1s ease-in-out infinite;
}

@keyframes tail-wag {
  0%, 100% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
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
    width: 70px;
    height: 70px;
  }
  
  .ear {
    width: 22px;
    height: 28px;
  }
  
  .cat-body {
    width: 55px;
    height: 65px;
    top: 65px;
  }
  
  .cat-legs {
    top: 115px;
  }
  
  .cat-leg {
    width: 16px;
    height: 32px;
  }
  
  .cat-tail {
    height: 65px;
    top: 75px;
  }
  
  .cat-paw {
    width: 25px;
    height: 12px;
  }
  
  .cat-message {
    font-size: 12px;
    padding: 6px 12px;
    top: -35px;
  }
}
</style>
