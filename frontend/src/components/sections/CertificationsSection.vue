<template>
  <section id="certificaciones" class="certifications section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Certificaciones y Logros</h2>
        <div class="section-line"></div>
      </div>

      <div class="certifications-grid">
        <div
          v-for="(cert, index) in certifications"
          :key="index"
          class="cert-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="cert-icon">
            <IconComponent :name="cert.icon" :size="28" />
          </div>
          <div class="cert-content">
            <h4 class="cert-title">{{ cert.title }}</h4>
            <p class="cert-institution">{{ cert.institution }}</p>
          </div>
          <div class="cert-badge">
            <IconComponent name="check-circle" :size="20" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import IconComponent from '../icons/IconComponents.vue'

const certifications = [
  {
    title: 'ONE Tech Foundation G8 - Data Science',
    institution: 'Alura Latam',
    icon: 'code'
  },
  {
    title: 'Estadísticas y Machine Learning G8 - ONE',
    institution: 'Alura Latam',
    icon: 'trending-up'
  },
  {
    title: 'Modelado de datos con Python G8 - ONE',
    institution: 'Alura Latam',
    icon: 'database'
  },
  {
    title: 'Lógica de programación con JavaScript',
    institution: 'Alura Latam',
    icon: 'code'
  },
  {
    title: 'Emprendimiento, Agilidad y Protagonismo Profesional G8',
    institution: 'Alura Latam',
    icon: 'trending-up'
  },
  {
    title: 'Desarrollo Personal G8 - ONE',
    institution: 'Alura Latam',
    icon: 'user'
  },
  {
    title: 'Programación Avanzada',
    institution: 'Universidad Militar Nueva Granada',
    icon: 'code'
  },
  {
    title: 'Comercio Electrónico',
    institution: 'Universidad Militar Nueva Granada',
    icon: 'shopping-cart'
  },
  {
    title: 'Desarrollo Front-End',
    institution: 'MTPE',
    icon: 'monitor'
  },
  {
    title: 'Desarrollo Back-End',
    institution: 'MTPE',
    icon: 'server'
  },
  {
    title: 'CCNA: Introduction to Networks',
    institution: 'CISCO',
    icon: 'wifi'
  },
  {
    title: 'Curso Profesional de JAVA',
    institution: 'Código Facilito',
    icon: 'coffee'
  },
  {
    title: 'Excel Avanzado y Office Avanzado',
    institution: 'Fundación Telefónica',
    icon: 'file-text'
  },
  {
    title: 'Asistente de docencia en Algorítmica y Física',
    institution: 'UTP',
    icon: 'book-open'
  },
  {
    title: 'Inglés A2 (MCER)',
    institution: 'UTP',
    icon: 'globe'
  }
]
</script>

<style scoped>
.certifications {
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

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.cert-card {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  animation: fadeInUp 0.6s ease backwards;
  position: relative;
  overflow: hidden;
}

.cert-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.cert-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

.cert-card:hover::before {
  transform: scaleY(1);
}

.cert-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.cert-card:hover .cert-icon {
  transform: scale(1.1) rotate(5deg);
}

.cert-content {
  flex: 1;
}

.cert-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.3rem;
  line-height: 1.4;
}

.cert-institution {
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0;
}

.cert-badge {
  color: #4ade80;
  flex-shrink: 0;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
}

.cert-card:hover .cert-badge {
  opacity: 1;
  transform: scale(1);
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
  .certifications-grid {
    grid-template-columns: 1fr;
  }
  
  .cert-card {
    padding: 1.25rem;
  }
  
  .cert-icon {
    width: 45px;
    height: 45px;
  }
  
  .cert-title {
    font-size: 0.95rem;
  }
}
</style>
