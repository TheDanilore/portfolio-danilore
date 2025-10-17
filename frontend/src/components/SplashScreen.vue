<template>
    <Transition name="splash-fade">
        <div v-if="isVisible" class="splash-screen">
            <!-- Fondo negro completo -->
            <div class="black-background" :class="{ 'fade-out': isExpanding }"></div>

            <div class="splash-content">
                <!-- Letras que muestran el contenido interno -->
                <div class="text-reveal-container" :class="{ 'expanding': isExpanding }">
                    <div class="text-reveal">
                        <span v-for="(letter, index) in letters" :key="index"
                            :class="['letter', { space: letter === ' ' }]">
                            <span class="letter-inner">{{ letter === ' ' ? '\u00A0' : letter }}</span>
                        </span>
                    </div>
                </div>

                <!-- Partículas de fondo -->
                <div class="particles-container">
                    <div v-for="i in 30" :key="i" class="particle" :style="getParticleStyle()"></div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['animation-complete'])

const isVisible = ref(true)
const isExpanding = ref(false)
const text = 'DANILORE DEV'
const letters = ref(text.split(''))

const getParticleStyle = () => {
    return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`
    }
}

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

    // 1. Letras aparecen una por una mostrando contenido dentro
    timeline.from('.letter', {
        duration: 0.1,
        opacity: 0,
        scale: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
    })

    // 2. Pausa para ver las letras
    timeline.to({}, { duration: 1 })

    // 3. Las letras empiezan a crecer y el fondo negro desaparece
    timeline.to('.text-reveal-container', {
        duration: 1.5,
        scale: 10,
        opacity: 0,
        ease: 'power2.inOut',
        onStart: () => {
            isExpanding.value = true
        }
    })

    // 4. Fade out completo
    timeline.to('.splash-screen', {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.inOut'
    }, '-=0.5')

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
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.black-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 1;
    transition: opacity 1.5s ease;
}

.black-background.fade-out {
    opacity: 0;
}

.splash-content {
    position: relative;
    width: 100%;
    height: 100%;
}

.text-reveal-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    transform-origin: center;
}

.text-reveal {
    display: flex;
    gap: 0.3em;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: clamp(2.5rem, 8vw, 7rem);
    text-transform: uppercase;
    letter-spacing: 0.15em;
}

.letter {
    display: inline-block;
    position: relative;
    overflow: hidden;
    border: 3px solid transparent;
    background: linear-gradient(#000, #000) padding-box,
        linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%) border-box;
    border-radius: 8px;
    padding: 0.1em 0.2em;
    perspective: 1000px;
}

.letter.space {
    border: none;
    background: none;
    min-width: 0.5em;
}

.letter-inner {
    display: block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 100%);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

/* Partículas de fondo */
.particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
}

.particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(102, 126, 234, 0.8);
    border-radius: 50%;
    animation: particle-float linear infinite;
    box-shadow: 0 0 8px rgba(102, 126, 234, 1);
}

@keyframes particle-float {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }

    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
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
    .text-reveal {
        font-size: clamp(1.8rem, 7vw, 4rem);
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.2em;
    }

    .letter {
        margin: 0.05em;
        padding: 0.05em 0.15em;
    }
}
</style>
