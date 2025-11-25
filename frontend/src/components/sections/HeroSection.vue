<template>
  <section id="inicio" class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="fade-in">Hola, soy <span class="highlight">Lorenzo Arteaga</span></h1>
          <h2 class="typewriter">{{ typedText }}<span class="cursor">|</span></h2>
          <p>Diseño arquitecturas escalables, integro sistemas complejos (ERP/CRM) y transformo datos en soluciones de negocio.</p>
          <div class="hero-buttons">
            <a href="#proyectos" class="btn btn-primary">Ver Proyectos</a>
            <a href="#contacto" class="btn btn-outline">Contáctame</a>
          </div>
        </div>
        <div class="hero-image">
          <Avatar3D />
        </div>
      </div>
      <Transition name="fade">
        <div v-if="showScrollIndicator" class="scroll-indicator">
          <span>Desplázate</span>
          <i class="fas fa-chevron-down"></i>
        </div>
      </Transition>
    </div>
    <div class="hero-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import Avatar3D from '../Avatar3D.vue'

const typedText = ref('')
const fullText = 'Software Developer | Cloud & Data Enthusiast'
let charIndex = 0

const { y: scrollY } = useWindowScroll()
const showScrollIndicator = ref(true)

const typeWriter = () => {
  if (charIndex < fullText.length) {
    typedText.value += fullText.charAt(charIndex)
    charIndex++
    setTimeout(typeWriter, 100)
  }
}

const handleScroll = () => {
  showScrollIndicator.value = scrollY.value < 100
}

onMounted(() => {
  setTimeout(typeWriter, 500)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 80px;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  animation: fadeInUp 1s ease;
}

.hero-text h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.typewriter {
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-family: var(--font-display);
}

.cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}

.hero-text p {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-outline {
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

.hero-image {
  height: 500px;
  animation: fadeInUp 1s ease 0.3s backwards;
}

.scroll-indicator {
  text-align: center;
  margin-top: 4rem;
  animation: fadeInUp 1s ease 1s backwards;
}

.scroll-indicator span {
  display: block;
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.scroll-indicator i {
  font-size: 1.5rem;
  color: var(--primary-color);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: 10%;
  left: -100px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  bottom: 20%;
  right: -50px;
  animation-delay: -5s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  top: 50%;
  right: 10%;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-50px) rotate(180deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .hero-image {
    height: 400px;
  }
  
  .hero-text {
    text-align: center;
  }
  
  .hero-buttons {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .hero-image {
    height: 300px;
  }
}
</style>
