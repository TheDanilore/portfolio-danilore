<template>
  <section id="servicios" class="services section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Mis Servicios</h2>
        <div class="section-line"></div>
      </div>

      <div class="services-grid">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="service-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="service-icon">
            <IconComponent :name="service.icon" :size="32" />
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import IconComponent from '../icons/IconComponents.vue'

const services = [
  {
    icon: 'code',
    title: 'Desarrollo Web',
    description: 'Creación de sitios web modernos, responsivos y optimizados para SEO utilizando las últimas tecnologías.'
  },
  {
    icon: 'smartphone',
    title: 'Diseño Responsivo',
    description: 'Diseño de interfaces que se adaptan perfectamente a todos los dispositivos y tamaños de pantalla.'
  },
  {
    icon: 'server',
    title: 'Integración CRM',
    description: 'Desarrollo e integración de soluciones personalizadas para Salesforce, Odoo y otros sistemas CRM.'
  },
  {
    icon: 'database',
    title: 'Desarrollo Backend',
    description: 'Creación de APIs robustas, bases de datos optimizadas y lógica de negocio eficiente para aplicaciones web.'
  }
]
</script>

<style scoped>
.services {
  background: var(--bg-secondary);
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.service-card {
  background: var(--bg-color);
  padding: 3rem 2rem;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease backwards;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.service-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(10deg);
}

.service-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.service-card p {
  color: var(--text-light);
  line-height: 1.8;
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
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
