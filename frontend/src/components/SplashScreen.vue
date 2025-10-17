<template>
    <Transition name="splash-fade">
        <div v-if="isVisible" class="splash-screen">
            <!-- Texto DANILORE DEV -->
            <div class="text-container">
                <h1 class="splash-text">DANILORE DEV</h1>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['animation-complete'])

const isVisible = ref(true)

onMounted(() => {
    const timeline = gsap.timeline({
        onComplete: () => {
            sessionStorage.setItem('portfolio-visited', 'true')
            setTimeout(() => {
                isVisible.value = false
                emit('animation-complete')
            }, 300)
        }
    })

    // 1. Fade in del texto
    timeline.from('.splash-text', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power2.out'
    })

    // 2. Pausa para leer el texto
    timeline.to({}, { duration: 1.5 })

    // 3. Zoom y fade out simultáneos
    timeline.to('.splash-text', {
        duration: 1.2,
        scale: 8,
        opacity: 0,
        ease: 'power2.inOut'
    })

    timeline.to('.splash-screen', {
        duration: 0.4,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.4')
})
</script>

<style scoped>
.splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background: linear-gradient(135deg, #000000 0%, #2a2a2a 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.text-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
}

.splash-text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: clamp(2.5rem, 8vw, 7rem);
    color: #ffffff;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.5),
                 0 0 60px rgba(255, 255, 255, 0.3);
    transform-origin: center;
    white-space: nowrap;
}

/* Transición de salida */
.splash-fade-enter-active,
.splash-fade-leave-active {
    transition: opacity 0.5s ease;
}

.splash-fade-enter-from,
.splash-fade-leave-to {
    opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
    .splash-text {
        font-size: clamp(2rem, 7vw, 5rem);
        letter-spacing: 0.05em;
    }
}

@media (max-width: 480px) {
    .splash-text {
        font-size: clamp(1.5rem, 6vw, 4rem);
    }
}
</style>
