<template>
    <div class="juegos-view">
        <HeaderNav />

        <!-- Hero Section -->
        <section class="juegos-hero">
            <div class="container">
                <h1 class="hero-title">Juegos Interactivos</h1>
                <p class="hero-subtitle">Diviértete con estos mini-juegos creados con Vue.js y Canvas</p>
            </div>
        </section>

        <!-- Games Grid -->
        <section class="section-padding">
            <div class="container">
                <div class="games-grid">
                    <!-- Snake Game -->
                    <div class="game-card" @click="openGame('snake')">
                        <div class="game-preview">
                            <div class="snake-preview">
                                <div class="snake-grid">
                                    <div class="snake-dot" v-for="n in 20" :key="n"></div>
                                </div>
                                <div class="snake-icon">🐍</div>
                            </div>
                            <div class="play-overlay">
                                <IconComponent name="play" />
                                <span>Jugar Ahora</span>
                            </div>
                        </div>
                        <div class="game-content">
                            <h3 class="game-title">Snake Game</h3>
                            <p class="game-description">
                                El clásico juego de la serpiente. ¡Come manzanas y crece sin chocarte!
                            </p>
                            <div class="game-tech">
                                <span class="tech-tag">Vue.js 3</span>
                                <span class="tech-tag">Canvas API</span>
                                <span class="tech-tag">JavaScript</span>
                            </div>
                            <div class="game-features">
                                <div class="feature">
                                    <IconComponent name="gamepad" />
                                    <span>Controles con teclado</span>
                                </div>
                                <div class="feature">
                                    <IconComponent name="trophy" />
                                    <span>Sistema de puntuación</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Placeholder Game 2 -->
                    <div class="game-card coming-soon">
                        <div class="game-preview">
                            <div class="coming-soon-preview">
                                <IconComponent name="code" />
                                <span>Próximamente</span>
                            </div>
                        </div>
                        <div class="game-content">
                            <h3 class="game-title">Tetris</h3>
                            <p class="game-description">
                                El legendario juego de bloques. Completa líneas y obtén puntos.
                            </p>
                            <div class="game-tech">
                                <span class="tech-tag">Vue.js 3</span>
                                <span class="tech-tag">Canvas API</span>
                            </div>
                        </div>
                    </div>

                    <!-- Placeholder Game 3 -->
                    <div class="game-card coming-soon">
                        <div class="game-preview">
                            <div class="coming-soon-preview">
                                <IconComponent name="code" />
                                <span>Próximamente</span>
                            </div>
                        </div>
                        <div class="game-content">
                            <h3 class="game-title">Memory Game</h3>
                            <p class="game-description">
                                Juego de memoria con cartas. Encuentra todas las parejas.
                            </p>
                            <div class="game-tech">
                                <span class="tech-tag">Vue.js 3</span>
                                <span class="tech-tag">CSS Animations</span>
                            </div>
                        </div>
                    </div>

                    <!-- Placeholder Game 4 -->
                    <div class="game-card coming-soon">
                        <div class="game-preview">
                            <div class="coming-soon-preview">
                                <IconComponent name="code" />
                                <span>Próximamente</span>
                            </div>
                        </div>
                        <div class="game-content">
                            <h3 class="game-title">Pong</h3>
                            <p class="game-description">
                                El clásico juego de ping-pong arcade. ¡Derrota a la IA!
                            </p>
                            <div class="game-tech">
                                <span class="tech-tag">Vue.js 3</span>
                                <span class="tech-tag">Canvas API</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Game Modal -->
        <GameModal :is-open="isGameModalOpen" @close="closeGame">
            <SnakeGame v-if="currentGame === 'snake'" />
        </GameModal>

        <FooterSection />
        <BackToTop />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderNav from '@/components/layout/HeaderNav.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
import IconComponent from '@/components/icons/IconComponents.vue'
import GameModal from '@/components/games/GameModal.vue'
import SnakeGame from '@/components/games/SnakeGame.vue'

const isGameModalOpen = ref(false)
const currentGame = ref(null)

const openGame = (gameName) => {
    currentGame.value = gameName
    isGameModalOpen.value = true
}

const closeGame = () => {
    isGameModalOpen.value = false
    setTimeout(() => {
        currentGame.value = null
    }, 300)
}
</script>

<style scoped>
.juegos-view {
    width: 100%;
    overflow-x: hidden;
}

/* Hero Section */
.juegos-hero {
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

/* Games Grid */
.section-padding {
    padding: 4rem 2rem;
    background: var(--bg-color);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
}

.game-card {
    background: var(--bg-secondary);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
}

.game-card:not(.coming-soon):hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
}

.game-card.coming-soon {
    cursor: not-allowed;
    opacity: 0.7;
}

.game-preview {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.snake-preview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.snake-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    padding: 2rem;
}

.snake-dot {
    width: 40px;
    height: 40px;
    background: rgba(102, 126, 234, 0.3);
    border-radius: 4px;
    animation: snakePulse 2s ease-in-out infinite;
}

.snake-dot:nth-child(1) {
    animation-delay: 0s;
}

.snake-dot:nth-child(2) {
    animation-delay: 0.1s;
}

.snake-dot:nth-child(3) {
    animation-delay: 0.2s;
}

.snake-dot:nth-child(4) {
    animation-delay: 0.3s;
}

.snake-dot:nth-child(5) {
    animation-delay: 0.4s;
}

.snake-dot:nth-child(6) {
    animation-delay: 0.5s;
}

.snake-dot:nth-child(7) {
    animation-delay: 0.6s;
}

.snake-dot:nth-child(8) {
    animation-delay: 0.7s;
}

@keyframes snakePulse {

    0%,
    100% {
        opacity: 0.3;
        transform: scale(1);
    }

    50% {
        opacity: 1;
        transform: scale(1.1);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
}

.snake-icon {
    position: absolute;
    font-size: 5rem;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

.coming-soon-preview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.2rem;
    font-weight: 600;
}

.coming-soon-preview :deep(svg) {
    font-size: 4rem;
}

.play-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
}

.game-card:not(.coming-soon):hover .play-overlay {
    opacity: 1;
}

.play-overlay :deep(svg) {
    font-size: 3rem;
}

.game-content {
    padding: 1.5rem;
}

.game-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 0.8rem;
    font-family: var(--font-display);
}

.game-description {
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 1rem;
}

.game-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tech-tag {
    padding: 0.3rem 0.8rem;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 15px;
    font-size: 0.85rem;
    color: var(--text-light);
}

.game-features {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-light);
    font-size: 0.9rem;
}

.feature :deep(svg) {
    color: var(--primary-color);
}

/* Responsive */
@media (max-width: 768px) {
    .games-grid {
        grid-template-columns: 1fr;
    }

    .juegos-hero {
        padding: 6rem 1rem 3rem;
    }

    .game-preview {
        height: 200px;
    }

    .snake-grid {
        gap: 6px;
        padding: 1rem;
    }

    .snake-dot {
        width: 30px;
        height: 30px;
    }

    .snake-icon {
        font-size: 3rem;
    }
}
</style>
