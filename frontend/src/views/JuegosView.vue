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

                    <!-- Tetris Game -->
                    <div class="game-card" @click="openGame('tetris')">
                        <div class="game-preview">
                            <div class="tetris-preview">
                                <div class="tetris-blocks">
                                    <div class="tetris-block" style="background: #00f0f0;"></div>
                                    <div class="tetris-block" style="background: #f0f000;"></div>
                                    <div class="tetris-block" style="background: #a000f0;"></div>
                                    <div class="tetris-block" style="background: #00f000;"></div>
                                    <div class="tetris-block" style="background: #f00000;"></div>
                                    <div class="tetris-block" style="background: #0000f0;"></div>
                                    <div class="tetris-block" style="background: #f0a000;"></div>
                                </div>
                            </div>
                            <div class="play-overlay">
                                <IconComponent name="arrow-right" :size="48" color="white" />
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
                            <div class="game-features">
                                <div class="feature">
                                    <IconComponent name="arrow-up" :size="16" />
                                    <span>Rotación de piezas</span>
                                </div>
                                <div class="feature">
                                    <IconComponent name="arrow-down" :size="16" />
                                    <span>Sistema de niveles</span>
                                </div>
                                <div class="feature">
                                    <IconComponent name="download" :size="16" />
                                    <span>Récords guardados</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Breakout Game -->
                    <div class="game-card" @click="openGame('breakout')">
                        <div class="game-preview">
                            <div class="breakout-preview">
                                <div class="breakout-container">
                                    <div class="breakout-blocks">
                                        <div class="breakout-block" style="background: #f00000;"></div>
                                        <div class="breakout-block" style="background: #f0a000;"></div>
                                        <div class="breakout-block" style="background: #f0f000;"></div>
                                        <div class="breakout-block" style="background: #00f000;"></div>
                                        <div class="breakout-block" style="background: #0000f0;"></div>
                                    </div>
                                    <div class="breakout-ball"></div>
                                    <div class="breakout-paddle"></div>
                                </div>
                            </div>
                            <div class="play-overlay">
                                <IconComponent name="arrow-right" :size="48" color="white" />
                            </div>
                        </div>
                        <div class="game-content">
                            <h3 class="game-title">Breakout</h3>
                            <p class="game-description">
                                Destruye bloques con la pelota. ¡Recoge power-ups especiales!
                            </p>
                            <div class="game-tech">
                                <span class="tech-tag">Vue.js 3</span>
                                <span class="tech-tag">Canvas API</span>
                            </div>
                            <div class="game-features">
                                <div class="feature">
                                    <IconComponent name="arrow-left" :size="16" />
                                    <span>Power-ups únicos</span>
                                </div>
                                <div class="feature">
                                    <IconComponent name="arrow-up" :size="16" />
                                    <span>Múltiples niveles</span>
                                </div>
                                <div class="feature">
                                    <IconComponent name="download" :size="16" />
                                    <span>Sistema de vidas</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Placeholder Game 4 -->
                    <div class="game-card" @click="openGame('space-invaders')">
                        <div class="game-preview">
                            <div class="space-invaders-preview">
                                <div class="si-container">
                                    <div class="si-aliens">
                                        <div class="si-alien" v-for="n in 6" :key="n"></div>
                                    </div>
                                    <div class="si-player"></div>
                                    <div class="si-bullet"></div>
                                </div>
                            </div>
                            <div class="play-overlay">
                                <IconComponent name="arrow-right" :size="48" color="white" />
                            </div>
                        </div>
                        <div class="game-content">
                            <h3 class="game-title">Space Invaders</h3>
                            <p class="game-description">
                                ¡Defiende la Tierra! Dispara a los aliens y recoge power-ups.
                            </p>
                            <div class="game-tech">
                                <span class="tech-tag">Vue.js 3</span>
                                <div class="feature">
                                    <IconComponent name="download" :size="16" />
                                    <span>Aliens con vida</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Game Modal -->
        <GameModal :is-open="isGameModalOpen" @close="closeGame">
            <SnakeGame v-if="currentGame === 'snake'" />
            <TetrisGame v-if="currentGame === 'tetris'" />
            <BreakoutGame v-if="currentGame === 'breakout'" />
            <SpaceInvadersGame v-if="currentGame === 'space-invaders'" />
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
import TetrisGame from '@/components/games/TetrisGame.vue'
import BreakoutGame from '@/components/games/BreakoutGame.vue'
import SpaceInvadersGame from '@/components/games/SpaceInvadersGame.vue'

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

.tetris-preview {
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.tetris-blocks {
    display: grid;
    grid-template-columns: repeat(4, 30px);
    grid-template-rows: repeat(4, 30px);
    gap: 4px;
}

.tetris-block {
    border-radius: 3px;
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
    animation: tetrisPulse 1.5s ease-in-out infinite;
}

@keyframes tetrisPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.8;
    }
    50% {
        transform: scale(1.05);
        opacity: 1;
    }
}

.breakout-preview {
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.breakout-container {
    position: relative;
    width: 160px;
    height: 200px;
}

.breakout-blocks {
    display: grid;
    grid-template-columns: repeat(5, 28px);
    gap: 4px;
    margin-bottom: 1rem;
}

.breakout-block {
    height: 15px;
    border-radius: 2px;
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
    animation: blockShine 2s infinite;
}

@keyframes blockShine {
    0%, 100% {
        opacity: 0.8;
    }
    50% {
        opacity: 1;
    }
}

.breakout-ball {
    position: absolute;
    width: 12px;
    height: 12px;
    background: radial-gradient(circle at 30% 30%, #fff, #f0a000);
    border-radius: 50%;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    animation: ballBounce 1.5s ease-in-out infinite;
}

@keyframes ballBounce {
    0%, 100% {
        bottom: 40px;
    }
    50% {
        bottom: 120px;
    }
}

.breakout-paddle {
    position: absolute;
    width: 50px;
    height: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    animation: paddleMove 2s ease-in-out infinite;
}

@keyframes paddleMove {
    0%, 100% {
        left: 40%;
    }
    50% {
        left: 60%;
    }
}

.space-invaders-preview {
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    position: relative;
}

.si-container {
    position: relative;
    width: 160px;
    height: 200px;
}

.si-aliens {
    display: grid;
    grid-template-columns: repeat(3, 40px);
    gap: 8px;
    margin-bottom: 2rem;
}

.si-alien {
    width: 40px;
    height: 30px;
    background: linear-gradient(135deg, #ff00ff 0%, #ff0066 100%);
    border-radius: 4px;
    position: relative;
    animation: alienFloat 2s ease-in-out infinite;
}

.si-alien::before,
.si-alien::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    top: 8px;
}

.si-alien::before {
    left: 8px;
}

.si-alien::after {
    right: 8px;
}

.si-alien:nth-child(1) {
    animation-delay: 0s;
}

.si-alien:nth-child(2) {
    animation-delay: 0.2s;
}

.si-alien:nth-child(3) {
    animation-delay: 0.4s;
}

.si-alien:nth-child(4) {
    animation-delay: 0.1s;
}

.si-alien:nth-child(5) {
    animation-delay: 0.3s;
}

.si-alien:nth-child(6) {
    animation-delay: 0.5s;
}

@keyframes alienFloat {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-10px) scale(1.05);
    }
}

.si-player {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 30px;
    background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    animation: siPlayerMove 2s ease-in-out infinite;
}

@keyframes siPlayerMove {
    0%, 100% {
        left: 40%;
    }
    50% {
        left: 60%;
    }
}

.si-bullet {
    position: absolute;
    width: 4px;
    height: 15px;
    background: #ffff00;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    animation: bulletFly 1.5s linear infinite;
}

@keyframes bulletFly {
    0% {
        bottom: 50px;
        opacity: 1;
    }
    100% {
        bottom: 150px;
        opacity: 0;
    }
}

.tetris-blocks .tetris-block:nth-child(1) {
    grid-column: 1 / 5;
    grid-row: 1;
}

.tetris-blocks .tetris-block:nth-child(2) {
    grid-column: 1 / 3;
    grid-row: 2 / 4;
}

.tetris-blocks .tetris-block:nth-child(3) {
    grid-column: 3;
    grid-row: 2;
}

.tetris-blocks .tetris-block:nth-child(4) {
    grid-column: 3 / 5;
    grid-row: 3;
}

.tetris-blocks .tetris-block:nth-child(5) {
    grid-column: 4;
    grid-row: 2;
}

.tetris-blocks .tetris-block:nth-child(6) {
    grid-column: 1;
    grid-row: 4;
}

.tetris-blocks .tetris-block:nth-child(7) {
    grid-column: 2 / 5;
    grid-row: 4;
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
