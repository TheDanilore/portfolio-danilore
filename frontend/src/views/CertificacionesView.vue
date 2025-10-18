<template>
  <div class="certificaciones-view">
    <HeaderNav />

    <!-- Hero Section -->
    <section class="certificaciones-hero">
      <div class="container">
        <h1 class="hero-title">Certificaciones y Logros</h1>
        <p class="hero-subtitle">Reconocimientos que validan mi experiencia y conocimientos</p>
      </div>
    </section>

    <!-- Filters -->
    <div class="certificaciones-filters">
      <div class="container">
        <div class="filter-buttons">
          <button
            v-for="filter in filters"
            :key="filter.value"
            :class="['filter-btn', { active: activeFilter === filter.value }]"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Certificaciones Grid -->
    <section class="section-padding">
      <div class="container">
        <TransitionGroup name="cert-list" tag="div" class="certificaciones-grid">
          <div
            v-for="cert in filteredCertificaciones"
            :key="cert.id"
            class="cert-card"
            @click="openCertModal(cert)"
          >
            <div class="cert-image">
              <img :src="cert.image" :alt="cert.title" loading="lazy" />
              <div class="cert-overlay">
                <IconComponent name="eye" />
              </div>
            </div>
            <div class="cert-content">
              <div class="cert-category">{{ cert.categoryLabel }}</div>
              <h3 class="cert-title">{{ cert.title }}</h3>
              <p class="cert-institution">
                <IconComponent name="building" />
                {{ cert.institution }}
              </p>
              <p class="cert-date">
                <IconComponent name="calendar" />
                {{ cert.date }}
              </p>
              <p class="cert-description">{{ cert.description }}</p>
              <div class="cert-actions">
                <a
                  v-if="cert.verificationUrl"
                  :href="cert.verificationUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cert-verify-btn"
                  @click.stop
                >
                  <IconComponent name="check-circle" />
                  Verificar
                </a>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </section>

    <!-- Modal para ver certificación ampliada -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedCert" class="cert-modal" @click="closeCertModal">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeCertModal">
              <IconComponent name="x" />
            </button>
            <div class="modal-image">
              <img :src="selectedCert.image" :alt="selectedCert.title" />
            </div>
            <div class="modal-info">
              <div class="cert-category">{{ selectedCert.categoryLabel }}</div>
              <h2 class="modal-title">{{ selectedCert.title }}</h2>
              <p class="modal-institution">
                <IconComponent name="building" />
                {{ selectedCert.institution }}
              </p>
              <p class="modal-date">
                <IconComponent name="calendar" />
                {{ selectedCert.date }}
              </p>
              <p class="modal-description">{{ selectedCert.description }}</p>
              <a
                v-if="selectedCert.verificationUrl"
                :href="selectedCert.verificationUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="modal-verify-btn"
              >
                <IconComponent name="external-link" />
                Verificar Certificación
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <FooterSection />
    <BackToTop />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeaderNav from '@/components/layout/HeaderNav.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
import IconComponent from '@/components/icons/IconComponents.vue'

const activeFilter = ref('all')
const selectedCert = ref(null)

const filters = [
  { value: 'all', label: 'Todas' },
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'database', label: 'Bases de Datos' },
  { value: 'other', label: 'Otros' }
]

const certificaciones = [
  {
    id: 1,
    title: 'Laravel Advanced Developer',
    institution: 'Udemy',
    date: 'Marzo 2024',
    category: 'backend',
    categoryLabel: 'Backend',
    description: 'Certificación avanzada en desarrollo con Laravel 11, incluyendo API REST, autenticación, testing y mejores prácticas.',
    image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Laravel+Advanced',
    verificationUrl: 'https://www.udemy.com/certificate/example'
  },
  {
    id: 2,
    title: 'Vue.js 3 Complete Guide',
    institution: 'Udemy',
    date: 'Febrero 2024',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Curso completo de Vue.js 3 con Composition API, Pinia, Vue Router y mejores prácticas de desarrollo.',
    image: 'https://via.placeholder.com/400x300/42b883/ffffff?text=Vue.js+3',
    verificationUrl: 'https://www.udemy.com/certificate/example'
  },
  {
    id: 3,
    title: 'AWS Certified Solutions Architect',
    institution: 'Amazon Web Services',
    date: 'Enero 2024',
    category: 'cloud',
    categoryLabel: 'Cloud',
    description: 'Certificación profesional en diseño de arquitecturas escalables y seguras en AWS.',
    image: 'https://via.placeholder.com/400x300/FF9900/ffffff?text=AWS+Architect',
    verificationUrl: 'https://aws.amazon.com/verification/example'
  },
  {
    id: 4,
    title: 'MySQL Database Administrator',
    institution: 'Oracle',
    date: 'Diciembre 2023',
    category: 'database',
    categoryLabel: 'Bases de Datos',
    description: 'Certificación en administración avanzada de MySQL, optimización de queries y diseño de bases de datos.',
    image: 'https://via.placeholder.com/400x300/00758F/ffffff?text=MySQL+DBA',
    verificationUrl: 'https://education.oracle.com/example'
  },
  {
    id: 5,
    title: 'Docker & Kubernetes Mastery',
    institution: 'Udemy',
    date: 'Noviembre 2023',
    category: 'other',
    categoryLabel: 'DevOps',
    description: 'Dominio completo de contenedores Docker y orquestación con Kubernetes para aplicaciones en producción.',
    image: 'https://via.placeholder.com/400x300/2496ED/ffffff?text=Docker+K8s',
    verificationUrl: 'https://www.udemy.com/certificate/example'
  },
  {
    id: 6,
    title: 'Spring Boot Microservices',
    institution: 'Udemy',
    date: 'Octubre 2023',
    category: 'backend',
    categoryLabel: 'Backend',
    description: 'Desarrollo de microservicios con Spring Boot, incluyendo Spring Cloud, Eureka y comunicación entre servicios.',
    image: 'https://via.placeholder.com/400x300/6DB33F/ffffff?text=Spring+Boot',
    verificationUrl: 'https://www.udemy.com/certificate/example'
  },
  {
    id: 7,
    title: 'React Advanced Patterns',
    institution: 'Frontend Masters',
    date: 'Septiembre 2023',
    category: 'frontend',
    categoryLabel: 'Frontend',
    description: 'Patrones avanzados de React incluyendo hooks personalizados, context API, y optimización de rendimiento.',
    image: 'https://via.placeholder.com/400x300/61DAFB/000000?text=React+Advanced',
    verificationUrl: 'https://frontendmasters.com/example'
  },
  {
    id: 8,
    title: 'PostgreSQL Advanced',
    institution: 'Udemy',
    date: 'Agosto 2023',
    category: 'database',
    categoryLabel: 'Bases de Datos',
    description: 'Técnicas avanzadas de PostgreSQL incluyendo particionamiento, replicación y optimización de consultas complejas.',
    image: 'https://via.placeholder.com/400x300/336791/ffffff?text=PostgreSQL',
    verificationUrl: 'https://www.udemy.com/certificate/example'
  }
]

const filteredCertificaciones = computed(() => {
  if (activeFilter.value === 'all') {
    return certificaciones
  }
  return certificaciones.filter((cert) => cert.category === activeFilter.value)
})

const openCertModal = (cert) => {
  selectedCert.value = cert
  document.body.style.overflow = 'hidden'
}

const closeCertModal = () => {
  selectedCert.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.certificaciones-view {
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section */
.certificaciones-hero {
  color: white;
  padding: 8rem 2rem 4rem;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: var(--font-display);
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  opacity: 0.9;
}

/* Filters */
.certificaciones-filters {
  padding: 2rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 70px;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  padding: 0.6rem 1.5rem;
  border: 2px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

/* Certificaciones Grid */
.section-padding {
  padding: 4rem 2rem;
}

.certificaciones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.cert-card {
  background: var(--bg-secondary);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.cert-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.cert-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.cert-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.cert-card:hover .cert-image img {
  transform: scale(1.1);
}

.cert-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 3rem;
  color: white;
}

.cert-card:hover .cert-overlay {
  opacity: 1;
}

.cert-content {
  padding: 1.5rem;
}

.cert-category {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.cert-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.cert-institution,
.cert-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.cert-description {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.cert-actions {
  display: flex;
  gap: 1rem;
}

.cert-verify-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cert-verify-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Modal */
.cert-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  background: var(--bg-color);
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  position: relative;
  overflow: hidden;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: rotate(90deg);
}

.modal-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info {
  padding: 2rem;
}

.modal-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-family: var(--font-display);
}

.modal-institution,
.modal-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 1rem;
  margin-bottom: 0.8rem;
}

.modal-description {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.modal-verify-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.modal-verify-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

/* Transitions */
.cert-list-enter-active,
.cert-list-leave-active {
  transition: all 0.5s ease;
}

.cert-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.cert-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.cert-list-move {
  transition: transform 0.5s ease;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .certificaciones-grid {
    grid-template-columns: 1fr;
  }

  .certificaciones-hero {
    padding: 6rem 1rem 3rem;
  }

  .certificaciones-filters {
    top: 60px;
  }

  .modal-image {
    height: 250px;
  }

  .modal-info {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }
}
</style>
