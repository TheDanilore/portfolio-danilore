<template>
    <div class="tetris-game">
        <div class="game-info">
            <div class="score-board">
                <div class="score">
                    <span class="label">Puntuación</span>
                    <span class="value">{{ score }}</span>
                </div>
                <div class="level-display">
                    <span class="label">Nivel</span>
                    <span class="value level-value">{{ level }}</span>
                    <span class="level-name">{{ getLevelName(level) }}</span>
                </div>
                <div class="high-score">
                    <span class="label">Récord</span>
                    <span class="value">{{ highScore }}</span>
                </div>
            </div>
            <div class="next-piece-container">
                <h3>Siguiente</h3>
                <canvas ref="nextPieceCanvas" width="120" height="120"></canvas>
            </div>
        </div>

        <canvas ref="gameCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>

        <!-- Start Screen -->
        <div v-if="!gameStarted" class="start-overlay">
            <div class="start-content">
                <h2>🎮 TETRIS 🎮</h2>
                <p>Completa líneas horizontales para eliminarlas y ganar puntos</p>
                
                <div class="level-info-list">
                    <p><strong>Niveles:</strong></p>
                    <ul>
                        <li>Nivel 1 (Principiante): Velocidad baja</li>
                        <li>Nivel 2-3 (Intermedio): Velocidad media</li>
                        <li>Nivel 4-6 (Avanzado): Velocidad rápida</li>
                        <li>Nivel 7+ (Experto): ¡Velocidad extrema!</li>
                    </ul>
                    <p><strong>Puntuación:</strong></p>
                    <ul>
                        <li>1 Línea: 100 puntos × nivel</li>
                        <li>2 Líneas: 300 puntos × nivel</li>
                        <li>3 Líneas: 500 puntos × nivel</li>
                        <li>4 Líneas (Tetris): 800 puntos × nivel</li>
                    </ul>
                </div>

                <button class="start-btn" @click="startGame">
                    <IconComponent name="arrow-right" :size="20" />
                    Iniciar Juego
                </button>

                <div class="controls-info">
                    <p>
                        <IconComponent name="arrow-left" :size="16" />
                        <IconComponent name="arrow-right" :size="16" />
                        Mover | 
                        <IconComponent name="arrow-down" :size="16" />
                        Caída rápida | 
                        <IconComponent name="arrow-up" :size="16" />
                        Rotar
                    </p>
                    <p>ESPACIO: Caída instantánea | P: Pausar</p>
                </div>
            </div>
        </div>

        <!-- Game Over Screen -->
        <div v-if="gameOver" class="game-over-overlay">
            <div class="game-over-content">
                <h2>🎮 GAME OVER 🎮</h2>
                <p class="final-score">Puntuación Final: <strong>{{ score }}</strong></p>
                <p class="level-reached">Nivel Alcanzado: <strong>{{ level }}</strong></p>
                <p class="lines-cleared">Líneas Completadas: <strong>{{ linesCleared }}</strong></p>
                <p v-if="isNewRecord" class="new-record">🏆 ¡NUEVO RÉCORD! 🏆</p>
                <button class="restart-btn" @click="restartGame">
                    <IconComponent name="arrow-right" :size="20" />
                    Jugar de Nuevo
                </button>
            </div>
        </div>

        <!-- Pause Screen -->
        <div v-if="isPaused && gameStarted && !gameOver" class="pause-overlay">
            <div class="pause-content">
                <h2>⏸️ PAUSA ⏸️</h2>
                <p>Presiona P para continuar</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import IconComponent from '@/components/icons/IconComponents.vue'

const gameCanvas = ref(null)
const nextPieceCanvas = ref(null)
const canvasWidth = 300
const canvasHeight = 600
const cols = 10
const rows = 20
const cellSize = canvasWidth / cols

let ctx = null
let nextCtx = null
let gameLoop = null

const score = ref(0)
const highScore = ref(0)
const gameOver = ref(false)
const gameStarted = ref(false)
const isNewRecord = ref(false)
const level = ref(1)
const linesCleared = ref(0)
const isPaused = ref(false)

// Game board
let board = []

// Current piece
let currentPiece = null
let currentX = 0
let currentY = 0

// Next piece
let nextPiece = null

// Tetromino shapes
const SHAPES = {
    I: {
        shape: [[1, 1, 1, 1]],
        color: '#00f0f0'
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        color: '#f0f000'
    },
    T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1]
        ],
        color: '#a000f0'
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0]
        ],
        color: '#00f000'
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1]
        ],
        color: '#f00000'
    },
    J: {
        shape: [
            [1, 0, 0],
            [1, 1, 1]
        ],
        color: '#0000f0'
    },
    L: {
        shape: [
            [0, 0, 1],
            [1, 1, 1]
        ],
        color: '#f0a000'
    }
}

const SHAPE_NAMES = Object.keys(SHAPES)

// Nivel y velocidad
const getDropSpeed = (lvl) => {
    const speeds = {
        1: 800,
        2: 650,
        3: 500,
        4: 400,
        5: 300,
        6: 250,
        7: 200,
        8: 150,
        9: 100,
        10: 80
    }
    return speeds[Math.min(lvl, 10)] || 60
}

const getLevelName = (lvl) => {
    if (lvl === 1) return 'Principiante'
    if (lvl <= 3) return 'Intermedio'
    if (lvl <= 6) return 'Avanzado'
    return 'Experto'
}

const initGame = () => {
    if (!gameCanvas.value || !nextPieceCanvas.value) return
    
    ctx = gameCanvas.value.getContext('2d')
    nextCtx = nextPieceCanvas.value.getContext('2d')
    
    // Load high score
    const saved = localStorage.getItem('tetris-high-score')
    if (saved) {
        highScore.value = parseInt(saved)
    }
    
    resetGame()
}

const resetGame = () => {
    // Reset board
    board = Array(rows).fill().map(() => Array(cols).fill(0))
    
    // Reset game state
    score.value = 0
    level.value = 1
    linesCleared.value = 0
    gameOver.value = false
    isNewRecord.value = false
    isPaused.value = false
    
    // Generate first pieces
    nextPiece = getRandomPiece()
    spawnNewPiece()
    
    drawNextPiece()
}

const startGame = () => {
    gameStarted.value = true
    gameLoop = setInterval(gameStep, getDropSpeed(level.value))
}

const restartGame = () => {
    resetGame()
    gameLoop = setInterval(gameStep, getDropSpeed(level.value))
}

const getRandomPiece = () => {
    const shapeName = SHAPE_NAMES[Math.floor(Math.random() * SHAPE_NAMES.length)]
    return {
        shape: JSON.parse(JSON.stringify(SHAPES[shapeName].shape)),
        color: SHAPES[shapeName].color
    }
}

const spawnNewPiece = () => {
    currentPiece = nextPiece
    nextPiece = getRandomPiece()
    
    currentX = Math.floor(cols / 2) - Math.floor(currentPiece.shape[0].length / 2)
    currentY = 0
    
    // Check game over
    if (collision(currentX, currentY, currentPiece.shape)) {
        endGame()
    }
    
    drawNextPiece()
}

const collision = (x, y, shape) => {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                const newX = x + col
                const newY = y + row
                
                // Check boundaries
                if (newX < 0 || newX >= cols || newY >= rows) {
                    return true
                }
                
                // Check board collision
                if (newY >= 0 && board[newY][newX]) {
                    return true
                }
            }
        }
    }
    return false
}

const merge = () => {
    for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
            if (currentPiece.shape[row][col]) {
                const newY = currentY + row
                const newX = currentX + col
                if (newY >= 0) {
                    board[newY][newX] = currentPiece.color
                }
            }
        }
    }
}

const clearLines = () => {
    let lines = 0
    
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1)
            board.unshift(Array(cols).fill(0))
            lines++
            row++ // Check same row again
        }
    }
    
    if (lines > 0) {
        linesCleared.value += lines
        
        // Scoring system
        const points = {
            1: 100,
            2: 300,
            3: 500,
            4: 800
        }
        
        score.value += points[lines] * level.value
        
        // Level up every 10 lines
        const newLevel = Math.floor(linesCleared.value / 10) + 1
        if (newLevel > level.value) {
            level.value = newLevel
            clearInterval(gameLoop)
            gameLoop = setInterval(gameStep, getDropSpeed(level.value))
        }
    }
}

const rotate = () => {
    const rotated = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
    )
    
    if (!collision(currentX, currentY, rotated)) {
        currentPiece.shape = rotated
    } else {
        // Try wall kicks
        const kicks = [1, -1, 2, -2]
        for (const kick of kicks) {
            if (!collision(currentX + kick, currentY, rotated)) {
                currentX += kick
                currentPiece.shape = rotated
                break
            }
        }
    }
}

const moveDown = () => {
    if (!collision(currentX, currentY + 1, currentPiece.shape)) {
        currentY++
    } else {
        merge()
        clearLines()
        spawnNewPiece()
    }
}

const moveLeft = () => {
    if (!collision(currentX - 1, currentY, currentPiece.shape)) {
        currentX--
    }
}

const moveRight = () => {
    if (!collision(currentX + 1, currentY, currentPiece.shape)) {
        currentX++
    }
}

const hardDrop = () => {
    while (!collision(currentX, currentY + 1, currentPiece.shape)) {
        currentY++
        score.value += 2 // Bonus points for hard drop
    }
    merge()
    clearLines()
    spawnNewPiece()
}

const gameStep = () => {
    if (isPaused.value || gameOver.value) return
    moveDown()
    draw()
}

const draw = () => {
    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    // Draw grid
    ctx.strokeStyle = '#222'
    ctx.lineWidth = 1
    for (let row = 0; row <= rows; row++) {
        ctx.beginPath()
        ctx.moveTo(0, row * cellSize)
        ctx.lineTo(canvasWidth, row * cellSize)
        ctx.stroke()
    }
    for (let col = 0; col <= cols; col++) {
        ctx.beginPath()
        ctx.moveTo(col * cellSize, 0)
        ctx.lineTo(col * cellSize, canvasHeight)
        ctx.stroke()
    }
    
    // Draw board
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col]) {
                ctx.fillStyle = board[row][col]
                ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2)
                
                // Add shine effect
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
                ctx.fillRect(col * cellSize + 2, row * cellSize + 2, cellSize - 4, 4)
            }
        }
    }
    
    // Draw current piece
    if (currentPiece) {
        ctx.fillStyle = currentPiece.color
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    const x = (currentX + col) * cellSize
                    const y = (currentY + row) * cellSize
                    ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
                    
                    // Add shine effect
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
                    ctx.fillRect(x + 2, y + 2, cellSize - 4, 4)
                    ctx.fillStyle = currentPiece.color
                }
            }
        }
        
        // Draw ghost piece (preview)
        let ghostY = currentY
        while (!collision(currentX, ghostY + 1, currentPiece.shape)) {
            ghostY++
        }
        
        ctx.fillStyle = currentPiece.color
        ctx.globalAlpha = 0.2
        for (let row = 0; row < currentPiece.shape.length; row++) {
            for (let col = 0; col < currentPiece.shape[row].length; col++) {
                if (currentPiece.shape[row][col]) {
                    const x = (currentX + col) * cellSize
                    const y = (ghostY + row) * cellSize
                    ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
                }
            }
        }
        ctx.globalAlpha = 1.0
    }
}

const drawNextPiece = () => {
    if (!nextCtx || !nextPiece) return
    
    // Clear canvas
    nextCtx.fillStyle = '#000'
    nextCtx.fillRect(0, 0, 120, 120)
    
    const pieceSize = 20
    const offsetX = (120 - nextPiece.shape[0].length * pieceSize) / 2
    const offsetY = (120 - nextPiece.shape.length * pieceSize) / 2
    
    nextCtx.fillStyle = nextPiece.color
    for (let row = 0; row < nextPiece.shape.length; row++) {
        for (let col = 0; col < nextPiece.shape[row].length; col++) {
            if (nextPiece.shape[row][col]) {
                nextCtx.fillRect(
                    offsetX + col * pieceSize + 1,
                    offsetY + row * pieceSize + 1,
                    pieceSize - 2,
                    pieceSize - 2
                )
                
                // Add shine
                nextCtx.fillStyle = 'rgba(255, 255, 255, 0.3)'
                nextCtx.fillRect(
                    offsetX + col * pieceSize + 2,
                    offsetY + row * pieceSize + 2,
                    pieceSize - 4,
                    3
                )
                nextCtx.fillStyle = nextPiece.color
            }
        }
    }
}

const endGame = () => {
    gameOver.value = true
    clearInterval(gameLoop)
    
    if (score.value > highScore.value) {
        highScore.value = score.value
        isNewRecord.value = true
        localStorage.setItem('tetris-high-score', highScore.value.toString())
    }
}

const togglePause = () => {
    if (!gameStarted.value || gameOver.value) return
    
    isPaused.value = !isPaused.value
}

const handleKeyPress = (event) => {
    if (!gameStarted.value || gameOver.value) {
        if (event.key === 'Enter' || event.key === ' ') {
            if (!gameStarted.value) {
                startGame()
            } else {
                restartGame()
            }
        }
        return
    }
    
    if (event.key === 'p' || event.key === 'P') {
        togglePause()
        return
    }
    
    if (isPaused.value) return
    
    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault()
            moveLeft()
            draw()
            break
        case 'ArrowRight':
            event.preventDefault()
            moveRight()
            draw()
            break
        case 'ArrowDown':
            event.preventDefault()
            moveDown()
            draw()
            break
        case 'ArrowUp':
            event.preventDefault()
            rotate()
            draw()
            break
        case ' ':
            event.preventDefault()
            hardDrop()
            draw()
            break
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
.tetris-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    position: relative;
}

.game-info {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
}

.score-board {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.score,
.level-display,
.high-score {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.label {
    font-size: 0.9rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.value {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.level-display {
    position: relative;
}

.level-value {
    font-size: 2.5rem;
}

.level-name {
    font-size: 0.8rem;
    color: #f0a000;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

.next-piece-container {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    padding: 1rem;
    border: 2px solid rgba(102, 126, 234, 0.3);
}

.next-piece-container h3 {
    color: white;
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

canvas {
    border: 3px solid #667eea;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.5),
                0 0 60px rgba(118, 75, 162, 0.3);
    display: block;
}

.game-over-overlay,
.start-overlay,
.pause-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
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
}

.game-over-content h2,
.start-content h2,
.pause-content h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.start-content p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}

.level-info-list {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    text-align: left;
    max-width: 500px;
}

.level-info-list p {
    margin-bottom: 0.5rem;
}

.level-info-list ul {
    list-style: none;
    padding-left: 1rem;
}

.level-info-list li {
    margin: 0.3rem 0;
    color: #94a3b8;
}

.final-score,
.level-reached,
.lines-cleared {
    font-size: 1.2rem;
    margin: 0.5rem 0;
}

.new-record {
    font-size: 1.5rem;
    color: #f0a000;
    animation: pulse 1s infinite;
    margin: 1rem 0;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

.restart-btn,
.start-btn {
    margin-top: 1.5rem;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
}

.restart-btn:hover,
.start-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.5);
}

.controls-info {
    margin-top: 1.5rem;
    color: #94a3b8;
    font-size: 0.9rem;
}

.controls-info p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 0.5rem 0;
}

.controls-info svg {
    color: #667eea;
    transition: transform 0.2s ease;
}

.controls-info svg:hover {
    transform: scale(1.2);
    color: #764ba2;
}

.pause-content h2 {
    font-size: 3rem;
    animation: pulse 2s infinite;
}

/* Responsive */
@media (max-width: 768px) {
    .tetris-game {
        padding: 1rem;
        gap: 1rem;
    }

    canvas {
        max-width: 100%;
        height: auto;
    }

    .score-board {
        gap: 1rem;
    }

    .value {
        font-size: 1.5rem;
    }

    .level-value {
        font-size: 2rem;
    }

    .game-info {
        gap: 1rem;
    }

    .next-piece-container {
        padding: 0.75rem;
    }

    .level-info-list {
        font-size: 0.9rem;
        padding: 1rem;
    }

    .controls-info {
        font-size: 0.8rem;
    }
}
</style>
