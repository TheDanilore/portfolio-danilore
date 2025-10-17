<template>
  <div class="cat-navigator" :class="{ 'cat-visible': isVisible }">
    <div class="cat-container" :style="catStyle">
      <div class="cat" :class="catState">
        <!-- Cabeza del gato -->
        <div class="cat-head">
          <!-- Orejas -->
          <div class="ear ear-left"></div>
          <div class="ear ear-right"></div>
          
          <!-- Cara -->
          <div class="cat-face">
            <!-- Ojos -->
            <div class="eye eye-left">
              <div class="pupil"></div>
            </div>
            <div class="eye eye-right">
              <div class="pupil"></div>
            </div>
            
            <!-- Nariz -->
            <div class="nose"></div>
            
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
        
        <!-- Pata (solo se ve cuando asoma) -->
        <div class="cat-paw"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const isVisible = ref(false)
const catState = ref('hidden') // hidden, peeking, visible
const catStyle = ref({})

const { y: scrollY } = useWindowScroll()

let hideTimeout = null
let peekInterval = null

// Función para mostrar el gato
const showCat = () => {
  isVisible.value = true
  catState.value = 'peeking'
  
  // Después de un momento, muestra más al gato
  setTimeout(() => {
    if (isVisible.value) {
      catState.value = 'visible'
    }
  }, 500)
  
  // Ocultar después de unos segundos
  hideTimeout = setTimeout(() => {
    hideCat()
  }, 3000)
}

// Función para ocultar el gato
const hideCat = () => {
  catState.value = 'peeking'
  setTimeout(() => {
    catState.value = 'hidden'
    setTimeout(() => {
      isVisible.value = false
    }, 500)
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
    if (scrollDiff > 100 && !isVisible.value) {
      showCat()
    }
    
    lastScrollY = currentScrollY
  }, 100)
}

// Apariciones aleatorias
const randomPeek = () => {
  peekInterval = setInterval(() => {
    // 20% de probabilidad de aparecer cada 5 segundos
    if (Math.random() < 0.2 && !isVisible.value) {
      showCat()
    }
  }, 5000)
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
  pointer-events: none;
}

.cat-container {
  position: fixed;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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

/* Responsive */
@media (max-width: 768px) {
  .cat-head {
    width: 60px;
    height: 60px;
  }
  
  .ear {
    width: 20px;
    height: 25px;
  }
  
  .cat-paw {
    width: 25px;
    height: 12px;
  }
}
</style>
