<template>
  <section id="sobre-mi" class="about section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Sobre Mí</h2>
        <div class="section-line"></div>
      </div>
      <div class="about-content">
        <!-- Avatar 3D Interactivo -->
        <div class="about-avatar">
          <Avatar3D />
          <div class="avatar-badge">
            <span class="badge-icon">🎮</span>
            <span class="badge-text">Avatar 3D Interactivo</span>
            <span class="badge-hint">Arrastra para rotar</span>
          </div>
        </div>
        
        <div class="about-text">
          <h3>Software Developer</h3>
          <p>
            ¡Hola! Soy Lorenzo Daniel, desarrollador de Software con más de 4 años de experiencia en diseño y
            desarrollo de aplicaciones de escritorio, web y móviles. Me especializo en el desarrollo Front-End,
            Back-End, e integraciones con CRM como Salesforce y Odoo.
          </p>
          <p>
            Actualmente, curso el IX ciclo de Ingeniería de Sistemas e Informática. Mi objetivo profesional es crecer
            en el campo del desarrollo de software, contribuyendo en proyectos innovadores y desafiantes que impulsen
            la innovación tecnológica.
          </p>
          <a href="/assets/docs/CV-ARTEAGA-LORENZO.pdf" class="btn btn-primary" download>
            <i class="fas fa-download"></i> Descargar CV
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about {
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

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-image {
  position: relative;
  animation: fadeInLeft 1s ease;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.about-image img:hover {
  transform: scale(1.05);
}

.experience-badge {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  animation: float 3s ease-in-out infinite;
}

.experience-badge .number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  font-family: var(--font-display);
}

.experience-badge .text {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
}

.about-text {
  animation: fadeInRight 1s ease;
}

.about-text h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.about-text p {
  font-size: 1.1rem;
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 1.5rem;
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
  margin-top: 1rem;
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive */
@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .about-image {
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
