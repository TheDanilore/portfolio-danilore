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
            <div class="text-center">
                <router-link to="/certificaciones" class="btn btn-primary">Ver Todas las Certificaciones</router-link>
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
        id: 1,
        title: 'Programa ONE Tech Foundation G8 - Data Science',
        institution: 'Alura Latam',
        icon: 'code',
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
        icon: 'code',
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
        icon: 'database',
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
        icon: 'code',
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
        icon: 'book-open',
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
        icon: 'book-open',
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
        icon: 'code',
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
        icon: 'shopping-cart',
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
        icon: 'code',
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
        icon: 'server',
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
        icon: 'wifi',
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
        icon: 'coffee',
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
        icon: 'file-text',
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
        icon: 'file-text',
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
        icon: 'book-open',
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
        icon: 'file-text',
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
        icon: 'globe',
        date: 'Agosto 2024',
        category: 'soft-skills',
        categoryLabel: 'Habilidades Blandas',
        description: 'Certificación de nivel A2 de inglés según el Marco Común Europeo de Referencia.',
        image: '/assets/docs/certificates/UTP/Certificado Inglés A2 MCER.jpg',
        pdf: '/assets/docs/certificates/UTP/Certificado Inglés A2 MCER.pdf',
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
.text-center {
    text-align: center;
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
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

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
    margin-bottom: 3rem;
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
