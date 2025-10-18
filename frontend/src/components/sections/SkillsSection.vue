<template>
  <section id="habilidades" class="skills section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Mis Habilidades</h2>
        <div class="section-line"></div>
      </div>

      <div class="skills-content">
        <p class="skills-intro">
          Cuento con experiencia en diversas tecnologías y herramientas para el desarrollo de aplicaciones web,
          escritorio y móvil.
        </p>

        <div class="skills-grid">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="skill-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="skill-icon">
              <img :src="skill.icon" :alt="skill.name" />
            </div>
            <h3 class="skill-name">{{ skill.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  { name: 'HTML5', icon: '/assets/images/skills/html5_logo.svg' },
  { name: 'CSS3', icon: '/assets/images/skills/css-3_logo.svg' },
  { name: 'JavaScript', icon: '/assets/images/skills/javascript_logo.svg' },
  { name: 'React', icon: '/assets/images/skills/React_dark_logo.svg' },
  { name: 'Laravel', icon: '/assets/images/skills/laravel_logo.svg' },
  { name: 'Vue.js', icon: '/assets/images/skills/vue_logo.svg' },
  { name: 'Java', icon: '/assets/images/skills/java_logo.svg' },
  { name: 'Spring Boot', icon: '/assets/images/skills/spring_logo.svg' },
  { name: 'Docker', icon: '/assets/images/skills/docker_logo.svg' },
  { name: 'Bootstrap', icon: '/assets/images/skills/bootstrap_logo.svg' },
  { name: 'TailwindCSS', icon: '/assets/images/skills/tailwindcss_logo.svg' },
  { name: 'MySQL', icon: '/assets/images/skills/mysql_logo.svg' },
  { name: 'Postman', icon: '/assets/images/skills/postman_logo.svg' },
  { name: 'Salesforce', icon: '/assets/images/skills/salesforce_logo.svg' }
]
</script>

<style scoped>
.skills {
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

.skills-intro {
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-light);
  max-width: 700px;
  margin: 0 auto 3rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: var(--bg-secondary);
  padding: 2rem 1rem;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: fadeInUp 0.6s ease backwards;
}

.skill-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.skill-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-icon img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.skill-card:hover .skill-icon img {
  transform: scale(1.2) rotate(5deg);
}

.skill-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
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
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1.5rem;
  }
  
  .skill-icon {
    width: 60px;
    height: 60px;
  }
}
</style>
