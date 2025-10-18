<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'
import CatNavigator from './components/CatNavigator.vue'

const showSplash = ref(true)

const handleSplashComplete = () => {
  showSplash.value = false
}

// Si el usuario ya visitó, no mostrar splash
onMounted(() => {
  const visited = sessionStorage.getItem('portfolio-visited')
  if (visited) {
    showSplash.value = false
  }
})
</script>

<template>
  <div id="app">
    <!-- Contenido principal del portfolio (siempre renderizado) -->
    <div class="main-content" :class="{ 'content-visible': !showSplash }">
      <RouterView />
      <CatNavigator v-if="!showSplash" />
    </div>

    <!-- Splash Screen con animación de inicio (encima del contenido) -->
    <SplashScreen v-if="showSplash" @animation-complete="handleSplashComplete" />
  </div>
</template>

<style>
/* Reset y estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colores principales */
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  --text-color: #1f2937;
  --text-light: #6b7280;
  --bg-color: #ffffff;
  --bg-secondary: #f9fafb;
  --border-color: #e5e7eb;

  /* Fuentes */
  --font-primary: 'Poppins', sans-serif;
  --font-display: 'Montserrat', sans-serif;
}

/* Dark Theme */
.dark-theme {
  --text-color: #f9fafb;
  --text-light: #d1d5db;
  --bg-color: #111827;
  --bg-secondary: #1f2937;
  --border-color: #374151;
}

/* Dark theme header when scrolled */
.dark-theme .header {
  background: transparent;
}

.dark-theme .header.header-scrolled {
  background: rgba(17, 24, 39, 0.95) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.dark-theme .mobile-menu-btn {
  color: white;
}

body {
  font-family: var(--font-primary);
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.6;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
}

/* Contenido principal */
.main-content {
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.main-content.content-visible {
  pointer-events: auto;
}

/* Transición fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
