<template>
    <div class="certificaciones-view">
        <HeaderNav />

        <!-- Hero Section -->
        <section class="certificaciones-hero">
            <div class="container">
                <h1 class="hero-title">Certificaciones y Logros</h1>
                <p class="hero-subtitle">Reconocimientos que validan mi experiencia y conocimientos</p>
            </div>
        </section>

        <!-- Filters -->
        <div class="certificaciones-filters">
            <div class="container">
                <div class="filter-buttons">
                    <button v-for="filter in filters" :key="filter.value"
                        :class="['filter-btn', { active: activeFilter === filter.value }]"
                        @click="activeFilter = filter.value">
                        {{ filter.label }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Certificaciones Grid -->
        <section class="section-padding">
            <div class="container">
                <TransitionGroup name="cert-list" tag="div" class="certificaciones-grid">
                    <div v-for="cert in filteredCertificaciones" :key="cert.id" class="cert-card"
                        @click="openCertModal(cert)">
                        <div class="cert-image">
                            <img :src="cert.image" :alt="cert.title" loading="lazy" />
                            <div class="cert-overlay">
                                <IconComponent name="eye" />
                            </div>
                        </div>
                        <div class="cert-content">
                            <div class="cert-category">{{ cert.categoryLabel }}</div>
                            <h3 class="cert-title">{{ cert.title }}</h3>
                            <p class="cert-institution">
                                <IconComponent name="building" />
                                {{ cert.institution }}
                            </p>
                            <p class="cert-date">
                                <IconComponent name="calendar" />
                                {{ cert.date }}
                            </p>
                            <p class="cert-description">{{ cert.description }}</p>
                            <div class="cert-actions">
                                <a v-if="cert.pdf" :href="cert.pdf" target="_blank" rel="noopener noreferrer"
                                    class="cert-pdf-btn" @click.stop>
                                    <IconComponent name="file-text" />
                                    Ver PDF
                                </a>
                                <a v-if="cert.verificationUrl" :href="cert.verificationUrl" target="_blank"
                                    rel="noopener noreferrer" class="cert-verify-btn" @click.stop>
                                    <IconComponent name="check-circle" />
                                    Verificar
                                </a>
                            </div>
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </section>

        <!-- Modal para ver certificación ampliada -->
        <CertificateModal 
            :is-open="selectedCert !== null" 
            :certificate="selectedCert" 
            @close="closeCertModal" 
        />

        <FooterSection />
        <BackToTop />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeaderNav from '@/components/layout/HeaderNav.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
import IconComponent from '@/components/icons/IconComponents.vue'
import CertificateModal from '@/components/ui/CertificateModal.vue'

const activeFilter = ref('all')
const selectedCert = ref(null)

const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'programming', label: 'Programación' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'networking', label: 'Redes' },
    { value: 'office', label: 'Office' },
    { value: 'soft-skills', label: 'Habilidades Blandas' }
]

const certificaciones = [
    {
        id: 1,
        title: 'Programa ONE Tech Foundation G8 - Data Science',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'data-science',
        categoryLabel: 'Data Science',
        description: 'Programa completo de formación en Data Science, incluyendo estadística, machine learning y modelado de datos con Python.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Programa ONE Tech Foundation G8 - Data Science.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Programa ONE Tech Foundation G8 - Data Science.pdf',
        verificationUrl: 'https://app.aluracursos.com/program/certificate/1251dea1-101d-4a20-9105-3e92b5ee082b?lang',
        credentialId: '1251dea1-101d-4a20-9105-3e92b5ee082b'
    },
    {
        id: 2,
        title: 'Formación Estadísticas y Machine Learning G8 - ONE',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'data-science',
        categoryLabel: 'Data Science',
        description: 'Formación especializada en estadística aplicada y machine learning con Python.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Estadisticas y Machine Learning G8 - ONE - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Estadisticas y Machine Learning G8 - ONE - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/a21bda9a-6560-4855-8d1d-0bdf0a441f93?lang',
        credentialId: 'a21bda9a-6560-4855-8d1d-0bdf0a441f93'
    },
    {
        id: 3,
        title: 'Formación Modelado de datos con Python G8 - ONE',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'data-science',
        categoryLabel: 'Data Science',
        description: 'Formación en modelado y análisis de datos utilizando Python y sus principales librerías.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Modelado de datos con Python G8 - ONE - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Modelado de datos con Python G8 - ONE - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/a7dbfc3f-6c9d-4bb0-9f7d-d13b320be128?lang',
        credentialId: 'a7dbfc3f-6c9d-4bb0-9f7d-d13b320be128'
    },
    {
        id: 4,
        title: 'Formación Lógica de programación con JavaScript',
        institution: 'Alura Latam',
        date: 'Febrero 2025',
        category: 'programming',
        categoryLabel: 'Programación',
        description: 'Fundamentos de lógica de programación y desarrollo con JavaScript.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Lógica de programación con JavaScript - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Lógica de programación con JavaScript - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/a391da2a-605e-48d7-bc1b-1a4702432928?lang',
        credentialId: 'a391da2a-605e-48d7-bc1b-1a4702432928'
    },
    {
        id: 5,
        title: 'Formación Emprendimiento, Agilidad y Protagonismo Profesional G8',
        institution: 'Alura Latam',
        date: 'Julio 2025',
        category: 'soft-skills',
        categoryLabel: 'Habilidades Blandas',
        description: 'Formación en metodologías ágiles, emprendimiento y desarrollo profesional.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Emprendimiento, Agilidad y Protagonismo Profesional G8 - ONE  - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Emprendimiento, Agilidad y Protagonismo Profesional G8 - ONE  - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/cd1d97f6-4595-41f9-abe6-90be6656cd66?lang',
        credentialId: 'cd1d97f6-4595-41f9-abe6-90be6656cd66'
    },
    {
        id: 6,
        title: 'Formación Desarrollo Personal G8 - ONE',
        institution: 'Alura Latam',
        date: 'Febrero 2025',
        category: 'soft-skills',
        categoryLabel: 'Habilidades Blandas',
        description: 'Formación enfocada en desarrollo personal y profesional.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación - Desarrollo Personal G8 - ONE - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación - Desarrollo Personal G8 - ONE - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/2a169164-a73b-420d-93a6-98e8db90fb62?lang',
        credentialId: '2a169164-a73b-420d-93a6-98e8db90fb62'
    },
    {
        id: 7,
        title: 'Programación Avanzada',
        institution: 'Universidad Militar Nueva Granada',
        date: 'Diciembre 2024',
        category: 'programming',
        categoryLabel: 'Programación',
        description: 'Certificación en técnicas avanzadas de programación y desarrollo de software.',
        image: '/assets/docs/certificates/UMNG/Certificacion-UMNG.jpg',
        pdf: '/assets/docs/certificates/UMNG/Certificacion-UMNG.pdf'
    },
    {
        id: 8,
        title: 'Comercio Electrónico',
        institution: 'Universidad Militar Nueva Granada',
        date: 'Diciembre 2024',
        category: 'programming',
        categoryLabel: 'Programación',
        description: 'Certificación en desarrollo de soluciones de comercio electrónico.',
        image: '/assets/docs/certificates/UMNG/Certificacion-UMNG.jpg',
        pdf: '/assets/docs/certificates/UMNG/Certificacion-UMNG.pdf'
    },
    {
        id: 9,
        title: 'Desarrollo Front-End',
        institution: 'Ministerio de Trabajo y Promoción del Empleo (MTPE)',
        date: 'Diciembre 2024',
        category: 'programming',
        categoryLabel: 'Programación',
        description: 'Certificación en desarrollo Front-End con HTML, CSS, JavaScript y frameworks modernos.',
        image: '/assets/docs/certificates/MTPE/Certificado_Desarrollo_Web_Front-end.jpg',
        pdf: '/assets/docs/certificates/MTPE/Certificado_Desarrollo_Web_Front-end.pdf',
        verificationUrl: 'https://capacitate.trabajo.gob.pe/mod/customcert/verify_certificate.php?contextid=259504&code=9fgxz6BqPy&qrcode=1',
        credentialId: 'XDmImeMw3E'
    },
    {
        id: 10,
        title: 'Desarrollo Back-End',
        institution: 'Ministerio de Trabajo y Promoción del Empleo (MTPE)',
        date: 'Diciembre 2024',
        category: 'programming',
        categoryLabel: 'Programación',
        description: 'Certificación en desarrollo Back-End con bases de datos, APIs y arquitectura de servidores.',
        image: '/assets/docs/certificates/MTPE/Certificado_Desarrollo_Back-End.jpg',
        pdf: '/assets/docs/certificates/MTPE/Certificado_Desarrollo_Back-End.pdf',
        verificationUrl: 'https://capacitate.trabajo.gob.pe/mod/customcert/verify_certificate.php?contextid=284555&code=XDmImeMw3E&qrcode=1',
        credentialId: '9fgxz6BqPy'
    },
    {
        id: 11,
        title: 'CCNA: Introduction to Networks',
        institution: 'CISCO',
        date: 'Enero 2024',
        category: 'networking',
        categoryLabel: 'Redes',
        description: 'Certificación en fundamentos de redes, protocolos TCP/IP y configuración de routers y switches.',
        image: '/assets/docs/certificates/CISCO/CCNAITNUpdated20251003-31-1ztn2j.png',
        pdf: '/assets/docs/certificates/CISCO/CCNAITNUpdated20251003-31-1ztn2j.pdf',
        verificationUrl: 'https://www.credly.com/badges/36ebba3b-f898-4324-85ac-d18380303b58',
        credentialId: '36ebba3b-f898-4324-85ac-d18380303b58'
    },
    {
        id: 12,
        title: 'Curso Profesional de JAVA',
        institution: 'Código Facilito',
        date: 'Noviembre 2024',
        category: 'programming',
        categoryLabel: 'Programación',
        description: 'Curso profesional de Java incluyendo POO, colecciones, streams y desarrollo enterprise.',
        image: '/assets/docs/certificates/codigo-facilito/Certificado - Curso Profesional de JAVA.jpg',
        pdf: '/assets/docs/certificates/codigo-facilito/Certificado - Curso Profesional de JAVA.pdf',
        verificationUrl: 'https://codigofacilito.com/certificates/d0600f1d-cf2d-41e7-945a-507c732bb2b6',
        credentialId: 'd0600f1d-cf2d-41e7-945a-507c732bb2b6'
    },
    {
        id: 13,
        title: 'Excel Avanzado',
        institution: 'Fundación Telefónica',
        date: 'Diciembre 2023',
        category: 'office',
        categoryLabel: 'Office',
        description: 'Certificación en Excel avanzado incluyendo fórmulas complejas, tablas dinámicas y macros.',
        image: '/assets/docs/certificates/fundacion-telefonica/FT PE - Certificado - Excel Avanzado.jpg',
        pdf: '/assets/docs/certificates/fundacion-telefonica/FT PE - Certificado - Excel Avanzado.pdf',
        credentialId: '57e77aba-4b78-4c68-9075-8aeb3651c9b1'
    },
    {
        id: 14,
        title: 'Office Avanzado',
        institution: 'Fundación Telefónica',
        date: 'Diciembre 2023',
        category: 'office',
        categoryLabel: 'Office',
        description: 'Certificación en suite Office avanzado incluyendo Word, Excel, PowerPoint y herramientas de productividad.',
        image: '/assets/docs/certificates/fundacion-telefonica/FT PE - Certificado - Office Intermedio.jpg',
        pdf: '/assets/docs/certificates/fundacion-telefonica/FT PE - Certificado - Office Intermedio.pdf',
        credentialId: '0a2fd4a1-321c-4f8b-8e70-fa6917f90ac7'
    },
    {
        id: 15,
        title: 'Asistente de docencia en Algorítmica y Física',
        institution: 'Universidad Tecnológica del Perú',
        date: 'Agosto 2024',
        category: 'soft-skills',
        categoryLabel: 'Habilidades Blandas',
        description: 'Certificación como asistente de docencia en cursos de algorítmica y física.',
        image: '/assets/docs/certificates/UTP/Asistente de docencia en Algorítmica.jpg',
        pdf: '/assets/docs/certificates/UTP/Asistente de docencia en Algorítmica.pdf',
        credentialId: 'SIST003-0496-2024'
    },
    {
        id: 16,
        title: 'Excel Intermedio',
        institution: 'Universidad Tecnológica del Perú',
        date: 'Agosto 2024',
        category: 'office',
        categoryLabel: 'Office',
        description: 'Asesor certificado en Excel nivel intermedio.',
        image: '/assets/docs/certificates/UTP/Asesor en Excel Intermedio.jpg',
        pdf: '/assets/docs/certificates/UTP/Asesor en Excel Intermedio.pdf',
        credentialId: 'SIST004-0799-2024'
    },
    {
        id: 17,
        title: 'Inglés A2 (MCER)',
        institution: 'Universidad Tecnológica del Perú',
        date: 'Agosto 2024',
        category: 'soft-skills',
        categoryLabel: 'Habilidades Blandas',
        description: 'Certificación de nivel A2 de inglés según el Marco Común Europeo de Referencia.',
        image: '/assets/docs/certificates/UTP/Certificado Inglés A2 MCER.jpg',
        pdf: '/assets/docs/certificates/UTP/Certificado Inglés A2 MCER.pdf',
        credentialId: 'SIST007-0729-2024'
    }
]

const filteredCertificaciones = computed(() => {
    if (activeFilter.value === 'all') {
        return certificaciones
    }
    return certificaciones.filter((cert) => cert.category === activeFilter.value)
})

const openCertModal = (cert) => {
    selectedCert.value = cert
    document.body.style.overflow = 'hidden'
}

const closeCertModal = () => {
    selectedCert.value = null
    document.body.style.overflow = ''
}
</script>

<style scoped>
.certificaciones-view {
    width: 100%;
    overflow-x: hidden;
}

/* Hero Section */
.certificaciones-hero {
    color: var(--text-color);
    padding: 8rem 2rem 4rem;
    text-align: center;
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1rem;
    font-family: var(--font-display);
}

.hero-subtitle {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    opacity: 0.9;
}

/* Filters */
.certificaciones-filters {
    padding: 2rem;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 70px;
    z-index: 100;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.filter-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
}

.filter-btn {
    padding: 0.6rem 1.5rem;
    border: 2px solid var(--border-color);
    background: var(--bg-color);
    color: var(--text-color);
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.filter-btn:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
}

.filter-btn.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: transparent;
}

/* Certificaciones Grid */
.section-padding {
    padding: 4rem 2rem;
}

.certificaciones-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
}

.cert-card {
    background: var(--bg-secondary);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
}

.cert-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.cert-image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.cert-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.cert-card:hover .cert-image img {
    transform: scale(1.1);
}

.cert-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    font-size: 3rem;
    color: white;
}

.cert-card:hover .cert-overlay {
    opacity: 1;
}

.cert-content {
    padding: 1.5rem;
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

.cert-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 0.8rem;
    line-height: 1.3;
}

.cert-institution,
.cert-date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-light);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.cert-description {
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.95rem;
}

.cert-actions {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
}

.cert-pdf-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.cert-pdf-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
}

.cert-verify-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.cert-verify-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Transitions */
.cert-list-enter-active,
.cert-list-leave-active {
    transition: all 0.5s ease;
}

.cert-list-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.cert-list-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.cert-list-move {
    transition: transform 0.5s ease;
}

/* Responsive */
@media (max-width: 768px) {
    .certificaciones-grid {
        grid-template-columns: 1fr;
    }

    .certificaciones-hero {
        padding: 6rem 1rem 3rem;
    }

    .certificaciones-filters {
        top: 60px;
    }

    .modal-image {
        height: 250px;
    }

    .modal-info {
        padding: 1.5rem;
    }

    .modal-title {
        font-size: 1.5rem;
    }
}
</style>
