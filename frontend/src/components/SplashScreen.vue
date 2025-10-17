<template>
    <Transition name="splash-fade">
        <div v-if="isVisible" class="splash-screen">
            <!-- SVG con máscara para recortar el texto -->
            <svg class="svg-mask" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <mask id="textMask">
                        <rect width="100%" height="100%" fill="white" />
                        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="mask-text">DANILOREDEV</text>
                    </mask>
                </defs>
                <!-- Rectángulo negro con máscara de texto que cubre todo -->
                <rect width="100%" height="100%" fill="#000000" mask="url(#textMask)" />
            </svg>
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

    // 1. Fade in solo del TEXTO (no del SVG completo)
    timeline.from('.mask-text', {
        duration: 1.2,
        opacity: 0,
        scale: 0.8,
        ease: 'power2.out'
    })

    // 2. Pausa para ver el efecto
    timeline.to({}, { duration: 2 })

    // 3. Zoom del SVG completo
    timeline.to('.svg-mask', {
        duration: 1.5,
        scale: 900,
        ease: 'power2.inOut'
    })

    // 4. Fade out de todo
    timeline.to('.splash-screen', {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.5')
})
</script>

<style scoped>
.splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: transparent;
}

.svg-mask {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    transform-origin: center;
}

.svg-mask rect {
    width: 100%;
    height: 100%;
}

.mask-text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    font-size: 70px;
    letter-spacing: 8px;
    fill: black;
    transform-origin: center;
}


/* Responsive */
@media (max-width: 1300px) {
    .mask-text {
        font-size: 50px;
        letter-spacing: 6px;
    }
}

@media (max-width: 992px) {
    .mask-text {
        font-size: 40px;
        letter-spacing: 5px;
    }
}

@media (max-width: 768px) {
    .mask-text {
        font-size: 30px;
        letter-spacing: 4px;
    }
}

@media (max-width: 576px) {
    .mask-text {
        font-size: 25px;
        letter-spacing: 3px;
    }
}

@media (max-width: 480px) {
    .mask-text {
        font-size: 18px;
        letter-spacing: 2px;
    }
}

@media (max-width: 380px) {
    .mask-text {
        font-size: 16px;
        letter-spacing: 1px;
    }
}
</style>
