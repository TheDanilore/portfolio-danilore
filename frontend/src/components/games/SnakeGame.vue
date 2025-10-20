<template>
    <div class="snake-game">
        <div class="game-info">
            <div class="score-board">
                <div class="score">
                    <span class="label">Puntuación:</span>
                    <span class="value">{{ score }}</span>
                </div>
                <div class="level-display">
                    <span class="label">Nivel:</span>
                    <span class="value level-value">{{ level }}</span>
                    <span class="level-name">{{ LEVEL_CONFIG[level]?.name }}</span>
                </div>
                <div class="high-score">
                    <span class="label">Récord:</span>
                    <span class="value">{{ highScore }}</span>
                </div>
            </div>
        </div>

        <canvas ref="gameCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>

        <!-- Mobile Controls -->
        <div class="mobile-controls">
            <div class="control-row">
                <button class="control-btn control-up" @touchstart.prevent="handleTouch('up')" @mousedown.prevent="handleTouch('up')">
                    <IconComponent name="arrow-up" :size="32" />
                </button>
            </div>
            <div class="control-row">
                <button class="control-btn control-left" @touchstart.prevent="handleTouch('left')" @mousedown.prevent="handleTouch('left')">
                    <IconComponent name="arrow-left" :size="32" />
                </button>
                <button v-if="!gameStarted || gameOver" class="control-btn control-action" @click="gameStarted ? restartGame() : startGame()">
                    <IconComponent name="play" :size="32" v-if="!gameStarted" />
                    <span v-else style="font-size: 2rem;">↻</span>
                </button>
                <button v-else class="control-btn control-action" @click="togglePause">
                    <IconComponent name="pause" :size="32" v-if="!isPaused" />
                    <IconComponent name="play" :size="32" v-else />
                </button>
                <button class="control-btn control-right" @touchstart.prevent="handleTouch('right')" @mousedown.prevent="handleTouch('right')">
                    <IconComponent name="arrow-right" :size="32" />
                </button>
            </div>
            <div class="control-row">
                <button class="control-btn control-down" @touchstart.prevent="handleTouch('down')" @mousedown.prevent="handleTouch('down')">
                    <IconComponent name="arrow-down" :size="32" />
                </button>
            </div>
        </div>

        <div v-if="gameOver" class="game-over-overlay">
            <div class="game-over-content">
                <h2>¡Game Over!</h2>
                <p class="final-score">Puntuación Final: {{ score }}</p>
                <p class="level-reached">Nivel Alcanzado: {{ level }} - {{ LEVEL_CONFIG[level]?.name }}</p>
                <p v-if="isNewRecord" class="new-record">¡Nuevo Récord! 🎉</p>
                <button class="restart-btn" @click="restartGame">
                    <IconComponent name="refresh" />
                    Jugar de Nuevo
                </button>
            </div>
        </div>

        <div v-if="!gameStarted && !gameOver" class="start-overlay">
            <div class="start-content">
                <h2>🐍 Snake Game</h2>
                <p>Usa las flechas del teclado o los botones táctiles</p>
                <p>¡Come la comida y sube de nivel!</p>
                <div class="level-info-list">
                    <p><strong>Niveles de Dificultad:</strong></p>
                    <ul>
                        <li>Nivel 1-2: Principiante / Novato (Más lento)</li>
                        <li>Nivel 3-4: Intermedio / Avanzado</li>
                        <li>Nivel 5-7: Experto / Maestro / Leyenda (¡Muy rápido!)</li>
                    </ul>
                </div>
                <button class="start-btn" @click="startGame">
                    <IconComponent name="play" />
                    Iniciar Juego
                </button>
                <div class="controls-info">
                    <p><strong>←</strong> <strong>↑</strong> <strong>→</strong> <strong>↓</strong> = Mover | <strong>Botones táctiles</strong> en móvil</p>
                    <p><strong>ESPACIO</strong> = Empezar</p>
                    <p><strong>P</strong> o <strong>ESC</strong> = Pausa</p>
                </div>
            </div>
        </div>

        <!-- Pause Overlay -->
        <div v-if="isPaused && gameStarted && !gameOver" class="pause-overlay">
            <div class="pause-content">
                <h2>⏸️ PAUSA</h2>
                <div class="pause-info">
                    <p>Puntuación: {{ score }}</p>
                    <p>Nivel: {{ level }} - {{ LEVEL_CONFIG[level]?.name }}</p>
                </div>
                <button @click="togglePause" class="resume-btn">
                    <IconComponent name="play" />
                    Continuar
                </button>
                <div class="controls-info">
                    <p>
                        <IconComponent name="gamepad" :size="16" />
                        Presiona <strong>P</strong> o <strong>ESC</strong> para continuar
                    </p>
                </div>
            </div>
        </div>

        <!-- Game Over Overlay -->
        <div v-if="gameOver" class="game-over-overlay">
            <div class="game-over-content">
                <h2>¡Game Over!</h2>
                <div class="final-score">Puntuación: {{ score }}</div>
                <div class="level-reached">Nivel Alcanzado: {{ level }}</div>
                <div v-if="isNewRecord" class="new-record">🎉 ¡Nuevo Récord! 🎉</div>
                <button @click="restartGame" class="restart-btn">
                    <IconComponent name="arrow-right" :size="20" />
                    Jugar de Nuevo
                </button>
                <div class="controls-info">
                    <p>
                        <IconComponent name="gamepad" :size="16" />
                        Presiona <strong>ESPACIO</strong> para reiniciar
                    </p>
                </div>
            </div>
        </div>

        <div class="controls-info">
            <p class="desktop-controls">
                <IconComponent name="arrow-up" :size="20" />
                <IconComponent name="arrow-down" :size="20" />
                <IconComponent name="arrow-left" :size="20" />
                <IconComponent name="arrow-right" :size="20" />
                Usa las flechas para moverte | <strong>P</strong> = Pausa
            </p>
            <p class="mobile-controls-info">
                Usa los botones de dirección | Centro = Pausa/Jugar
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import IconComponent from '@/components/icons/IconComponents.vue'

const gameCanvas = ref(null)
const canvasWidth = 600
const canvasHeight = 600
const gridSize = 20
const cellSize = canvasWidth / gridSize

let ctx = null
let gameLoop = null

const score = ref(0)
const highScore = ref(0)
const gameOver = ref(false)
const gameStarted = ref(false)
const isPaused = ref(false)
const isNewRecord = ref(false)
const level = ref(1)
const speed = ref(200) // Velocidad inicial más lenta (200ms)

// Snake
let snake = []
let direction = { x: 1, y: 0 }
let nextDirection = { x: 1, y: 0 }

// Food
let food = { x: 0, y: 0 }

// Configuración de niveles
const LEVEL_CONFIG = {
    1: { speed: 200, pointsRequired: 0, name: 'Principiante' },
    2: { speed: 170, pointsRequired: 50, name: 'Novato' },
    3: { speed: 140, pointsRequired: 100, name: 'Intermedio' },
    4: { speed: 110, pointsRequired: 150, name: 'Avanzado' },
    5: { speed: 90, pointsRequired: 200, name: 'Experto' },
    6: { speed: 70, pointsRequired: 300, name: 'Maestro' },
    7: { speed: 50, pointsRequired: 400, name: 'Leyenda' }
}

const initGame = () => {
    if (!gameCanvas.value) return

    ctx = gameCanvas.value.getContext('2d')

    // Cargar high score del localStorage
    const savedHighScore = localStorage.getItem('snakeHighScore')
    if (savedHighScore) {
        highScore.value = parseInt(savedHighScore)
    }

    resetGame()
}

const resetGame = () => {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ]
    direction = { x: 1, y: 0 }
    nextDirection = { x: 1, y: 0 }
    score.value = 0
    level.value = 1
    speed.value = LEVEL_CONFIG[1].speed
    gameOver.value = false
    isNewRecord.value = false
    spawnFood()
}

const startGame = () => {
    gameStarted.value = true
    gameOver.value = false
    resetGame()
    gameLoop = setInterval(update, speed.value)
}

const restartGame = () => {
    startGame()
}

// Función para actualizar la velocidad según el nivel
const updateSpeed = () => {
    if (gameLoop) {
        clearInterval(gameLoop)
        gameLoop = setInterval(update, speed.value)
    }
}

// Función para verificar y subir de nivel
const checkLevelUp = () => {
    for (let lvl = 7; lvl >= 1; lvl--) {
        if (score.value >= LEVEL_CONFIG[lvl].pointsRequired && level.value < lvl) {
            level.value = lvl
            speed.value = LEVEL_CONFIG[lvl].speed
            updateSpeed()
            return true
        }
    }
    return false
}

const spawnFood = () => {
    let validPosition = false

    while (!validPosition) {
        food.x = Math.floor(Math.random() * gridSize)
        food.y = Math.floor(Math.random() * gridSize)

        // Verificar que no esté en la serpiente
        validPosition = !snake.some(segment => segment.x === food.x && segment.y === food.y)
    }
}
const togglePause = () => {
    if (!gameStarted.value || gameOver.value) return
    isPaused.value = !isPaused.value
}

const update = () => {
    if (gameOver.value || isPaused.value) return

    // Actualizar dirección
    direction = { ...nextDirection }

    // Mover serpiente
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }

    // Verificar colisiones con paredes
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        endGame()
        return
    }

    // Verificar colisión consigo misma
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame()
        return
    }

    snake.unshift(head)

    // Verificar si comió
    if (head.x === food.x && head.y === food.y) {
        score.value += 10
        checkLevelUp() // Verificar si sube de nivel
        spawnFood()
    } else {
        snake.pop()
    }

    draw()
}

const draw = () => {
    if (!ctx) return

    // Limpiar canvas con patrón de tablero
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.fillStyle = (x + y) % 2 === 0 ? '#1a1a2e' : '#16213e'
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
    }

    // Dibujar serpiente
    snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(
            segment.x * cellSize,
            segment.y * cellSize,
            (segment.x + 1) * cellSize,
            (segment.y + 1) * cellSize
        )

        if (index === 0) {
            // Cabeza
            gradient.addColorStop(0, '#667eea')
            gradient.addColorStop(1, '#764ba2')
        } else {
            // Cuerpo
            gradient.addColorStop(0, '#667eea')
            gradient.addColorStop(1, '#667eea')
        }

        ctx.fillStyle = gradient
        ctx.fillRect(
            segment.x * cellSize + 2,
            segment.y * cellSize + 2,
            cellSize - 4,
            cellSize - 4
        )

        // Ojos en la cabeza
        if (index === 0) {
            ctx.fillStyle = '#ffffff'
            const eyeSize = cellSize / 6

            if (direction.x === 1) { // Derecha
                ctx.fillRect(segment.x * cellSize + cellSize - eyeSize * 2, segment.y * cellSize + eyeSize, eyeSize, eyeSize)
                ctx.fillRect(segment.x * cellSize + cellSize - eyeSize * 2, segment.y * cellSize + cellSize - eyeSize * 2, eyeSize, eyeSize)
            } else if (direction.x === -1) { // Izquierda
                ctx.fillRect(segment.x * cellSize + eyeSize, segment.y * cellSize + eyeSize, eyeSize, eyeSize)
                ctx.fillRect(segment.x * cellSize + eyeSize, segment.y * cellSize + cellSize - eyeSize * 2, eyeSize, eyeSize)
            } else if (direction.y === -1) { // Arriba
                ctx.fillRect(segment.x * cellSize + eyeSize, segment.y * cellSize + eyeSize, eyeSize, eyeSize)
                ctx.fillRect(segment.x * cellSize + cellSize - eyeSize * 2, segment.y * cellSize + eyeSize, eyeSize, eyeSize)
            } else { // Abajo
                ctx.fillRect(segment.x * cellSize + eyeSize, segment.y * cellSize + cellSize - eyeSize * 2, eyeSize, eyeSize)
                ctx.fillRect(segment.x * cellSize + cellSize - eyeSize * 2, segment.y * cellSize + cellSize - eyeSize * 2, eyeSize, eyeSize)
            }
        }
    })

    // Dibujar comida (manzana)
    const foodGradient = ctx.createRadialGradient(
        food.x * cellSize + cellSize / 2,
        food.y * cellSize + cellSize / 2,
        0,
        food.x * cellSize + cellSize / 2,
        food.y * cellSize + cellSize / 2,
        cellSize / 2
    )
    foodGradient.addColorStop(0, '#ff6b6b')
    foodGradient.addColorStop(1, '#c92a2a')

    ctx.fillStyle = foodGradient
    ctx.beginPath()
    ctx.arc(
        food.x * cellSize + cellSize / 2,
        food.y * cellSize + cellSize / 2,
        cellSize / 2 - 2,
        0,
        Math.PI * 2
    )
    ctx.fill()

    // Tallo de la manzana
    ctx.fillStyle = '#51cf66'
    ctx.fillRect(
        food.x * cellSize + cellSize / 2 - 2,
        food.y * cellSize + 4,
        4,
        6
    )
}

const endGame = () => {
    gameOver.value = true
    clearInterval(gameLoop)

    // Actualizar high score
    if (score.value > highScore.value) {
        highScore.value = score.value
        isNewRecord.value = true
        localStorage.setItem('snakeHighScore', highScore.value.toString())
    }
}

const handleKeyPress = (event) => {
    // Handle start
    if (!gameStarted.value && event.code === 'Space') {
        event.preventDefault()
        startGame()
        return
    }

    // Handle pause/unpause
    if (gameStarted.value && !gameOver.value && (event.code === 'KeyP' || event.code === 'Escape')) {
        event.preventDefault()
        togglePause()
        return
    }

    // Handle restart
    if (gameOver.value && event.code === 'Space') {
        event.preventDefault()
        restartGame()
        return
    }

    // Game controls (only when not paused)
    if (!gameStarted.value || gameOver.value || isPaused.value) return

    const key = event.key

    // Evitar giro de 180 grados
    if (key === 'ArrowUp' && direction.y === 0) {
        nextDirection = { x: 0, y: -1 }
    } else if (key === 'ArrowDown' && direction.y === 0) {
        nextDirection = { x: 0, y: 1 }
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        nextDirection = { x: -1, y: 0 }
    } else if (key === 'ArrowRight' && direction.x === 0) {
        nextDirection = { x: 1, y: 0 }
    }

    event.preventDefault()
}

const handleTouch = (dir) => {
    if (!gameStarted.value || gameOver.value || isPaused.value) return
    
    // Evitar giro de 180 grados
    if (dir === 'up' && direction.y === 0) {
        nextDirection = { x: 0, y: -1 }
    } else if (dir === 'down' && direction.y === 0) {
        nextDirection = { x: 0, y: 1 }
    } else if (dir === 'left' && direction.x === 0) {
        nextDirection = { x: -1, y: 0 }
    } else if (dir === 'right' && direction.x === 0) {
        nextDirection = { x: 1, y: 0 }
    }
}

onMounted(() => {
    initGame()
    window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
    clearInterval(gameLoop)
    window.removeEventListener('keydown', handleKeyPress)
})
</script>

<style scoped>
.snake-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    min-height: 100vh;
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    gap: 1rem;
}

.game-info {
    width: 100%;
    max-width: 600px;
}

.score-board {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 0.8rem 1.5rem;
    border-radius: 15px;
    color: white;
    gap: 1rem;
    flex-wrap: wrap;
}

.score,
.level-display,
.high-score {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
}

.label {
    font-size: 0.8rem;
    opacity: 0.8;
}

.value {
    font-size: 1.5rem;
    font-weight: 700;
    font-family: 'Courier New', monospace;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.level-display {
    text-align: center;
}

.level-value {
    font-size: 2rem;
}

.level-name {
    font-size: 0.7rem;
    opacity: 0.9;
    color: #f093fb;
    font-weight: 600;
    margin-top: -0.3rem;
}

canvas {
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    max-width: 100%;
    height: auto;
    display: block;
}

/* Mobile Controls */
.mobile-controls {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;
    max-width: 300px;
}

.control-row {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.control-btn {
    width: 70px;
    height: 70px;
    background: rgba(102, 126, 234, 0.3);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(102, 126, 234, 0.5);
    border-radius: 15px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

.control-btn:active {
    background: rgba(102, 126, 234, 0.6);
    transform: scale(0.95);
}

.control-action {
    background: rgba(118, 75, 162, 0.4);
    border-color: rgba(118, 75, 162, 0.6);
}

.control-action:active {
    background: rgba(118, 75, 162, 0.7);
}

.game-over-overlay,
.start-overlay,
.pause-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.game-over-content,
.start-content,
.pause-content {
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 600px;
}

.game-over-content h2,
.start-content h2,
.pause-content h2 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.pause-info {
    margin: 2rem 0;
}

.pause-info p {
    font-size: 1.3rem;
    margin: 0.8rem 0;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
}

.start-content p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    opacity: 0.9;
}

.level-info-list {
    margin: 1.5rem 0;
    text-align: left;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem 1.5rem;
    border-radius: 10px;
    backdrop-filter: blur(5px);
}

.level-info-list p {
    margin-bottom: 0.5rem;
    color: #f093fb;
}

.level-info-list ul {
    list-style: none;
    padding-left: 0;
}

.level-info-list li {
    padding: 0.3rem 0;
    font-size: 0.95rem;
    opacity: 0.85;
}

.final-score,
.level-reached {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
}

.new-record {
    font-size: 1.8rem;
    color: #ffd700;
    margin-bottom: 1rem;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.05);
    }
}

.restart-btn,
.start-btn,
.resume-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
}

.restart-btn:hover,
.start-btn:hover,
.resume-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
}

.controls-info {
    margin-top: 1rem;
    text-align: center;
    color: white;
    opacity: 0.7;
    font-size: 0.9rem;
}

.controls-info p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.controls-info svg {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.3rem;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.controls-info svg:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
    .snake-game {
        padding: 0.5rem;
        gap: 0.5rem;
    }

    .game-info {
        max-width: 100%;
    }

    .score-board {
        padding: 0.6rem 1rem;
        gap: 0.8rem;
        font-size: 0.9rem;
    }

    .label {
        font-size: 0.7rem;
    }

    .value {
        font-size: 1.2rem;
    }

    .level-value {
        font-size: 1.5rem;
    }

    .level-name {
        font-size: 0.65rem;
    }

    canvas {
        max-width: 100%;
        width: 100%;
        height: auto;
        aspect-ratio: 1;
    }

    /* Show mobile controls */
    .mobile-controls {
        display: flex;
    }

    .desktop-controls {
        display: none !important;
    }

    .mobile-controls-info {
        display: flex !important;
    }

    .game-over-content h2,
    .start-content h2,
    .pause-content h2 {
        font-size: 2rem;
    }

    .game-over-content,
    .start-content,
    .pause-content {
        padding: 1rem;
        max-width: 90%;
    }

    .start-content p {
        font-size: 0.9rem;
    }

    .level-info-list {
        padding: 0.8rem 1rem;
        font-size: 0.85rem;
    }

    .level-info-list li {
        font-size: 0.8rem;
    }

    .restart-btn,
    .start-btn,
    .resume-btn {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
    }

    .controls-info {
        font-size: 0.8rem;
    }

    .final-score,
    .level-reached {
        font-size: 1.2rem;
    }

    .new-record {
        font-size: 1.4rem;
    }
}

@media (max-width: 480px) {
    .score-board {
        padding: 0.5rem 0.8rem;
        gap: 0.5rem;
    }

    .label {
        font-size: 0.65rem;
    }

    .value {
        font-size: 1rem;
    }

    .level-value {
        font-size: 1.3rem;
    }

    .control-btn {
        width: 60px;
        height: 60px;
    }

    .game-over-content h2,
    .start-content h2,
    .pause-content h2 {
        font-size: 1.5rem;
    }
}

@media (orientation: landscape) and (max-height: 600px) {
    .snake-game {
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding: 0.5rem;
    }

    .game-info {
        order: -1;
        max-width: 200px;
    }

    canvas {
        max-height: 80vh;
        max-width: 80vh;
    }

    .mobile-controls {
        margin-top: 0;
        max-width: 200px;
    }

    .control-btn {
        width: 50px;
        height: 50px;
    }
}
</style>
