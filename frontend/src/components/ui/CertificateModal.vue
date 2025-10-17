<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <!-- Header del modal -->
        <div class="modal-header">
          <div class="modal-title">
            <h3>{{ certificate.title }}</h3>
            <p class="modal-institution">{{ certificate.institution }}</p>
          </div>
          <button @click="closeModal" class="btn-close" aria-label="Cerrar">
            <IconComponent name="close" :size="24" />
          </button>
        </div>

        <!-- Controles del visor -->
        <div class="viewer-controls">
          <button @click="toggleFullscreen" class="control-btn" title="Pantalla completa">
            <IconComponent :name="isFullscreen ? 'minimize' : 'maximize'" :size="20" />
          </button>
          <a 
            :href="certificate.file" 
            :download="getFileName(certificate)" 
            class="control-btn btn-download"
            title="Descargar certificado"
          >
            <IconComponent name="download" :size="20" />
            <span>Descargar</span>
          </a>
        </div>

        <!-- Visor del certificado -->
        <div class="viewer-container" ref="viewerContainer">
          <div class="viewer-content" :style="{ transform: `scale(${zoom})` }">
            <!-- Para PDFs -->
            <iframe 
              v-if="isPDF"
              :src="certificate.file" 
              class="certificate-viewer"
              frameborder="0"
            ></iframe>
            
            <!-- Para imágenes -->
            <img 
              v-else
              :src="certificate.file" 
              :alt="certificate.title"
              class="certificate-viewer"
            />
          </div>
        </div>

        <!-- Footer con info adicional -->
        <div class="modal-footer" v-if="certificate.date || certificate.credentialId">
          <div v-if="certificate.date" class="footer-item">
            <IconComponent name="calendar" :size="16" />
            <span>{{ certificate.date }}</span>
          </div>
          <div v-if="certificate.credentialId" class="footer-item">
            <IconComponent name="award" :size="16" />
            <span>ID: {{ certificate.credentialId }}</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import IconComponent from '../icons/IconComponents.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  certificate: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const zoom = ref(1)
const isFullscreen = ref(false)
const viewerContainer = ref(null)

const isPDF = computed(() => {
  return props.certificate.file?.toLowerCase().endsWith('.pdf')
})

const closeModal = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }
  emit('close')
}


const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await viewerContainer.value?.requestFullscreen()
    isFullscreen.value = true
  } else {
    await document.exitFullscreen()
    isFullscreen.value = false
  }
}

const getFileName = (cert) => {
  const cleanTitle = cert.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  const extension = cert.file?.split('.').pop() || 'pdf'
  return `certificado_${cleanTitle}.${extension}`
}

// Resetear zoom al cambiar de certificado
watch(() => props.certificate, () => {
  zoom.value = 1
})

// Cerrar con ESC
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEscape)
  } else {
    document.removeEventListener('keydown', handleEscape)
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }
})

const handleEscape = (e) => {
  if (e.key === 'Escape' && !document.fullscreenElement) {
    closeModal()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-container {
  background: var(--bg-color);
  border-radius: 20px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.modal-title h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 0.25rem 0;
}

.modal-institution {
  font-size: 0.95rem;
  color: var(--text-light);
  margin: 0;
}

.btn-close {
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.btn-close:hover {
  background: rgba(255, 0, 0, 0.2);
}

.viewer-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.control-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-download {
  margin-left: auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.viewer-content {
  transition: transform 0.3s ease;
  transform-origin: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.certificate-viewer {
    width: 100%;
    height: 50vh;
    /* border: none; */
    /* border-radius: 10px; */
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    background: white;
}

.modal-footer {
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
}

/* Fullscreen styles */
.viewer-container:fullscreen {
  padding: 0;
  background: #000;
}

.viewer-container:fullscreen .certificate-viewer {
  height: 100vh;
  border-radius: 0;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-height: 95vh;
  }

  .modal-header {
    padding: 1rem;
  }

  .modal-title h3 {
    font-size: 1.1rem;
  }

  .viewer-controls {
    padding: 0.75rem;
    gap: 0.5rem;
  }

  .control-btn span {
    display: none;
  }

  .control-btn {
    padding: 0.5rem;
    min-width: 40px;
    justify-content: center;
  }

  .certificate-viewer {
    height: 50vh;
  }

  .modal-footer {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
}

/* Dark theme adjustments */
:global(.dark-theme) .viewer-container {
  background: #1a1a1a;
}

:global(.dark-theme) .certificate-viewer {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}
</style>
