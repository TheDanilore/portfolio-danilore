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
                <p>Usa las flechas del teclado para moverte</p>
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
            </div>
        </div>

        <div class="controls-info">
            <p>
                <IconComponent name="arrow-up" :size="20" />
                <IconComponent name="arrow-down" :size="20" />
                <IconComponent name="arrow-left" :size="20" />
                <IconComponent name="arrow-right" :size="20" />
                Usa las flechas para moverte
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

const update = () => {
    if (gameOver.value) return

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
    if (!gameStarted.value || gameOver.value) return

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
    padding: 2rem;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    min-height: 100vh;
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
}

.game-info {
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
}

.score-board {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    border-radius: 15px;
    color: white;
    gap: 2rem;
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
    font-size: 0.9rem;
    opacity: 0.8;
}

.value {
    font-size: 2rem;
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
    font-size: 2.5rem;
}

.level-name {
    font-size: 0.75rem;
    opacity: 0.9;
    color: #f093fb;
    font-weight: 600;
    margin-top: -0.3rem;
}

canvas {
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    max-width: 90vmin;
    max-height: 60vh;
}

.game-over-overlay,
.start-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.game-over-content,
.start-content {
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 600px;
}

.game-over-content h2,
.start-content h2 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
.start-btn {
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
.start-btn:hover {
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
        padding: 1rem;
    }

    .game-info {
        max-width: 100%;
    }

    canvas {
        max-width: 95vw;
        max-height: 50vh;
    }

    .score-board {
        padding: 0.8rem 1rem;
        gap: 1rem;
    }

    .value {
        font-size: 1.5rem;
    }

    .level-value {
        font-size: 2rem;
    }

    .game-over-content h2,
    .start-content h2 {
        font-size: 2rem;
    }

    .start-content p {
        font-size: 1rem;
    }

    .level-info-list {
        padding: 0.8rem 1rem;
    }
}
</style>
