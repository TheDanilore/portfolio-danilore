<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen && certificate" class="cert-modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <IconComponent name="x-exit" />
          </button>
          <div class="modal-scroll-container">
            <div class="modal-image">
              <img :src="certificate.image" :alt="certificate.title" loading="lazy" />
            </div>
            <div class="modal-info">
              <div class="cert-category">{{ certificate.categoryLabel || getCategoryLabel(certificate) }}</div>
              <h2 class="modal-title">{{ certificate.title }}</h2>
              <p class="modal-institution">
                <IconComponent name="building" />
                {{ certificate.institution }}
              </p>
              <p class="modal-date">
                <IconComponent name="calendar" />
                {{ certificate.date }}
              </p>
              <p v-if="certificate.description" class="modal-description">{{ certificate.description }}</p>
              <p v-if="certificate.credentialId" class="modal-credential">
                <IconComponent name="key" />
                <strong>ID:</strong> {{ certificate.credentialId }}
              </p>
              <div class="modal-actions">
                <a
                  v-if="certificate.pdf"
                  :href="certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="modal-pdf-btn"
                >
                  <IconComponent name="file-text" />
                  Ver PDF Completo
                </a>
                <a
                  v-if="certificate.verificationUrl"
                  :href="certificate.verificationUrl"
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
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import IconComponent from '@/components/icons/IconComponents.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  certificate: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const getCategoryLabel = (cert) => {
  // Fallback para certificados que no tienen categoryLabel
  if (cert.categoryLabel) return cert.categoryLabel
  
  const categoryMap = {
    'programming': 'Programación',
    'data-science': 'Data Science',
    'networking': 'Redes',
    'office': 'Office',
    'soft-skills': 'Habilidades Blandas',
    'backend': 'Backend',
    'frontend': 'Frontend',
    'cloud': 'Cloud',
    'database': 'Bases de Datos'
  }
  
  return categoryMap[cert.category] || 'Certificación'
}

// Controlar scroll del body
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Manejar tecla ESC
const handleEsc = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

// Agregar listener cuando el componente se monta
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleEsc)
}
</script>

<style scoped>
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
}

.modal-content {
  background: var(--bg-color);
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  position: relative;
  overflow: hidden;
  animation: modalSlideIn 0.3s ease;
  display: flex;
  flex-direction: column;
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
  background: rgba(0, 0, 0, 0.7);
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
  backdrop-filter: blur(10px);
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: rotate(90deg) scale(1.1);
}

.modal-scroll-container {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 90vh;
  scrollbar-width: thin;
  scrollbar-color: rgba(102, 126, 234, 0.5) rgba(0, 0, 0, 0.1);
}

.modal-scroll-container::-webkit-scrollbar {
  width: 8px;
}

.modal-scroll-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.modal-scroll-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

.modal-scroll-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.modal-image {
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  flex-shrink: 0;
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
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.modal-credential {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 0.95rem;
  margin-bottom: 2rem;
  padding: 0.8rem 1rem;
  background: var(--bg-secondary);
  border-radius: 10px;
  word-break: break-all;
}

.modal-credential strong {
  color: var(--text-color);
  flex-shrink: 0;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.modal-pdf-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.modal-pdf-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(240, 147, 251, 0.4);
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
  .cert-modal {
    padding: 1rem;
  }

  .modal-content {
    max-height: 95vh;
  }

  .modal-scroll-container {
    max-height: 95vh;
  }

  .modal-image {
    max-height: 250px;
  }

  .modal-info {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .modal-pdf-btn,
  .modal-verify-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
