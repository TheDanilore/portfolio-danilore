<template>
    <section id="certificaciones" class="certifications section-padding">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Certificaciones y Logros</h2>
                <div class="section-line"></div>
            </div>

            <div class="certifications-grid">
                <div v-for="(cert, index) in certifications" :key="index" class="cert-card"
                    :style="{ animationDelay: `${index * 0.1}s` }" @click="openCertificate(cert)">
                    <div class="cert-icon">
                        <IconComponent :name="cert.icon" :size="28" />
                    </div>
                    <div class="cert-content">
                        <h4 class="cert-title">{{ cert.title }}</h4>
                        <p class="cert-institution">{{ cert.institution }}</p>
                    </div>
                    <div class="cert-badge">
                        <IconComponent name="eye" :size="20" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Certificado -->
        <CertificateModal :isOpen="isModalOpen" :certificate="selectedCertificate" @close="closeModal" />
    </section>
</template>

<script setup>
import { ref } from 'vue'
import IconComponent from '../icons/IconComponents.vue'
import CertificateModal from '../ui/CertificateModal.vue'

const isModalOpen = ref(false)
const selectedCertificate = ref({})

const certifications = [
    {
        title: 'Programa ONE Tech Foundation G8 - Data Science',
        institution: 'Alura Latam',
        icon: 'code',
        file: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Programa ONE Tech Foundation G8 - Data Science.pdf',
        date: 'Agosto 2025',
        credentialId: '1251dea1-101d-4a20-9105-3e92b5ee082b'
    },
    {
        title: 'Formación Estadísticas y Machine Learning G8 - ONE',
        institution: 'Alura Latam',
        icon: 'code',
        file: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Estadisticas y Machine Learning G8 - ONE - Alura.pdf',
        date: 'Agosto 2025',
        credentialId: 'a21bda9a-6560-4855-8d1d-0bdf0a441f93'
    },
    {
        title: 'Formación Modelado de datos con Python G8 - ONE',
        institution: 'Alura Latam',
        icon: 'database',
        file: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Modelado de datos con Python G8 - ONE - Alura.pdf',
        date: 'Agosto 2025',
        credentialId: 'a7dbfc3f-6c9d-4bb0-9f7d-d13b320be128'
    },
    {
        title: 'Formación Lógica de programación con JavaScript',
        institution: 'Alura Latam',
        icon: 'code',
        file: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Lógica de programación con JavaScript - Alura.pdf',
        date: 'Febrero 2025',
        credentialId: 'a391da2a-605e-48d7-bc1b-1a4702432928'
    },
    {
        title: 'Formación Emprendimiento, Agilidad y Protagonismo Profesional G8',
        institution: 'Alura Latam',
        icon: 'book-open',
        file: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Emprendimiento, Agilidad y Protagonismo Profesional G8 - ONE  - Alura.pdf',
        date: 'Julio 2025',
        credentialId: 'cd1d97f6-4595-41f9-abe6-90be6656cd66'
    },
    {
        title: 'Formación Desarrollo Personal G8 - ONE',
        institution: 'Alura Latam',
        icon: 'book-open',
        file: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación - Desarrollo Personal G8 - ONE - Alura.pdf',
        date: 'Febrero 2025',
        credentialId: '2a169164-a73b-420d-93a6-98e8db90fb62'
    },
    {
        title: 'Programación Avanzada',
        institution: 'Universidad Militar Nueva Granada',
        icon: 'code',
        file: '/assets/docs/certificates/UMNG/Certificacion-UMNG.pdf',
        date: 'Diciembre 2024'
    },
    {
        title: 'Comercio Electrónico',
        institution: 'Universidad Militar Nueva Granada',
        icon: 'shopping-cart',
        file: '/assets/docs/certificates/UMNG/Certificacion-UMNG.pdf',
        date: 'Diciembre 2024'
    },
    {
        title: 'Desarrollo Front-End',
        institution: 'Ministerio de Trabajo y Promoción del Empleo (MTPE)',
        icon: 'code',
        file: '/assets/docs/certificates/MTPE/Certificado_Desarrollo_Web_Front-end.pdf',
        date: 'Diciembre 2024',
        credentialId: 'XDmImeMw3E'
    },
    {
        title: 'Desarrollo Back-End',
        institution: 'Ministerio de Trabajo y Promoción del Empleo (MTPE)',
        icon: 'server',
        file: '/assets/docs/certificates/MTPE/Certificado_Desarrollo_Back-End.pdf',
        date: 'Diciembre 2024',
        credentialId: '9fgxz6BqPy'
    },
    {
        title: 'CCNA: Introduction to Networks',
        institution: 'CISCO',
        icon: 'wifi',
        file: '/assets/docs/certificates/CISCO/CCNAITNUpdated20251003-31-1ztn2j.pdf',
        date: 'Enero 2024',
        credentialId: '36ebba3b-f898-4324-85ac-d18380303b58'
    },
    {
        title: 'Curso Profesional de JAVA',
        institution: 'Código Facilito',
        icon: 'coffee',
        file: '/assets/docs/certificates/codigo-facilito/Certificado - Curso Profesional de JAVA.pdf',
        date: 'Noviembre 2024',
        credentialId: 'd0600f1d-cf2d-41e7-945a-507c732bb2b6'
    },
    {
        title: 'Excel Avanzado',
        institution: 'Fundación Telefónica',
        icon: 'file-text',
        file: '/assets/docs/certificates/fundacion-telefonica/FT PE - Certificado - Excel Avanzado.pdf',
        date: 'Diciembre 2023',
        credentialId: '57e77aba-4b78-4c68-9075-8aeb3651c9b1'
    },
    {
        title: 'Office Avanzado',
        institution: 'Fundación Telefónica',
        icon: 'file-text',
        file: '/assets/docs/certificates/fundacion-telefonica/FT PE - Certificado - Office Intermedio.pdf',
        date: 'Diciembre 2023',
        credentialId: '0a2fd4a1-321c-4f8b-8e70-fa6917f90ac7'
    },
    {
        title: 'Asistente de docencia en Algorítmica y Física',
        institution: 'Universidad Tecnológica del Perú',
        icon: 'book-open',
        file: '/assets/docs/certificates/UTP/Asistente de docencia en Algorítmica.pdf',
        date: 'Agosto 2024',
        credentialId: 'SIST003-0496-2024'
    },
    {
        title: 'Excel Intermedio',
        institution: 'Universidad Tecnológica del Perú',
        icon: 'file-text',
        file: '/assets/docs/certificates/UTP/Asesor en Excel Intermedio.pdf',
        date: 'Agosto 2024',
        credentialId: ' SIST004-0799-2024'
    },
    {
        title: 'Inglés A2 (MCER)',
        institution: 'Universidad Tecnológica del Perú',
        icon: 'globe',
        file: '/assets/docs/certificates/UTP/Certificado Inglés A2 MCER.pdf',
        date: 'Agosto 2024',
        credentialId: 'SIST007-0729-2024'
    }
]

const openCertificate = (cert) => {
    selectedCertificate.value = cert
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}
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
    cursor: pointer;
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
    color: #667eea;
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
