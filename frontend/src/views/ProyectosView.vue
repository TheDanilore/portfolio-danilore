<template>
  <div class="proyectos-view">
    <HeaderNav />

    <!-- Hero Section -->
    <section class="proyectos-hero">
      <div class="container">
        <h1 class="hero-title">Mis Proyectos</h1>
        <p class="hero-subtitle">Explora mi portafolio de desarrollo de software</p>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="proyectos-filters">
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
    </section>

    <!-- Projects Grid -->
    <section class="proyectos-grid section-padding">
      <div class="container">
        <TransitionGroup name="project-list" tag="div" class="projects-container">
          <div v-for="project in filteredProjects" :key="project.id" class="project-card">
            <div class="project-image">
              <img :src="project.image" :alt="project.title" />
              <div class="project-overlay">
                <div class="project-links">
                  <a
                    v-if="project.demo"
                    :href="project.demo"
                    target="_blank"
                    class="project-link"
                    title="Ver Demo"
                  >
                    <IconComponent name="eye" :size="20" />
                  </a>
                  <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    class="project-link"
                    title="Ver Código"
                  >
                    <IconComponent name="github" :size="20" />
                  </a>
                  <a
                    v-if="project.video"
                    :href="project.video"
                    target="_blank"
                    class="project-link"
                    title="Ver Video"
                  >
                    <IconComponent name="youtube" :size="20" />
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <div class="project-category">{{ project.category }}</div>
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </section>

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

const filters = [
  { value: 'all', label: 'Todos' },
  { value: 'backend', label: 'CRM/Backend' },
  { value: 'fullstack', label: 'Full-Stack' },
  { value: 'mobile', label: 'Mobile' }
]

const projects = [
  {
    id: 1,
    title: 'Middleware Shopify ↔ HiOffice',
    category: 'CRM/Backend',
    type: 'backend',
    description: 'Sistema de integración automática entre plataforma e-commerce Shopify y sistema ERP HiOffice usando Laravel 12, Redis para colas, MySQL 8.0 y Docker. Sincronización bidireccional de productos, inventario y órdenes en tiempo real.',
    image: '/assets/images/projects/middleware-shopify.png',
    technologies: ['Laravel 12', 'Redis', 'MySQL 8.0', 'Docker', 'Shopify API'],
    github: '#',
    demo: null,
    video: null
  },
  {
    id: 2,
    title: 'AsesorApp',
    category: 'Mobile',
    type: 'mobile',
    description: 'Aplicación móvil multiplataforma desarrollada con Flutter y Firebase para asesoramiento académico. Gestión de estudiantes, citas, seguimiento personalizado y notificaciones push en tiempo real.',
    image: '/assets/images/projects/asesorapp.png',
    technologies: ['Flutter', 'Firebase', 'Dart', 'Push Notifications'],
    github: '#',
    demo: null,
    video: null
  },
  {
    id: 3,
    title: 'Tienda Virtual Personalizada',
    category: 'Full-Stack',
    type: 'fullstack',
    description: 'E-commerce full-stack con carrito de compras, pasarela de pagos, gestión de inventario y panel de administración. Arquitectura SPA con autenticación JWT y API RESTful.',
    image: '/assets/images/projects/tienda-virtual.png',
    technologies: ['Laravel', 'Vue.js', 'Sanctum', 'MySQL', 'Docker'],
    github: '#',
    demo: null,
    video: null
  },
  {
    id: 4,
    title: 'Sistema Consultorio Odontológico',
    category: 'CRM/Backend',
    type: 'backend',
    description: 'Sistema de gestión integral para consultorios dentales con Spring Boot backend, interfaz Java Swing para escritorio, control de citas, historiales médicos, facturación y reportes.',
    image: '/assets/images/projects/consultorio_odontologico.png',
    technologies: ['Spring Boot', 'Java Swing', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/TheDanilore/ConsultorioOdontologicoBackend',
    demo: null,
    video: 'https://www.youtube.com/watch?v=DfnC0RiEaDs&ab_channel=TheDanilore'
  },
  {
    id: 5,
    title: 'Sistema Gestión de Inventario',
    category: 'CRM/Backend',
    type: 'backend',
    description: 'Plataforma web para control de inventarios con Laravel y Blade. Gestión de productos, proveedores, entradas/salidas, reportes en PDF/Excel y sistema de alertas de stock mínimo.',
    image: '/assets/images/projects/inventario.png',
    technologies: ['Laravel', 'Blade', 'Sanctum', 'MySQL', 'Chart.js'],
    github: '#',
    demo: null,
    video: null
  },
  {
    id: 6,
    title: 'ETIBOT - Chatbot Inteligente',
    category: 'Full-Stack',
    type: 'fullstack',
    description: 'Chatbot asistente virtual integrado con IBM Watson Assistant y Google Gemini AI para atención al cliente 24/7. Frontend React, backend Laravel con procesamiento de lenguaje natural.',
    image: '/assets/images/projects/chatbot_watsonx.png',
    technologies: ['Laravel', 'React', 'Watson Assistant', 'Gemini AI', 'WebSockets'],
    github: 'https://github.com/TheDanilore/EtiBot',
    demo: null,
    video: 'https://www.youtube.com/watch?v=Sq_N1_yPn9I&t=1s&ab_channel=TheDanilore'
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects
  }
  return projects.filter((project) => project.type === activeFilter.value)
})
</script>

<style scoped>
.proyectos-view {
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section */
.proyectos-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
.proyectos-filters {
  padding: 2rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 70px;
  z-index: 100;
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

/* Projects Grid */
.section-padding {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--bg-secondary);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.project-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  width: 50px;
  height: 50px;
  background: white;
  color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.project-link:hover {
  transform: scale(1.2) rotate(10deg);
}

.project-content {
  padding: 1.5rem;
}

.project-category {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.project-description {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.3rem 0.8rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  font-size: 0.8rem;
  color: var(--text-light);
}

/* Transitions */
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.5s ease;
}

.project-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.project-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.project-list-move {
  transition: transform 0.5s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .projects-container {
    grid-template-columns: 1fr;
  }

  .proyectos-hero {
    padding: 6rem 1rem 3rem;
  }

  .proyectos-filters {
    top: 60px;
  }
}
</style>
