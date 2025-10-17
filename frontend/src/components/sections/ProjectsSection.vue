<template>
  <section id="proyectos" class="projects section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Mis Proyectos</h2>
        <div class="section-line"></div>
      </div>

      <div class="projects-filter">
        <button
          v-for="filter in filters"
          :key="filter.value"
          :class="['filter-btn', { active: activeFilter === filter.value }]"
          @click="setFilter(filter.value)"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="projects-grid">
        <TransitionGroup name="project-list">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-card"
            :data-category="project.category"
          >
            <div class="project-img">
              <img :src="project.image" :alt="project.title" />
              <div class="project-overlay">
                <div class="project-links">
                  <a
                    v-if="project.demo"
                    :href="project.demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                    title="Ver Demo"
                  >
                    <IconComponent name="eye" :size="20" />
                  </a>
                  <a
                    v-if="project.video"
                    :href="project.video"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                    title="Ver Video"
                  >
                    <IconComponent name="youtube" :size="20" />
                  </a>
                  <a
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link"
                    title="Ver Código"
                  >
                    <IconComponent name="github" :size="20" />
                  </a>
                </div>
              </div>
            </div>
            <div class="project-content">
              <span class="project-category">{{ project.categoryLabel }}</span>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-tags">
                <span v-for="(tag, index) in project.tags" :key="index">{{ tag }}</span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <div class="text-center">
        <router-link to="/proyectos" class="btn btn-primary">Ver Todos los Proyectos</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import IconComponent from '../icons/IconComponents.vue'

const activeFilter = ref('all')

const filters = [
  { label: 'Todos', value: 'all' },
  { label: 'CRM/Backend', value: 'backend' },
  { label: 'Full-Stack', value: 'fullstack' },
  { label: 'Mobile', value: 'mobile' }
]

const projects = [
  {
    id: 1,
    title: 'Middleware Shopify ↔ HiOffice',
    description: 'Sistema de integración automática entre plataforma e-commerce Shopify y sistema ERP HiOffice usando Laravel 12, Redis para colas, MySQL 8.0 y Docker. Sincronización bidireccional de productos, inventario y órdenes en tiempo real.',
    category: 'backend',
    categoryLabel: 'CRM/Backend',
    image: '/assets/images/projects/middleware-shopify.png',
    github: '#',
    tags: ['Laravel 12', 'Redis', 'MySQL 8.0', 'Docker', 'Shopify API']
  },
  {
    id: 2,
    title: 'AsesorApp',
    description: 'Aplicación móvil multiplataforma desarrollada con Flutter y Firebase para asesoramiento académico. Gestión de estudiantes, citas, seguimiento personalizado y notificaciones push en tiempo real.',
    category: 'mobile',
    categoryLabel: 'Mobile',
    image: '/assets/images/projects/asesorapp.png',
    github: '#',
    tags: ['Flutter', 'Firebase', 'Dart', 'Push Notifications']
  },
  {
    id: 3,
    title: 'Tienda Virtual Personalizada',
    description: 'E-commerce full-stack con carrito de compras, pasarela de pagos, gestión de inventario y panel de administración. Arquitectura SPA con autenticación JWT y API RESTful.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack',
    image: '/assets/images/projects/tienda-virtual.png',
    github: '#',
    tags: ['Laravel', 'Vue.js', 'Sanctum', 'MySQL', 'Docker']
  },
  {
    id: 4,
    title: 'Sistema Consultorio Odontológico',
    description: 'Sistema de gestión integral para consultorios dentales con Spring Boot backend, interfaz Java Swing para escritorio, control de citas, historiales médicos, facturación y reportes.',
    category: 'backend',
    categoryLabel: 'CRM/Backend',
    image: '/assets/images/projects/consultorio_odontologico.png',
    video: 'https://www.youtube.com/watch?v=DfnC0RiEaDs&ab_channel=TheDanilore',
    github: 'https://github.com/TheDanilore/ConsultorioOdontologicoBackend',
    tags: ['Spring Boot', 'Java Swing', 'PostgreSQL', 'Docker']
  },
  {
    id: 5,
    title: 'Sistema Gestión de Inventario',
    description: 'Plataforma web para control de inventarios con Laravel y Blade. Gestión de productos, proveedores, entradas/salidas, reportes en PDF/Excel y sistema de alertas de stock mínimo.',
    category: 'backend',
    categoryLabel: 'CRM/Backend',
    image: '/assets/images/projects/inventario.png',
    github: '#',
    tags: ['Laravel', 'Blade', 'Sanctum', 'MySQL', 'Chart.js']
  },
  {
    id: 6,
    title: 'ETIBOT - Chatbot Inteligente',
    description: 'Chatbot asistente virtual integrado con IBM Watson Assistant y Google Gemini AI para atención al cliente 24/7. Frontend React, backend Laravel con procesamiento de lenguaje natural.',
    category: 'fullstack',
    categoryLabel: 'Full-Stack',
    image: '/assets/images/projects/chatbot_watsonx.png',
    video: 'https://www.youtube.com/watch?v=Sq_N1_yPn9I&t=1s&ab_channel=TheDanilore',
    github: 'https://github.com/TheDanilore/EtiBot',
    tags: ['Laravel', 'React', 'Watson Assistant', 'Gemini AI', 'WebSockets']
  }
]

const setFilter = (filter) => {
  activeFilter.value = filter
}

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects
  }
  return projects.filter(project => project.category === activeFilter.value)
})
</script>

<style scoped>
.projects {
  background: var(--bg-color);
}

.section-padding {
  padding: 5rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-family: var(--font-display);
}

.section-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto;
  border-radius: 2px;
}

.projects-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.filter-btn {
  padding: 0.6rem 1.5rem;
  border: 2px solid var(--border-color);
  background: transparent;
  color: var(--text-color);
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: var(--bg-secondary);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.project-img {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.project-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-img img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(102, 126, 234, 0.95);
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
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;
}

.project-link:hover {
  transform: scale(1.2) rotate(10deg);
  background: var(--accent-color);
  color: white;
}

.project-content {
  padding: 1.5rem;
}

.project-category {
  display: inline-block;
  padding: 0.3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.project-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.8rem;
}

.project-content p {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tags span {
  padding: 0.3rem 0.8rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  font-size: 0.85rem;
  color: var(--text-light);
}

.text-center {
  text-align: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
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

/* Animaciones de transición */
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.5s ease;
}

.project-list-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(30px);
}

.project-list-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-30px);
}

.project-list-move {
  transition: transform 0.5s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
