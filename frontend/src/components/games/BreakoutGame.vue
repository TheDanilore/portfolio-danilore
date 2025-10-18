<template>
    <div class="breakout-game">
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
                <div class="lives-display">
                    <span class="label">Vidas</span>
                    <div class="hearts">
                        <span v-for="n in lives" :key="n" class="heart">❤️</span>
                    </div>
                </div>
                <div class="high-score">
                    <span class="label">Récord</span>
                    <span class="value">{{ highScore }}</span>
                </div>
            </div>
        </div>

        <canvas ref="gameCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>

        <!-- Start Screen -->
        <div v-if="!gameStarted" class="start-overlay">
            <div class="start-content">
                <h2>🎮 BREAKOUT 🎮</h2>
                <p>¡Destruye todos los bloques con la pelota!</p>
                
                <div class="level-info-list">
                    <p><strong>Cómo Jugar:</strong></p>
                    <ul>
                        <li>Mueve la paleta con las flechas ← →</li>
                        <li>Destruye todos los bloques para pasar de nivel</li>
                        <li>No dejes que la pelota caiga</li>
                        <li>Recoge power-ups especiales</li>
                    </ul>
                    <p><strong>Power-Ups:</strong></p>
                    <ul>
                        <li>🔵 Azul: Paleta más ancha</li>
                        <li>🔴 Rojo: Bola más rápida</li>
                        <li>🟢 Verde: Bola más lenta</li>
                        <li>🟡 Amarillo: Vida extra</li>
                        <li>🟣 Morado: Multi-bola</li>
                    </ul>
                    <p><strong>Puntuación:</strong></p>
                    <ul>
                        <li>Bloque normal: 10 puntos</li>
                        <li>Bloque resistente: 20 puntos</li>
                        <li>Destruir todos los bloques: 500 × nivel</li>
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
                        Mover Paleta | ESPACIO: Lanzar Bola | P: Pausar
                    </p>
                </div>
            </div>
        </div>

        <!-- Game Over Screen -->
        <div v-if="gameOver" class="game-over-overlay">
            <div class="game-over-content">
                <h2>🎮 GAME OVER 🎮</h2>
                <p class="final-score">Puntuación Final: <strong>{{ score }}</strong></p>
                <p class="level-reached">Nivel Alcanzado: <strong>{{ level }}</strong></p>
                <p class="blocks-destroyed">Bloques Destruidos: <strong>{{ totalBlocksDestroyed }}</strong></p>
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

        <!-- Level Complete Screen -->
        <div v-if="levelComplete" class="level-complete-overlay">
            <div class="level-complete-content">
                <h2>🎉 ¡NIVEL COMPLETADO! 🎉</h2>
                <p class="bonus-score">Bonus: <strong>{{ levelBonus }}</strong> puntos</p>
                <p>Preparándose para el nivel {{ level + 1 }}...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import IconComponent from '@/components/icons/IconComponents.vue'

const gameCanvas = ref(null)
const canvasWidth = 800
const canvasHeight = 600
let ctx = null
let gameLoop = null

const score = ref(0)
const highScore = ref(0)
const gameOver = ref(false)
const gameStarted = ref(false)
const isNewRecord = ref(false)
const level = ref(1)
const lives = ref(3)
const isPaused = ref(false)
const levelComplete = ref(false)
const levelBonus = ref(0)
const totalBlocksDestroyed = ref(0)

// Paddle
let paddle = {
    x: 0,
    y: 0,
    width: 100,
    height: 15,
    speed: 8,
    dx: 0
}

// Ball
let balls = []
const ballRadius = 8
const initialBallSpeed = 4

// Blocks
let blocks = []
const blockRowCount = 5
const blockColumnCount = 10
const blockWidth = 70
const blockHeight = 20
const blockPadding = 10
const blockOffsetTop = 60
const blockOffsetLeft = 35

// Power-ups
let powerUps = []
const powerUpTypes = [
    { type: 'wide', color: '#00f0f0', emoji: '🔵' },
    { type: 'fast', color: '#f00000', emoji: '🔴' },
    { type: 'slow', color: '#00f000', emoji: '🟢' },
    { type: 'life', color: '#f0f000', emoji: '🟡' },
    { type: 'multi', color: '#a000f0', emoji: '🟣' }
]

// Game state
let ballLaunched = false
let powerUpActive = null
let powerUpTimer = 0

const getLevelName = (lvl) => {
    if (lvl === 1) return 'Principiante'
    if (lvl <= 3) return 'Intermedio'
    if (lvl <= 5) return 'Avanzado'
    if (lvl <= 8) return 'Experto'
    return 'Maestro'
}

const initGame = () => {
    if (!gameCanvas.value) return
    
    ctx = gameCanvas.value.getContext('2d')
    
    // Load high score
    const saved = localStorage.getItem('breakout-high-score')
    if (saved) {
        highScore.value = parseInt(saved)
    }
    
    resetGame()
}

const resetGame = () => {
    // Reset paddle
    paddle.x = (canvasWidth - paddle.width) / 2
    paddle.y = canvasHeight - 30
    paddle.width = 100
    paddle.dx = 0
    
    // Reset ball
    balls = [{
        x: canvasWidth / 2,
        y: paddle.y - ballRadius,
        dx: 0,
        dy: 0,
        speed: initialBallSpeed
    }]
    
    ballLaunched = false
    
    // Reset game state
    score.value = 0
    level.value = 1
    lives.value = 3
    gameOver.value = false
    isNewRecord.value = false
    isPaused.value = false
    levelComplete.value = false
    totalBlocksDestroyed.value = 0
    powerUpActive = null
    powerUpTimer = 0
    powerUps = []
    
    createBlocks()
}

const createBlocks = () => {
    blocks = []
    const colors = [
        '#f00000', // Red
        '#f0a000', // Orange
        '#f0f000', // Yellow
        '#00f000', // Green
        '#0000f0', // Blue
        '#a000f0'  // Purple
    ]
    
    for (let row = 0; row < Math.min(blockRowCount + Math.floor(level.value / 2), 8); row++) {
        blocks[row] = []
        for (let col = 0; col < blockColumnCount; col++) {
            const hits = Math.random() < 0.2 ? 2 : 1 // 20% chance of 2-hit blocks
            blocks[row][col] = {
                x: col * (blockWidth + blockPadding) + blockOffsetLeft,
                y: row * (blockHeight + blockPadding) + blockOffsetTop,
                width: blockWidth,
                height: blockHeight,
                hits: hits,
                maxHits: hits,
                color: colors[row % colors.length],
                visible: true
            }
        }
    }
}

const startGame = () => {
    gameStarted.value = true
    gameLoop = requestAnimationFrame(update)
}

const restartGame = () => {
    resetGame()
    gameLoop = requestAnimationFrame(update)
}

const launchBall = () => {
    if (!ballLaunched) {
        ballLaunched = true
        balls[0].dx = initialBallSpeed * (Math.random() > 0.5 ? 1 : -1)
        balls[0].dy = -initialBallSpeed
    }
}

const movePaddle = () => {
    paddle.x += paddle.dx
    
    // Wall collision
    if (paddle.x < 0) paddle.x = 0
    if (paddle.x + paddle.width > canvasWidth) {
        paddle.x = canvasWidth - paddle.width
    }
}

const moveBalls = () => {
    balls.forEach((ball, index) => {
        if (!ballLaunched && index === 0) {
            // Ball follows paddle before launch
            ball.x = paddle.x + paddle.width / 2
            ball.y = paddle.y - ballRadius
        } else {
            ball.x += ball.dx
            ball.y += ball.dy
            
            // Wall collision
            if (ball.x + ballRadius > canvasWidth || ball.x - ballRadius < 0) {
                ball.dx *= -1
            }
            
            // Top collision
            if (ball.y - ballRadius < 0) {
                ball.dy *= -1
            }
            
            // Paddle collision
            if (
                ball.y + ballRadius > paddle.y &&
                ball.y - ballRadius < paddle.y + paddle.height &&
                ball.x > paddle.x &&
                ball.x < paddle.x + paddle.width
            ) {
                // Calculate hit position on paddle (-1 to 1)
                const hitPos = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2)
                ball.dx = hitPos * ball.speed * 1.5
                ball.dy = -Math.abs(ball.dy)
            }
            
            // Bottom collision (lose life)
            if (ball.y + ballRadius > canvasHeight) {
                balls.splice(index, 1)
                
                if (balls.length === 0) {
                    lives.value--
                    if (lives.value <= 0) {
                        endGame()
                    } else {
                        resetBall()
                    }
                }
            }
        }
    })
}

const resetBall = () => {
    balls = [{
        x: canvasWidth / 2,
        y: paddle.y - ballRadius,
        dx: 0,
        dy: 0,
        speed: initialBallSpeed
    }]
    ballLaunched = false
    paddle.width = 100
    powerUpActive = null
}

const checkBlockCollision = () => {
    balls.forEach(ball => {
        blocks.forEach(row => {
            row.forEach(block => {
                if (block.visible) {
                    if (
                        ball.x + ballRadius > block.x &&
                        ball.x - ballRadius < block.x + block.width &&
                        ball.y + ballRadius > block.y &&
                        ball.y - ballRadius < block.y + block.height
                    ) {
                        ball.dy *= -1
                        block.hits--
                        
                        if (block.hits <= 0) {
                            block.visible = false
                            score.value += block.maxHits === 2 ? 20 : 10
                            totalBlocksDestroyed.value++
                            
                            // Random power-up drop (10% chance)
                            if (Math.random() < 0.1) {
                                spawnPowerUp(block.x + block.width / 2, block.y + block.height)
                            }
                        }
                    }
                }
            })
        })
    })
    
    // Check if all blocks destroyed
    const allDestroyed = blocks.every(row => row.every(block => !block.visible))
    if (allDestroyed) {
        completLevel()
    }
}

const spawnPowerUp = (x, y) => {
    const powerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
    powerUps.push({
        x: x,
        y: y,
        width: 30,
        height: 30,
        type: powerUp.type,
        color: powerUp.color,
        emoji: powerUp.emoji,
        dy: 2
    })
}

const movePowerUps = () => {
    powerUps.forEach((powerUp, index) => {
        powerUp.y += powerUp.dy
        
        // Paddle collision
        if (
            powerUp.y + powerUp.height > paddle.y &&
            powerUp.y < paddle.y + paddle.height &&
            powerUp.x + powerUp.width > paddle.x &&
            powerUp.x < paddle.x + paddle.width
        ) {
            activatePowerUp(powerUp.type)
            powerUps.splice(index, 1)
        }
        
        // Remove if out of bounds
        if (powerUp.y > canvasHeight) {
            powerUps.splice(index, 1)
        }
    })
}

const activatePowerUp = (type) => {
    switch (type) {
        case 'wide':
            paddle.width = 150
            powerUpActive = 'wide'
            powerUpTimer = 300 // 5 seconds at 60fps
            break
        case 'fast':
            balls.forEach(ball => {
                ball.speed = initialBallSpeed * 1.5
                ball.dx *= 1.5
                ball.dy *= 1.5
            })
            powerUpActive = 'fast'
            powerUpTimer = 300
            break
        case 'slow':
            balls.forEach(ball => {
                ball.speed = initialBallSpeed * 0.7
                ball.dx *= 0.7
                ball.dy *= 0.7
            })
            powerUpActive = 'slow'
            powerUpTimer = 300
            break
        case 'life':
            lives.value++
            break
        case 'multi':
            if (balls.length === 1) {
                const mainBall = balls[0]
                balls.push({
                    x: mainBall.x,
                    y: mainBall.y,
                    dx: mainBall.dx * 0.7,
                    dy: mainBall.dy,
                    speed: mainBall.speed
                })
                balls.push({
                    x: mainBall.x,
                    y: mainBall.y,
                    dx: mainBall.dx * 1.3,
                    dy: mainBall.dy,
                    speed: mainBall.speed
                })
            }
            break
    }
}

const updatePowerUps = () => {
    if (powerUpTimer > 0) {
        powerUpTimer--
        if (powerUpTimer === 0) {
            // Deactivate power-up
            if (powerUpActive === 'wide') {
                paddle.width = 100
            } else if (powerUpActive === 'fast' || powerUpActive === 'slow') {
                balls.forEach(ball => {
                    ball.speed = initialBallSpeed
                    const magnitude = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy)
                    ball.dx = (ball.dx / magnitude) * ball.speed
                    ball.dy = (ball.dy / magnitude) * ball.speed
                })
            }
            powerUpActive = null
        }
    }
}

const completLevel = () => {
    levelComplete.value = true
    levelBonus.value = 500 * level.value
    score.value += levelBonus.value
    
    setTimeout(() => {
        level.value++
        levelComplete.value = false
        createBlocks()
        resetBall()
    }, 2000)
}

const update = () => {
    if (isPaused.value || gameOver.value || levelComplete.value) {
        gameLoop = requestAnimationFrame(update)
        return
    }
    
    movePaddle()
    moveBalls()
    checkBlockCollision()
    movePowerUps()
    updatePowerUps()
    draw()
    
    gameLoop = requestAnimationFrame(update)
}

const draw = () => {
    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    // Draw blocks
    blocks.forEach(row => {
        row.forEach(block => {
            if (block.visible) {
                const opacity = block.hits / block.maxHits
                ctx.fillStyle = block.color
                ctx.globalAlpha = opacity
                ctx.fillRect(block.x, block.y, block.width, block.height)
                
                // Border
                ctx.strokeStyle = '#fff'
                ctx.lineWidth = 2
                ctx.strokeRect(block.x, block.y, block.width, block.height)
                
                // Shine effect
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
                ctx.fillRect(block.x, block.y, block.width, 5)
                
                ctx.globalAlpha = 1
            }
        })
    })
    
    // Draw paddle
    const gradient = ctx.createLinearGradient(paddle.x, paddle.y, paddle.x, paddle.y + paddle.height)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    ctx.fillStyle = gradient
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
    
    // Paddle shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.fillRect(paddle.x, paddle.y, paddle.width, 5)
    
    // Draw balls
    balls.forEach(ball => {
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2)
        const ballGradient = ctx.createRadialGradient(ball.x - 3, ball.y - 3, 0, ball.x, ball.y, ballRadius)
        ballGradient.addColorStop(0, '#fff')
        ballGradient.addColorStop(1, '#f0a000')
        ctx.fillStyle = ballGradient
        ctx.fill()
        ctx.closePath()
    })
    
    // Draw power-ups
    powerUps.forEach(powerUp => {
        ctx.fillStyle = powerUp.color
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height)
        ctx.font = '20px Arial'
        ctx.fillText(powerUp.emoji, powerUp.x + 5, powerUp.y + 22)
    })
    
    // Draw power-up indicator
    if (powerUpActive) {
        ctx.fillStyle = '#fff'
        ctx.font = '16px Arial'
        ctx.fillText(`Power-Up: ${powerUpActive.toUpperCase()} (${Math.ceil(powerUpTimer / 60)}s)`, 10, canvasHeight - 10)
    }
}

const endGame = () => {
    gameOver.value = true
    cancelAnimationFrame(gameLoop)
    
    if (score.value > highScore.value) {
        highScore.value = score.value
        isNewRecord.value = true
        localStorage.setItem('breakout-high-score', highScore.value.toString())
    }
}

const togglePause = () => {
    if (!gameStarted.value || gameOver.value) return
    isPaused.value = !isPaused.value
}

const handleKeyDown = (event) => {
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
            paddle.dx = -paddle.speed
            break
        case 'ArrowRight':
            event.preventDefault()
            paddle.dx = paddle.speed
            break
        case ' ':
            event.preventDefault()
            launchBall()
            break
    }
}

const handleKeyUp = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        paddle.dx = 0
    }
}

onMounted(() => {
    initGame()
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
    cancelAnimationFrame(gameLoop)
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
})
</script>

<style scoped>
.breakout-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    position: relative;
}

.game-info {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.score-board {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.score,
.level-display,
.lives-display,
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

.hearts {
    display: flex;
    gap: 0.3rem;
    font-size: 1.5rem;
}

.heart {
    animation: heartbeat 1s infinite;
}

@keyframes heartbeat {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

canvas {
    border: 3px solid #667eea;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.5),
                0 0 60px rgba(118, 75, 162, 0.3);
    display: block;
    background: #000;
}

.game-over-overlay,
.start-overlay,
.pause-overlay,
.level-complete-overlay {
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
.pause-content,
.level-complete-content {
    text-align: center;
    color: white;
    padding: 2rem;
}

.game-over-content h2,
.start-content h2,
.pause-content h2,
.level-complete-content h2 {
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
.blocks-destroyed,
.bonus-score {
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
}

.pause-content h2 {
    font-size: 3rem;
    animation: pulse 2s infinite;
}

/* Responsive */
@media (max-width: 768px) {
    .breakout-game {
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

    .level-info-list {
        font-size: 0.9rem;
        padding: 1rem;
    }

    .controls-info {
        font-size: 0.8rem;
    }
}
</style>
