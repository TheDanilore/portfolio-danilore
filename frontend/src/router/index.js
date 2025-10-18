import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProyectosView from '../views/ProyectosView.vue'
import CertificacionesView from '../views/CertificacionesView.vue'
import JuegosView from '../views/JuegosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Lorenzo Arteaga - Desarrollador Full Stack',
        description: 'Portfolio de Lorenzo Arteaga, desarrollador especializado en Laravel, Vue.js, Spring Boot y desarrollo Full Stack.'
      }
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: ProyectosView,
      meta: {
        title: 'Proyectos - Lorenzo Arteaga',
        description: 'Explora mis proyectos de desarrollo web, aplicaciones móviles y sistemas empresariales.'
      }
    },
    {
      path: '/certificaciones',
      name: 'certificaciones',
      component: CertificacionesView,
      meta: {
        title: 'Certificaciones - Lorenzo Arteaga',
        description: 'Certificaciones y logros profesionales en desarrollo web, cloud computing y tecnologías modernas.'
      }
    },
    {
      path: '/juegos',
      name: 'juegos',
      component: JuegosView,
      meta: {
        title: 'Juegos Interactivos - Lorenzo Arteaga',
        description: 'Mini-juegos interactivos creados con Vue.js y Canvas. ¡Diviértete jugando!'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Lorenzo Arteaga - Desarrollador Full Stack'
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }
  
  next()
})

export default router
