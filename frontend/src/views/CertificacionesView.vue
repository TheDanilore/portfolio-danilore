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
                <!-- Filtros por categoría -->
                <div class="filter-buttons">
                    <button v-for="filter in filters" :key="filter.value"
                        :class="['filter-btn', { active: activeFilter === filter.value }]"
                        @click="activeFilter = filter.value">
                        {{ filter.label }}
                    </button>
                </div>

                <!-- Controles adicionales -->
                <div class="filter-controls">
                    <!-- Filtro por tipo -->
                    <div class="type-filter">
                        <label>Tipo:</label>
                        <select v-model="typeFilter" class="filter-select">
                            <option value="all">Todos</option>
                            <option value="formation">Formaciones</option>
                            <option value="course">Cursos</option>
                        </select>
                    </div>

                    <!-- Ordenar por fecha -->
                    <div class="sort-filter">
                        <label>Ordenar:</label>
                        <select v-model="sortOrder" class="filter-select">
                            <option value="newest">Más recientes</option>
                            <option value="oldest">Más antiguos</option>
                        </select>
                    </div>
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
        <CertificateModal :is-open="selectedCert !== null" :certificate="selectedCert" @close="closeCertModal" />

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
const typeFilter = ref('all') // 'all', 'formation', 'course'
const sortOrder = ref('newest') // 'newest', 'oldest'
const selectedCert = ref(null)

const filters = [
    { value: 'all', label: 'Todas' },
    { value: 'programming', label: 'Programación' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'python', label: 'Python' },
    { value: 'pandas', label: 'Pandas' },
    { value: 'linux', label: 'Linux' },
    { value: 'ciencia-de-datos', label: 'Ciencia de datos' },
    { value: 'analisis-de-datos', label: 'Análisis de datos' },
    { value: 'etl', label: 'ETL' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'data-visualization', label: 'Data Visualization' },
    { value: 'artificial-intelligence', label: 'Artificial Intelligence' },
    { value: 'database-modeling', label: 'Database Modeling' },
    { value: 'regression', label: 'Regression' },
    { value: 'entrepreneurship', label: 'Entrepreneurship' },
    { value: 'professional-development', label: 'Professional Development' },
    { value: 'agile', label: 'Agile' },
    { value: 'career-development', label: 'Career Development' },
    { value: 'networking', label: 'Redes' },
    { value: 'soft-skills', label: 'Habilidades Blandas' },
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'programming-logic', label: 'Lógica de Programación' },
    { value: 'html-css', label: 'HTML & CSS' },
    { value: 'personal-development', label: 'Desarrollo Personal' },
    { value: 'git', label: 'Git & GitHub' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'learning', label: 'Técnicas de Aprendizaje' },
    { value: 'time-management', label: 'Gestión del Tiempo' },
    { value: 'technical-support', label: 'Soporte Técnico' },
    { value: 'english', label: 'Inglés' },
    { value: 'physics', label: 'Física' },
    { value: 'office', label: 'Office' }
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
        credentialId: '1251dea1-101d-4a20-9105-3e92b5ee082b',
        type: 'formation'
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
        credentialId: 'a21bda9a-6560-4855-8d1d-0bdf0a441f93',
        type: 'formation'
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
        credentialId: 'a7dbfc3f-6c9d-4bb0-9f7d-d13b320be128',
        type: 'formation'
    },
    {
        id: 4,
        title: 'Formación Lógica de programación con JavaScript',
        institution: 'Alura Latam',
        date: 'Febrero 2025',
        category: 'programming',
        categoryLabel: 'Programación',
        description: 'Certificación al completar la formación de Lógica de Programación con JavaScript. Durante esta formación, profundicé en conceptos clave a través de tres cursos:\n✅ Lógica de programación: sumérgete en la programación con JavaScript\n✅ Lógica de programación: explorar funciones y listas\n✅ Git y GitHub: repositorio, commit y versiones',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Lógica de programación con JavaScript - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Lógica de programación con JavaScript - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/a391da2a-605e-48d7-bc1b-1a4702432928?lang',
        credentialId: 'a391da2a-605e-48d7-bc1b-1a4702432928',
        type: 'formation'
    },
    {
        id: 5,
        title: 'Formación Emprendimiento, Agilidad y Protagonismo Profesional G8 - ONE',
        institution: 'Alura Latam',
        date: 'Julio 2025',
        category: 'soft-skills',
        categoryLabel: 'Habilidades Blandas',
        description: 'Formación en Emprendimiento, Agilidad y Protagonismo Profesional G8 – ONE, como parte del programa Oracle Next Education (ONE) - G8, una alianza entre Oracle y Alura Latam. Durante esta formación intensiva, completé 5 cursos clave con una duración total de 33 horas.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Emprendimiento, Agilidad y Protagonismo Profesional G8 - ONE  - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Emprendimiento, Agilidad y Protagonismo Profesional G8 - ONE  - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/cd1d97f6-4595-41f9-abe6-90be6656cd66?lang',
        credentialId: 'cd1d97f6-4595-41f9-abe6-90be6656cd66',
        type: 'formation'
    },
    {
        id: 6,
        title: 'Formación Desarrollo Personal G8 - ONE',
        institution: 'Alura Latam',
        date: 'Febrero 2025',
        category: 'soft-skills',
        categoryLabel: 'Habilidades Blandas',
        description: 'Certificación al completar la ruta de Desarrollo Personal G8 - ONE, como parte del programa Oracle Next Education (ONE) - G8, una alianza entre Oracle y Alura Latam. Esta ruta incluyó cuatro cursos enfocados en Soft Skills, fundamentales para el crecimiento profesional y personal.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación - Desarrollo Personal G8 - ONE - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación - Desarrollo Personal G8 - ONE - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/2a169164-a73b-420d-93a6-98e8db90fb62?lang',
        credentialId: '2a169164-a73b-420d-93a6-98e8db90fb62',
        type: 'formation'
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
    },
    {
        id: 18,
        title: 'Linux: conociendo y utilizando la terminal',
        institution: 'Alura Latam',
        date: 'Octubre 2025',
        category: 'linux',
        categoryLabel: 'Linux',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Linux: conociendo y utilizando la terminal"! Durante las clases, repase los conceptos que tenía sobre el sistema de directorios de Linux, trabajar con la línea de comando y utilizar archivos comprimidos. Esta experiencia ha sido fundamental para mi evolución en el mundo de la programación y la administración de sistemas.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Linux_ conociendo y utilizando la terminal - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Linux_ conociendo y utilizando la terminal - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/29606051-9c9f-4479-82db-ac7d57ab6858?lang',
        credentialId: '29606051-9c9f-4479-82db-ac7d57ab6858'
    },
    {
        id: 19,
        title: 'Challenge Telecom X: análisis de evasión de clientes',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'ciencia-de-datos',
        categoryLabel: 'Ciencia de datos',
        description: 'Challenge práctico de análisis de datos para identificar patrones de evasión de clientes en el sector de telecomunicaciones.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Challenge Telecom X_ análisis de evasión de clientes - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Challenge Telecom X_ análisis de evasión de clientes - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/e1bff881-8799-49f8-beb2-388b2f89548a?lang',
        credentialId: 'e1bff881-8799-49f8-beb2-388b2f89548a'
    },
    {
        id: 20,
        title: 'Challenge Telecom X: análisis de evasión de clientes - Parte 2',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'analisis-de-datos',
        categoryLabel: 'Análisis de datos',
        description: 'Segunda parte del challenge de análisis avanzado de datos para predicción de evasión de clientes.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Challenge Telecom X_ análisis de evasión de clientes - Parte 2 - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Challenge Telecom X_ análisis de evasión de clientes - Parte 2 - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/73c7a48e-9ecd-40d8-bc3d-424b9ccbb545?lang',
        credentialId: '73c7a48e-9ecd-40d8-bc3d-424b9ccbb545'
    },
    {
        id: 21,
        title: 'Clasificación: aprendiendo a clasificar datos con Machine Learning',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'python',
        categoryLabel: 'Python',
        description: 'Curso de Machine Learning enfocado en algoritmos de clasificación y su implementación con Python.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Clasificación_ aprendiendo a clasificar datos con Machine Learning - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Clasificación_ aprendiendo a clasificar datos con Machine Learning - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/0af71b94-a5a3-4db6-9c23-68fbaf398ae5?lang',
        credentialId: '0af71b94-a5a3-4db6-9c23-68fbaf398ae5'
    },
    {
        id: 22,
        title: 'Clasificación: validación de modelos y métricas de evaluación',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'python',
        categoryLabel: 'Python',
        description: 'Curso avanzado sobre validación de modelos de clasificación y métricas de evaluación en Machine Learning.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Clasificación_ validación de modelos y métricas de evaluación - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Clasificación_ validación de modelos y métricas de evaluación - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/9e115efa-47b9-4df3-b002-dab956ee718e?lang',
        credentialId: '9e115efa-47b9-4df3-b002-dab956ee718e'
    },
    {
        id: 23,
        title: 'Data Science: probando relaciones con regresión lineal',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'python',
        categoryLabel: 'Python',
        description: 'Curso de Data Science enfocado en análisis de relaciones entre variables mediante regresión lineal.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Data Science_ probando relaciones con regresión lineal - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Data Science_ probando relaciones con regresión lineal - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/42b0ff1b-4497-41f2-9d17-451a2ce79761?lang',
        credentialId: '42b0ff1b-4497-41f2-9d17-451a2ce79761'
    },
    {
        id: 24,
        title: 'Estadística con Python: Probabilidad y muestreo',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'python',
        categoryLabel: 'Python',
        description: 'Curso de estadística aplicada con Python, enfocado en teoría de probabilidades y técnicas de muestreo.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Estadística con Python_ Probabilidad y muestreo - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Estadística con Python_ Probabilidad y muestreo - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/1af7b0d1-dba6-4c0a-92dd-a5146a44b048?lang',
        credentialId: '1af7b0d1-dba6-4c0a-92dd-a5146a44b048'
    },
    {
        id: 25,
        title: 'Estadística con Python: frecuencias y medidas',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'python',
        categoryLabel: 'Python',
        description: 'Curso de estadística con Python enfocado en análisis de frecuencias y medidas estadísticas descriptivas.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Estadística con Python_ frecuencias y medidas - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Estadística con Python_ frecuencias y medidas - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/82a2973a-3b1a-43bd-9ee8-11bcd182a539?lang',
        credentialId: '82a2973a-3b1a-43bd-9ee8-11bcd182a539'
    },
    {
        id: 26,
        title: 'Formación Aprendiendo a hacer ETL G8 - ONE',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'etl',
        categoryLabel: 'ETL',
        description: 'Formación completa en procesos ETL (Extract, Transform, Load) para ciencia de datos.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Aprendiendo a hacer ETL G8 - ONE - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación Aprendiendo a hacer ETL G8 - ONE - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/1242b67c-942f-43a1-b96f-2a7085d2bebf?lang',
        credentialId: '1242b67c-942f-43a1-b96f-2a7085d2bebf',
        type: 'formation'
    },
    {
        id: 29,
        title: 'IA aplicada a la ciencia de datos: uso de la IA en la construcción de visualización de datos',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'data-visualization',
        categoryLabel: 'Data Visualization',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "IA aplicada a la ciencia de datos: uso de la IA en la construcción de visualización de datos"! 🎉 Durante este viaje, aprendí a utilizar ChatGPT como asistente personal para el análisis y visualización de datos, optimizando mi tiempo en la creación de visualizaciones personalizadas.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso IA aplicada a la ciencia de datos_ uso de la IA en la construcción de visualización de datos - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso IA aplicada a la ciencia de datos_ uso de la IA en la construcción de visualización de datos - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/1fbd3e35-7419-457f-8ee0-728ce917d0cf?lang',
        credentialId: '1fbd3e35-7419-457f-8ee0-728ce917d0cf'
    },
    {
        id: 30,
        title: 'IA aumentada: previsión de atrasos de vuelos',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'artificial-intelligence',
        categoryLabel: 'Artificial Intelligence',
        description: 'Curso de inteligencia artificial aplicada a la predicción de retrasos en vuelos usando machine learning.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso IA aumentada_ previsión de atrasos de vuelos - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso IA aumentada_ previsión de atrasos de vuelos - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/0f6f2864-a277-4263-8cda-878caf38978b?lang',
        credentialId: '0f6f2864-a277-4263-8cda-878caf38978b'
    },
    {
        id: 31,
        title: 'Modelado de bases de datos relacionales: modelado lógico y físico',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'database-modeling',
        categoryLabel: 'Database Modeling',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de Modelado de bases de datos relacionales: modelado lógico y físico! 🎉 Durante este viaje, aprendí a diferenciar los tipos de modelado de bases de datos, conocí los modelados lógico y físico, y me ejercité en el uso de SQL Power Architect.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Modelado de bases de datos relacionales_ modelado lógico y físico - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Modelado de bases de datos relacionales_ modelado lógico y físico - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/14ca7ff4-fe54-4f39-bc28-4c668ed6902d?lang',
        credentialId: '14ca7ff4-fe54-4f39-bc28-4c668ed6902d'
    },
    {
        id: 32,
        title: 'Modelado de bases de datos: entidades, relaciones y atributos',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'database-modeling',
        categoryLabel: 'Database Modeling',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de Modelado de bases de datos: entidades, relaciones y atributos! 🎉 Durante este viaje, aprendí a identificar el modelo conceptual de una base de datos, a diferenciar entre modelos de alto y bajo nivel, y a aplicar técnicas de modelaje de datos. También comprendí las diferencias entre el Modelo Entidad-Relación (MER) y el Diagrama Entidad-Relación (DER).',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Modelado de bases de datos_ entidades, relaciones y atributos - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Modelado de bases de datos_ entidades, relaciones y atributos - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/805ec2c5-8d65-4326-8744-807d5e19debe?lang',
        credentialId: '805ec2c5-8d65-4326-8744-807d5e19debe'
    },
    {
        id: 33,
        title: 'NumPy: análisis numérico eficiente con Python',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'python',
        categoryLabel: 'Python',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de NumPy: análisis numérico eficiente con Python! 🎉 Durante este viaje, aprendí a leer y escribir datos usando Numpy, crear y manipular matrices multidimensionales, y generar números aleatorios. También descubrí cómo utilizar Seeds para trabajar con la aleatoriedad y calcular la regresión lineal.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso NumPy_ análisis numérico eficiente con Python - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso NumPy_ análisis numérico eficiente con Python - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/293beee5-2c26-4473-92f3-94947aaa97c9?lang',
        credentialId: '293beee5-2c26-4473-92f3-94947aaa97c9'
    },
    {
        id: 34,
        title: 'Pandas E/S: trabajando con diferentes formatos de archivo',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'pandas',
        categoryLabel: 'Pandas',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de Pandas E/S: trabajando con diferentes formatos de archivo! 🎉 Durante las clases, aprendí sobre los archivos CSV, XLSX, JSON, HTML y XML, así como a trabajar con diferentes tipos de datos de entrada y salida. También descubrí cómo leer datos de Google Sheets, obtener tablas de páginas web, crear y escribir en una base de datos local, y realizar consultas SQL.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Pandas E_S_ trabajando con diferentes formatos de archivo - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Pandas E_S_ trabajando con diferentes formatos de archivo - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/e4162e0a-679d-41ec-b022-17b36e7701df?lang',
        credentialId: 'e4162e0a-679d-41ec-b022-17b36e7701df'
    },
    {
        id: 35,
        title: 'Pandas: conociendo la biblioteca',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'pandas',
        categoryLabel: 'Pandas',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Pandas: conociendo la biblioteca"! 🎉 Durante este viaje, aprendí a utilizar los principales recursos de Pandas para desarrollar proyectos, realizar análisis exploratorios y construir diferentes gráficas. También me familiaricé con la selección de datos específicos, el tratamiento de datos nulos, y la eliminación de filas y columnas.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Pandas_ conociendo la biblioteca - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Pandas_ conociendo la biblioteca - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/05219ba8-b189-4c19-94ab-88a3f7f5ae32?lang',
        credentialId: '05219ba8-b189-4c19-94ab-88a3f7f5ae32'
    },
    {
        id: 36,
        title: 'Pandas: transformación y manipulación de datos',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'pandas',
        categoryLabel: 'Pandas',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de Pandas: transformación y manipulación de datos! 🎉 Durante las clases, aprendí a comprender y aplicar comandos de transformación de datos, diferenciar los tipos de información en los datos, manipular valores numéricos en DataFrames, y distinguir métodos para manipular datos textuales.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Pandas_ transformación y manipulación de datos - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Pandas_ transformación y manipulación de datos - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/3e3ad571-cdd2-4503-8161-35c5812056d9?lang',
        credentialId: '3e3ad571-cdd2-4503-8161-35c5812056d9'
    },
    {
        id: 37,
        title: 'Practicando Python para Data Science: Challenge Alura Store',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'python',
        categoryLabel: 'Python',
        description: 'Challenge práctico de Data Science aplicando Python en un proyecto de análisis de datos para Alura Store.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Practicando Python para Data Science_ Challenge Alura Store - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Practicando Python para Data Science_ Challenge Alura Store - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/919bd7f6-598b-43d2-9dd1-4cf43ea0ecb1?lang',
        credentialId: '919bd7f6-598b-43d2-9dd1-4cf43ea0ecb1'
    },
    {
        id: 38,
        title: 'Python para Data Science: primeros pasos',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'python',
        categoryLabel: 'Python',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Python para Data Science: primeros pasos"! 🎉 Durante este viaje, aprendí los comandos básicos del lenguaje Python, diferencié los tipos de variables, y manipulé tipos básicos de datos. También descubrí cómo funcionan las estructuras condicionales y construí diferentes estructuras de repetición.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Python para Data Science_ primeros pasos - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Python para Data Science_ primeros pasos - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/c56d9989-3c4c-4ebe-a60c-4be021225dc0?lang',
        credentialId: 'c56d9989-3c4c-4ebe-a60c-4be021225dc0'
    },
    {
        id: 39,
        title: 'Python para Data Science: trabajar con funciones, estructuras de datos y excepciones',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'python',
        categoryLabel: 'Python',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Python para Data Science"! 🎉 Durante este viaje, aprendí sobre las funciones de las bibliotecas y paquetes en Python, así como a crear mis propias funciones personalizadas. También me familiaricé con estructuras de datos compuestas y anidadas, y descubrí cómo construir listas y diccionarios utilizando list y dict comprehension.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Python para Data Science_ trabajar con funciones, estructuras de datos y excepciones - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Python para Data Science_ trabajar con funciones, estructuras de datos y excepciones - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/1835a33b-662d-4cca-abed-91566d6ac73a?lang',
        credentialId: '1835a33b-662d-4cca-abed-91566d6ac73a'
    },
    {
        id: 40,
        title: 'Regresión Lineal: Técnicas Avanzadas de Modelado',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'regression',
        categoryLabel: 'Regression',
        description: 'Curso avanzado de técnicas de regresión lineal para modelado predictivo de datos.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Regresión Lineal_ Técnicas Avanzadas de Modelado - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Regresión Lineal_ Técnicas Avanzadas de Modelado - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/e59986e1-c1ad-441a-aa8a-b27d8ebaa60a?lang',
        credentialId: 'e59986e1-c1ad-441a-aa8a-b27d8ebaa60a'
    },
    {
        id: 41,
        title: 'Visualización de datos: creando gráficos con bibliotecas de Python',
        institution: 'Alura Latam',
        date: 'Agosto 2025',
        category: 'data-visualization',
        categoryLabel: 'Data Visualization',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de Visualización de datos: creando gráficos con bibliotecas de Python! 🎉 Durante las clases, aprendí a crear gráficos con la biblioteca Matplotlib, entendí el funcionamiento de figuras y ejes, y también exploré la biblioteca Seaborn para la creación de gráficos. Además, tuve la oportunidad de crear gráficos interactivos con Plotly y personalizar mis visualizaciones con colores, estilos y anotaciones.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Visualización de datos_ creando gráficos con bibliotecas de Python - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Visualización de datos_ creando gráficos con bibliotecas de Python - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/0193059c-2c10-40f5-87fa-cd0a07fa5d11?lang',
        credentialId: '0193059c-2c10-40f5-87fa-cd0a07fa5d11'
    },
    {
        id: 42,
        title: 'Emprendimiento: De la idea al plan de negocios',
        institution: 'Alura Latam',
        date: 'Julio 2025',
        category: 'entrepreneurship',
        categoryLabel: 'Entrepreneurship',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Emprendimiento: De la idea al plan de negocios"! Durante este viaje, aprendí sobre lo que significa emprender, desarrollé una mentalidad emprendedora y descubrí cómo es posible emprender incluso siendo empleado.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Emprendimiento_ De la idea al plan de negocios - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Emprendimiento_ De la idea al plan de negocios - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/6aef0b5f-b8d9-429e-8fa1-00e353106570?lang',
        credentialId: '6aef0b5f-b8d9-429e-8fa1-00e353106570'
    },
    {
        id: 43,
        title: 'Fundamentos de Agilidad: Primeros pasos para la transformación ágil',
        institution: 'Alura Latam',
        date: 'Julio 2025',
        category: 'agile',
        categoryLabel: 'Agile',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Fundamentos de Agilidad: Primeros pasos para la transformación ágil"! 🎉 Durante este viaje, aprendí sobre el surgimiento del Método Ágil, las diferencias clave entre el Método Ágil y el Waterfall, y la importancia de la priorización de tareas y flujos. También entendí por qué el feedback debe ser lo más rápido posible y conocí el Manifesto Ágil.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Fundamentos de Agilidad_ Primeros pasos para la transformación ágil - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Fundamentos de Agilidad_ Primeros pasos para la transformación ágil - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/af2af6a6-2c50-4335-8744-f5e607d20cd3?lang',
        credentialId: 'af2af6a6-2c50-4335-8744-f5e607d20cd3'
    },
    {
        id: 44,
        title: 'Transición de carrera: una guía al campo de tecnología',
        institution: 'Alura Latam',
        date: 'Julio 2025',
        category: 'career-development',
        categoryLabel: 'Career Development',
        description: 'Este curso me ha ayudado a capacitarme en la forma moderna de pensar aplicada a trabajos en tecnología, a acceder a reclutadores y entrevistadores, y a entender las mejores prácticas para entrevistas en el mercado tecnológico.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Transición de carrera_ una guía al campo de tecnología - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Transición de carrera_ una guía al campo de tecnología - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/1ab83fb0-3ee8-47aa-8087-169ef5b2ee3b?lang',
        credentialId: '1ab83fb0-3ee8-47aa-8087-169ef5b2ee3b'
    },
    {
        id: 45,
        title: 'Propósito profesional: ser el protagonista de tu carrera',
        institution: 'Alura Latam',
        date: 'Mayo 2025',
        category: 'professional-development',
        categoryLabel: 'Professional Development',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Propósito profesional: ser el protagonista de tu carrera"! 🎉 Durante este viaje, aprendí a conocer mi razón de ser y cómo el ikigai puede ayudarme a alinear mis talentos, vocación y carrera. También descubrí técnicas para escribir mi propósito y comprendí la importancia de tener claridad en mis motivaciones y valores.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Propósito profesional_ ser el protagonista de tu carrera - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Propósito profesional_ ser el protagonista de tu carrera - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/2b7466f6-dcaa-4cc6-868a-fc6fddcdc222?lang',
        credentialId: '2b7466f6-dcaa-4cc6-868a-fc6fddcdc222',
        type: 'course'
    },
    {
        id: 46,
        title: 'Desarrollo de carrera: demanda del mercado',
        institution: 'Alura Latam',
        date: 'Abril 2025',
        category: 'career-development',
        categoryLabel: 'Career Development',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Desarrollo de carrera: demanda del mercado"! 🎉 Durante las clases, aprendí sobre las principales estrategias para encaminar mi carrera, cómo mis valores y motivaciones influyen en mi trayectoria profesional, y las habilidades que el mercado realmente busca. También comprendí la importancia de la motivación en nuestra vida profesional y personal. Esta experiencia ha sido fundamental para mi evolución como estudiante y profesional.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Desarrollo de carrera_ demanda del mercado - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Desarrollo de carrera_ demanda del mercado - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/b238e3fd-a671-4482-8bcd-ca155b405f8b?lang',
        credentialId: 'b238e3fd-a671-4482-8bcd-ca155b405f8b',
        type: 'course'
    },
    {
        id: 48,
        title: 'ChatGPT: optimizando la calidad de los resultados',
        institution: 'Alura Latam',
        date: 'Marzo 2025',
        category: 'chatgpt',
        categoryLabel: 'ChatGPT',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "ChatGPT: optimizando la calidad de los resultados"! 🎉 En este curso, aprendí a crear prompts utilizando diferentes estrategias, a aplicar buenas prácticas para obtener resultados más confiables y a maximizar los resultados obtenidos. También descubrí cómo crear prompts para diversas aplicaciones y trabajar con textos largos en ChatGPT, además de conocer OpenAI Playground.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso ChatGPT_ optimizando la calidad de los resultados - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso ChatGPT_ optimizando la calidad de los resultados - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/e162185a-1179-4402-8714-2921248a08e0?lang',
        credentialId: 'e162185a-1179-4402-8714-2921248a08e0',
        type: 'course'
    },
    {
        id: 49,
        title: 'Formación Principiante en Programación G8 - ONE',
        institution: 'Alura Latam',
        date: 'Marzo 2025',
        category: 'programming-logic',
        categoryLabel: 'Programming Logic',
        description: 'Me complace compartir que he obtenido mi certificación al completar la formación de Principiante en Programación G8 - ONE, como parte del programa Oracle Next Education (ONE) - G8, una alianza entre Oracle y Alura Latam. Esta ruta incluyó 9 cursos enfocados en Desarrollo Web, fundamentales para mi crecimiento profesional como desarrollador.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación - Principiante en Programación G8 - ONE - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Formación - Principiante en Programación G8 - ONE - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/degree/certificate/305e8c24-8cc3-46aa-a453-1689317fd424?lang',
        credentialId: '305e8c24-8cc3-46aa-a453-1689317fd424',
        type: 'formation'
    },
    {
        id: 50,
        title: 'HTML y CSS: Clases, Posicionamiento y Flexbox',
        institution: 'Alura Latam',
        date: 'Marzo 2025',
        category: 'html-css',
        categoryLabel: 'HTML & CSS',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de HTML y CSS: Clases, Posicionamiento y Flexbox! 🎉 Durante las clases, recorde la importancia de las clases CSS, cómo utilizar Flexbox para posicionar elementos de manera práctica, y a estilizar textos, fuentes e íconos. Lo mismo con posicionar elementos en una página y a aplicar efectos de estilización, como cambiar colores y redondeos.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso HTML y CSS_ Clases, Posicionamiento y Flexbox - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso HTML y CSS_ Clases, Posicionamiento y Flexbox - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/2f5aa568-7da3-4cc2-bc43-160dd3fd0c72?lang',
        credentialId: '2f5aa568-7da3-4cc2-bc43-160dd3fd0c72',
        type: 'course'
    },
    {
        id: 51,
        title: 'HTML y CSS: ambientes de desarrollo, estructura de archivos y tags',
        institution: 'Alura Latam',
        date: 'Marzo 2025',
        category: 'html-css',
        categoryLabel: 'HTML & CSS',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de **HTML y CSS: ambientes de desarrollo, estructura de archivos y tags**! 🎉 Durante las clases pulí mis habilidades, y cree un proyecto desde cero con HTML y CSS. También practiqué la importancia del HTML semántico y las buenas prácticas de desarrollo.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso HTML y CSS_ ambientes de desarrollo, estructura de archivos y tags - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso HTML y CSS_ ambientes de desarrollo, estructura de archivos y tags - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/255cde93-85ff-490a-87a0-dd82e8d4a56b?lang',
        credentialId: '255cde93-85ff-490a-87a0-dd82e8d4a56b',
        type: 'course'
    },
    {
        id: 52,
        title: 'HTML y CSS: header, footer y variables CSS',
        institution: 'Alura Latam',
        date: 'Marzo 2025',
        category: 'html-css',
        categoryLabel: 'HTML & CSS',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de HTML y CSS: header, footer y variables CSS! 🎉',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso HTML y CSS_ header, footer y variables CSS - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso HTML y CSS_ header, footer y variables CSS - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/938b2649-f394-4b90-8216-f085bc7a3cf5?lang',
        credentialId: '938b2649-f394-4b90-8216-f085bc7a3cf5',
        type: 'course'
    },
    {
        id: 53,
        title: 'HTML y CSS: trabajando con responsividad y publicación de proyectos',
        institution: 'Alura Latam',
        date: 'Marzo 2025',
        category: 'html-css',
        categoryLabel: 'HTML & CSS',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de **HTML y CSS: trabajando con responsividad y publicación de proyectos**! 🎉 Durante este viaje, entendí la diferencia entre medidas absolutas y relativas, y finalmente, publiqué mi proyecto finalizado en la web para que todos lo vean. Esta experiencia ha sido clave para mi evolución como estudiante y desarrollador.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso HTML y CSS_ trabajando con responsividad y publicación de proyectos - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso HTML y CSS_ trabajando con responsividad y publicación de proyectos - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/e2482110-1ce3-4d5a-923c-a128d083acca?lang',
        credentialId: 'e2482110-1ce3-4d5a-923c-a128d083acca',
        type: 'course'
    },
    {
        id: 54,
        title: 'Practicando Lógica de Programación: Challenge Amigo secreto',
        institution: 'Alura Latam',
        date: 'Marzo 2025',
        category: 'programming-logic',
        categoryLabel: 'Programming Logic',
        description: 'Me complace compartir que he completado el curso "Practicando Lógica de Programación: Challenge Amigo Secreto" de Alura Latam y Oracle. 🎉 Durante este desafío, puse a prueba mis habilidades en JavaScript, lógica de programación y manipulación del DOM, implementando un sistema de sorteo de "Amigo Secreto" con una experiencia interactiva y dinámica.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Practicando Lógica de Programación_ Challenge Amigo secreto - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Practicando Lógica de Programación_ Challenge Amigo secreto - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/1a2842d2-f3f3-46de-8b87-1ee6862bf48c?lang',
        credentialId: '1a2842d2-f3f3-46de-8b87-1ee6862bf48c',
        type: 'course'
    },
    {
        id: 55,
        title: 'Foco: Enfocarse trae más resultados para el día a día',
        institution: 'Alura Latam',
        date: 'Febrero 2025',
        category: 'personal-development',
        categoryLabel: 'Personal Development',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Foco: Enfocarse trae más resultados para el día a día"! 🎉 Durante las clases, aprendí a conocer herramientas para promover mi enfoque, identificar los principales villanos que perjudican mi concentración, y cómo evitar distracciones. También ejercité mi motivación y descubrí cómo utilizar el poder del hábito a favor de mi foco. Esta experiencia ha sido clave para mi evolución en los estudios y en mi vida diaria. ¡Vamos por más! 💪',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Foco_ Enfocarse trae más resultados para el día a día - Alura.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Foco_ Enfocarse trae más resultados para el día a día - Alura.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/c9a68414-f4e7-4253-8afa-2b699d065515?lang',
        credentialId: 'c9a68414-f4e7-4253-8afa-2b699d065515',
        type: 'course'
    },
    {
        id: 58,
        title: 'Git y GitHub: repositorio, commit y versiones',
        institution: 'Alura Latam',
        date: 'Febrero 2025',
        category: 'git',
        categoryLabel: 'Git & GitHub',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de Git y GitHub: repositorio, commit y versiones! 🎉 Durante las clases, recorde las diferencias entre Git y GitHub, los comandos que utilizo a diario, cómo controlar las versiones de mis proyectos, crear estrategias de ramificaciones y navegar en el tiempo con el comando git log.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Git y GitHub_ repositorio, commit y versiones - Alura Latam.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Git y GitHub_ repositorio, commit y versiones - Alura Latam.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/fece96b8-a011-401b-a7a8-594d03f7de18?lang',
        credentialId: 'fece96b8-a011-401b-a7a8-594d03f7de18',
        type: 'course'
    },
    {
        id: 59,
        title: 'Hábitos: Ser productivo para cumplir sus metas personales',
        institution: 'Alura Latam',
        date: 'Febrero 2025',
        category: 'personal-development',
        categoryLabel: 'Personal Development',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Hábitos: Ser productivo para cumplir sus metas personales"! 🎉 Durante las clases, aprendí a crear metas que se adaptan a mis objetivos, entendí el Loop del Hábito y cómo usarlo para formar nuevos hábitos. También descubrí cómo establecer metas más efectivas con el método S.M.A.R.T. y la importancia de los hábitos-clave en mi vida. Además, conocí la metodología GTD (Getting Things Done).',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Hábitos_ Ser productivo para cumplir sus metas personales - Alura Latam.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Hábitos_ Ser productivo para cumplir sus metas personales - Alura Latam.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/9f35d910-b643-4b00-baad-1743da4ad084?lang',
        credentialId: '9f35d910-b643-4b00-baad-1743da4ad084',
        type: 'course'
    },
    {
        id: 60,
        title: 'LinkedIn: Como hacer que tu perfil trabaje por ti',
        institution: 'Alura Latam',
        date: 'Febrero 2025',
        category: 'linkedin',
        categoryLabel: 'LinkedIn',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "LinkedIn: Cómo hacer que tu perfil trabaje por ti"! 🎉 Durante las lecciones, descubrí las mejores prácticas para destacar mi perfil, aprendí a hacerlo más atractivo y conocí los recursos clave de LinkedIn que puedo utilizar a favor de mi carrera.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso LinkedIn_ Como hacer que tu perfil trabaje por ti - Alura Latam.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso LinkedIn_ Como hacer que tu perfil trabaje por ti - Alura Latam.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/f6daa082-b429-45af-b3cd-c2f72ccc46dd?lang',
        credentialId: 'f6daa082-b429-45af-b3cd-c2f72ccc46dd',
        type: 'course'
    },
    {
        id: 61,
        title: 'Lógica de programación: explorar funciones y listas',
        institution: 'Alura Latam',
        date: 'Febrero 2025',
        category: 'programming-logic',
        categoryLabel: 'Programming Logic',
        description: '¡Estoy muy emocionado de compartir que he completado el curso de Lógica de programación: explorar funciones y listas! 🎉 Durante este viaje, pude pulir mis habilidades en JavaScript para manipular elementos en la pantalla, además de mejorar mi lógica de programación inspirándome en un proyecto real. También descubrí cómo usar Github para publicar mis proyectos.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Lógica de programación_ explorar funciones y listas - Alura Latam.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Lógica de programación_ explorar funciones y listas - Alura Latam.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/355eb3b3-86eb-4e5c-878b-da57c3caa8ac?lang',
        credentialId: '355eb3b3-86eb-4e5c-878b-da57c3caa8ac',
        type: 'course'
    },
    {
        id: 62,
        title: 'Aprender a aprender: tecnicas para tu autodesarrollo',
        institution: 'Alura Latam',
        date: 'Enero 2025',
        category: 'learning',
        categoryLabel: 'Learning Techniques',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Aprender a aprender: técnicas para tu autodesarrollo"! 🎉 Durante este viaje, descubrí mi propósito y mis razones para aprender, conocí mi estilo de aprendizaje y aprendí a crear planes efectivos. También exploré diferentes metodologías y experiencias que me han permitido aprender de manera más efectiva. #ONE #ALURALATAM #ORACLE',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Aprender a aprender_ tecnicas para tu autodesarrollo - Alura Latam.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Aprender a aprender_ tecnicas para tu autodesarrollo - Alura Latam.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/245fe35d-d2d7-466b-8554-62737ecf8fb2?lang',
        credentialId: '245fe35d-d2d7-466b-8554-62737ecf8fb2',
        type: 'course'
    },
    {
        id: 63,
        title: 'Lógica de programación: sumérgete en la programación con JavaScript',
        institution: 'Alura Latam',
        date: 'Enero 2025',
        category: 'programming-logic',
        categoryLabel: 'Programming Logic',
        description: '¡Estoy muy emocionado de compartir que he completado el curso "Lógica de programación: sumérgete en la programación con JavaScript"! 🎉 Durante este viaje, pulí mis habilidades en JavaScript. Además, desarrollé una aplicación de principio a fin, inspirada en el mundo real, y aprendí a adaptar soluciones proporcionadas por el lenguaje en mis programas.',
        image: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Lógica de programación_ sumérgete en la programación con JavaScript - Alura Latam.jpg',
        pdf: '/assets/docs/certificates/alura/Lorenzo Daniel Arteaga Gordillo - Curso Lógica de programación_ sumérgete en la programación con JavaScript - Alura Latam.pdf',
        verificationUrl: 'https://app.aluracursos.com/certificate/4af745ae-4613-40bf-93d7-9b192715b06b?lang',
        credentialId: '4af745ae-4613-40bf-93d7-9b192715b06b',
        type: 'course'
    },
    {
        id: 64,
        title: 'Diploma en Gestión del Tiempo',
        institution: 'Comprometidos con la educación - Perú',
        date: 'Noviembre 2024',
        category: 'time-management',
        categoryLabel: 'Time Management',
        description: 'Diploma que certifica competencias en técnicas de organización, planificación y administración eficiente del tiempo para incrementar la productividad.',
        image: '/assets/docs/certificates/comprometidos/Lorenzo Daniel Arteaga Gordillo - Diploma - Gestión del tiempo - Comprometidos con la educación - Perú.jpg',
        pdf: '/assets/docs/certificates/comprometidos/Lorenzo Daniel Arteaga Gordillo - Diploma - Gestión del tiempo - Comprometidos con la educación - Perú.pdf',
        verificationUrl: '#',
        credentialId: '01127fcc-b858-45fd-8133-7718ca98121a',
        type: 'course'
    },
    {
        id: 65,
        title: 'Certificado en Diseño Web con HTML5 y CSS',
        institution: 'Comprometidos con la educación - Perú',
        date: 'Febrero 2024',
        category: 'html-css',
        categoryLabel: 'HTML & CSS',
        description: 'Certificado que acredita la habilidad de construir sitios web responsivos utilizando estándares modernos de HTML5 y CSS, con enfoque en diseño y usabilidad.',
        image: '/assets/docs/certificates/comprometidos/Lorenzo Daniel Arteaga Gordillo - Certificado - Diseño Web con HTML5 + CSS - Comprometidos con la educación - Perú.jpg',
        pdf: '/assets/docs/certificates/comprometidos/Lorenzo Daniel Arteaga Gordillo - Certificado - Diseño Web con HTML5 + CSS - Comprometidos con la educación - Perú.pdf',
        verificationUrl: '#',
        credentialId: 'a3a153c2-99b9-4a68-af66-77284fb22711',
        type: 'course'
    },
    {
        id: 66,
        title: 'Especialista de Soporte Técnico',
        institution: 'UTP Universidad Tecnológica del Perú',
        date: 'Febrero 2024',
        category: 'technical-support',
        categoryLabel: 'Technical Support',
        description: 'Certificado que acredita mi formación en soporte técnico, fortaleciendo mis habilidades en resolución de problemas tecnológicos y atención eficiente a usuarios. Emitido por la Universidad Tecnológica del Perú.',
        image: '/assets/docs/certificates/utp/Lorenzo Daniel Arteaga Gordillo - Certificado - Especialista de Soporte Técnico - UTP.jpg',
        pdf: '/assets/docs/certificates/utp/Lorenzo Daniel Arteaga Gordillo - Certificado - Especialista de Soporte Técnico - UTP.pdf',
        verificationUrl: '#',
        credentialId: 'SIST005-0489-2024',
        type: 'course'
    },
    {
        id: 67,
        title: 'Certificado Inglés A2 MCER',
        institution: 'UTP Universidad Tecnológica del Perú',
        date: 'Octubre 2023',
        category: 'english',
        categoryLabel: 'English A2',
        description: 'He obtenido el Certificado de Inglés A2 según el Marco Común Europeo de Referencia para las Lenguas (MCER), otorgado por la UTP - Universidad Tecnológica del Perú. Este logro valida mis competencias en inglés a nivel básico-intermedio, esenciales para el desarrollo profesional y personal en un entorno global.\n\n📜 Detalles:\nNivel: A2\nEmitido por: UTP Universidad Tecnológica del Perú\nFecha de obtención: Octubre 2023\nID de la credencial: SIST007-0814-2023',
        image: '/assets/docs/certificates/utp/Lorenzo Daniel Arteaga Gordillo - Certificación de Inglés A2 MCER - UTP.jpg',
        pdf: '/assets/docs/certificates/utp/Lorenzo Daniel Arteaga Gordillo - Certificación de Inglés A2 MCER - UTP.pdf',
        verificationUrl: '#',
        credentialId: 'SIST007-0814-2023',
        type: 'course'
    },
    {
        id: 68,
        title: 'Asistente de docencia en Física',
        institution: 'UTP Universidad Tecnológica del Perú',
        date: 'Octubre 2023',
        category: 'physics',
        categoryLabel: 'Physics Teaching Assistant',
        description: 'Reconocimiento como Asistente de Docencia en Física, otorgado por la UTP Universidad Tecnológica del Perú. Esta certificación avala mi contribución en el apoyo académico en el área de Física, demostrando compromiso y habilidades para la enseñanza y el aprendizaje.',
        image: '/assets/docs/certificates/utp/Lorenzo Daniel Arteaga Gordillo - Certificado - Asistente de docencia en Física - UTP.jpg',
        pdf: '/assets/docs/certificates/utp/Lorenzo Daniel Arteaga Gordillo - Certificado - Asistente de docencia en Física - UTP.pdf',
        verificationUrl: '#',
        credentialId: 'SIST001-0585-2023',
        type: 'course'
    }
]

// Helper para convertir fecha a timestamp para ordenar
const parseDate = (dateStr) => {
    const months = {
        'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
        'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    }
    const [month, year] = dateStr.split(' ')
    return new Date(parseInt(year), months[month] || 0, 1)
}

// Helper para detectar si es formación o curso
const getType = (cert) => {
    if (cert.type) return cert.type

    return 'course'
}

const filteredCertificaciones = computed(() => {
    let filtered = certificaciones

    // Filtrar por categoría
    if (activeFilter.value !== 'all') {
        filtered = filtered.filter((cert) => cert.category === activeFilter.value)
    }

    // Filtrar por tipo (formación/curso)
    if (typeFilter.value !== 'all') {
        filtered = filtered.filter((cert) => getType(cert) === typeFilter.value)
    }

    // Ordenar por fecha
    if (sortOrder.value === 'newest') {
        filtered = [...filtered].sort((a, b) => parseDate(b.date) - parseDate(a.date))
    } else if (sortOrder.value === 'oldest') {
        filtered = [...filtered].sort((a, b) => parseDate(a.date) - parseDate(b.date))
    }

    return filtered
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
    margin-bottom: 1.5rem;
}

.filter-controls {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 1.5rem;
}

.type-filter,
.sort-filter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.type-filter label,
.sort-filter label {
    font-weight: 600;
    color: var(--text-color);
    font-size: 0.95rem;
}

.filter-select {
    padding: 0.5rem 1rem;
    border: 2px solid var(--border-color);
    background: var(--bg-color);
    color: var(--text-color);
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    min-width: 150px;
}

.filter-select:hover {
    border-color: var(--primary-color);
}

.filter-select:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
        padding: 1.5rem 1rem;
    }

    .filter-buttons {
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .filter-btn {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
    }

    .filter-controls {
        gap: 1rem;
        flex-direction: column;
        width: 100%;
    }

    .type-filter,
    .sort-filter {
        width: 100%;
        flex-direction: column;
        gap: 0.3rem;
    }

    .filter-select {
        width: 100%;
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
