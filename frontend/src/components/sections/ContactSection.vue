<template>
  <section id="contacto" class="contact section-padding">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Contáctame</h2>
        <div class="section-line"></div>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <h3>¿Tienes un proyecto en mente?</h3>
          <p>
            Siempre estoy abierto a nuevas oportunidades de aprendizaje y colaboración. Si tienes un proyecto
            interesante o quieres intercambiar ideas, ¡no dudes en contactarme! 📩
          </p>

          <div class="contact-details">
            <div class="contact-item">
              <div class="contact-icon">
                <IconComponent name="email" :size="20" />
              </div>
              <div class="contact-text">
                <h4>Email</h4>
                <p><a href="mailto:arteagagordillol@gmail.com">arteagagordillol@gmail.com</a></p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <IconComponent name="github" :size="20" />
              </div>
              <div class="contact-text">
                <h4>Github</h4>
                <p><a href="https://github.com/TheDanilore" target="_blank">github.com/TheDanilore</a></p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <IconComponent name="linkedin" :size="20" />
              </div>
              <div class="contact-text">
                <h4>LinkedIn</h4>
                <p>
                  <a
                    href="https://www.linkedin.com/in/lorenzo-daniel-arteaga-gordillo-a01929307/"
                    target="_blank"
                  >
                    in/lorenzo-daniel-arteaga-gordillo
                  </a>
                </p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <IconComponent name="youtube" :size="20" />
              </div>
              <div class="contact-text">
                <h4>Youtube</h4>
                <p><a href="https://www.youtube.com/@TheDanilore" target="_blank">@TheDanilore</a></p>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-form-container">
          <form
            id="contact-form"
            class="contact-form"
            action="https://formspree.io/f/xanewpke"
            method="POST"
            @submit="handleSubmit"
          >
            <div class="form-group">
              <label for="name">Nombre</label>
              <input v-model="formData.name" type="text" id="name" name="name" required />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="formData.email" type="email" id="email" name="email" required />
            </div>

            <div class="form-group">
              <label for="subject">Asunto</label>
              <input v-model="formData.subject" type="text" id="subject" name="subject" required />
            </div>

            <div class="form-group">
              <label for="message">Mensaje</label>
              <textarea v-model="formData.message" id="message" name="message" rows="5" required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-submit" :disabled="isSubmitting">
              <span v-if="!isSubmitting" class="btn-text">Enviar Mensaje</span>
              <span v-else class="btn-text">Enviando...</span>
              <span class="btn-icon">
                <IconComponent name="send" :size="18" />
              </span>
            </button>

            <p v-if="submitMessage" :class="['submit-message', submitStatus]">{{ submitMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>

</template>
<script setup>
import { ref } from 'vue'
import IconComponent from '../icons/IconComponents.vue'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')

const handleSubmit = async (e) => {
  e.preventDefault()
  isSubmitting.value = true
  submitMessage.value = ''

  try {
    const response = await fetch('https://formspree.io/f/xanewpke', {
      method: 'POST',
      body: new FormData(e.target),
      headers: {
        Accept: 'application/json'
      }
    })

    if (response.ok) {
      submitMessage.value = '¡Mensaje enviado con éxito! Te responderé pronto.'
      submitStatus.value = 'success'
      formData.value = { name: '', email: '', subject: '', message: '' }
    } else {
      submitMessage.value = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'
      submitStatus.value = 'error'
    }
  } catch {
    submitMessage.value = 'Error de conexión. Por favor, verifica tu conexión a internet.'
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-info h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.contact-info p {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.8;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.contact-text h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.3rem;
}

.contact-text p {
  margin: 0;
}

.contact-text a {
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-text a:hover {
  color: var(--primary-color);
}

.contact-form {
  background: var(--bg-secondary);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: var(--bg-color);
  color: var(--text-color);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
}

.submit-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Responsive */
@media (max-width: 968px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
