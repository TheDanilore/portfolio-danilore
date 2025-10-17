<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <router-link to="/" class="logo">
        <span class="logo-text">The<span class="highlight">Danilore</span></span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="nav-desktop" v-if="!isProjectsPage">
        <a href="#inicio" class="nav-link" :class="{ active: isActive('inicio') }">Inicio</a>
        <a href="#sobre-mi" class="nav-link" :class="{ active: isActive('sobre-mi') }">Sobre Mí</a>
        <a href="#proyectos" class="nav-link" :class="{ active: isActive('proyectos') }">Proyectos</a>
        <a href="#habilidades" class="nav-link" :class="{ active: isActive('habilidades') }">Habilidades</a>
        <a href="#certificaciones" class="nav-link" :class="{ active: isActive('certificaciones') }">Certificaciones</a>
        <a href="#servicios" class="nav-link" :class="{ active: isActive('servicios') }">Servicios</a>
        <a href="#contacto" class="nav-link" :class="{ active: isActive('contacto') }">Contacto</a>
        <button @click="toggleTheme" class="theme-toggle" aria-label="Cambiar tema">
          <IconComponent :name="isDark ? 'sun' : 'moon'" :size="20" />
        </button>
      </nav>
      
      <!-- Simplified nav for projects page -->
      <nav class="nav-desktop" v-else>
        <button @click="toggleTheme" class="theme-toggle" aria-label="Cambiar tema">
          <IconComponent :name="isDark ? 'sun' : 'moon'" :size="20" />
        </button>
      </nav>

      <!-- Mobile Menu Button -->
      <div class="mobile-menu-container">
        <button @click="toggleTheme" class="theme-toggle" aria-label="Cambiar tema">
          <IconComponent :name="isDark ? 'sun' : 'moon'" :size="20" />
        </button>
        <button @click="toggleMobileMenu" class="mobile-menu-btn" aria-label="Menú móvil">
          <IconComponent name="menu" :size="24" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="slide">
      <nav v-if="isMobileMenuOpen" class="nav-mobile">
        <div class="nav-mobile-header">
          <router-link to="/" class="logo">
            <span class="logo-text">The<span class="highlight">Danilore</span></span>
          </router-link>
          <button @click="toggleMobileMenu" class="mobile-menu-close" aria-label="Cerrar menú">
            <IconComponent name="close" :size="24" />
          </button>
        </div>
        <div class="nav-mobile-links">
          <a href="#inicio" @click="closeMobileMenu" class="nav-link">Inicio</a>
          <a href="#sobre-mi" @click="closeMobileMenu" class="nav-link">Sobre Mí</a>
          <a href="#proyectos" @click="closeMobileMenu" class="nav-link">Proyectos</a>
          <a href="#habilidades" @click="closeMobileMenu" class="nav-link">Habilidades</a>
          <a href="#certificaciones" @click="closeMobileMenu" class="nav-link">Certificaciones</a>
          <a href="#servicios" @click="closeMobileMenu" class="nav-link">Servicios</a>
          <a href="#contacto" @click="closeMobileMenu" class="nav-link">Contacto</a>
        </div>
        <div class="nav-mobile-footer">
          <div class="social-links">
            <a href="https://github.com/TheDanilore" target="_blank" rel="noopener noreferrer">
              <IconComponent name="github" :size="24" />
            </a>
            <a href="https://www.linkedin.com/in/lorenzo-daniel-arteaga-gordillo-a01929307/" target="_blank"
              rel="noopener noreferrer">
              <IconComponent name="linkedin" :size="24" />
            </a>
            <a href="mailto:arteagagordillol@gmail.com">
              <IconComponent name="email" :size="24" />
            </a>
          </div>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useRoute } from 'vue-router'
import IconComponent from '../icons/IconComponents.vue'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isDark = ref(false)
const activeSection = ref('inicio')

const { y: scrollY } = useWindowScroll()

// Check if we're on the projects page
const isProjectsPage = computed(() => route.path === '/proyectos')

const handleScroll = () => {
  isScrolled.value = scrollY.value > 50
  
  // Only detect sections on home page
  if (!isProjectsPage.value) {
    detectActiveSection()
  }
}
const detectActiveSection = () => {
  const sections = ['inicio', 'sobre-mi', 'proyectos', 'habilidades', 'certificaciones', 'servicios', 'contacto']
  const offset = 100
  
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= offset && rect.bottom >= offset) {
        activeSection.value = section
        break
      }
    }
  }
}

const isActive = (section) => {
  return activeSection.value === section
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark-theme')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark-theme')
  }
  
  window.addEventListener('scroll', handleScroll)
  
  // Initial section detection
  if (!isProjectsPage.value) {
    detectActiveSection()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
  transition: all 0.3s ease;
}

.header-scrolled {
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}



.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-color);
}

.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link.active {
  color: #667eea;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--text-color);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.2) rotate(20deg);
}

.mobile-menu-container {
  display: none;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-bar {
  width: 25px;
  height: 3px;
  background: var(--text-color);
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* Mobile Navigation */
.nav-mobile {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 400px;
  height: 100vh;
  background: var(--bg-color);
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  z-index: 1001;
}

.nav-mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.mobile-menu-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-color);
  cursor: pointer;
}

.nav-mobile-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.nav-mobile-links .nav-link {
  font-size: 1.1rem;
}

.nav-mobile-footer {
  margin-top: 3rem;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-links a {
  font-size: 1.5rem;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: var(--primary-color);
}

/* Transiciones */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  
  .mobile-menu-container {
    display: flex;
  }
}
</style>
