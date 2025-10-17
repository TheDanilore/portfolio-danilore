<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-info">
          <p class="footer-brand">The<span class="highlight">Danilore</span></p>
          <p class="footer-description">Software & CRM Developer especializado en Full-Stack</p>
        </div>
        
        <div class="footer-social">
          <a href="https://github.com/TheDanilore" target="_blank" rel="noopener noreferrer" class="social-link">
            <IconComponent name="github" :size="20" />
          </a>
          <a href="https://www.linkedin.com/in/lorenzo-daniel-arteaga-gordillo-a01929307/" target="_blank" rel="noopener noreferrer" class="social-link">
            <IconComponent name="linkedin" :size="20" />
          </a>
          <a href="mailto:arteagagordillol@gmail.com" class="social-link">
            <IconComponent name="email" :size="20" />
          </a>
          <a href="https://www.youtube.com/@TheDanilore" target="_blank" rel="noopener noreferrer" class="social-link">
            <IconComponent name="youtube" :size="20" />
          </a>
        </div>

        <p class="footer-copy">&copy; {{ currentYear }} TheDanilore. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import IconComponent from '../icons/IconComponents.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 3rem 2rem 2rem;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  text-align: center;
}

.footer-info {
  margin-bottom: 2rem;
}

.footer-brand {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.highlight {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

.footer-social {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.social-link {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.footer-copy {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
