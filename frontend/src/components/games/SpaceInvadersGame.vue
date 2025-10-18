<template>
    <div class="space-invaders-game">
        <div class="game-info">
            <div class="score-board">
                <div class="score">
                    <span class="label">Puntuación</span>
                    <span class="value">{{ score }}</span>
                </div>
                <div class="level-display">
                    <span class="label">Nivel</span>
                    <span class="value">{{ level }}</span>
                </div>
                <div class="high-score">
                    <span class="label">Récord</span>
                    <span class="value">{{ highScore }}</span>
                </div>
                <div class="lives">
                    <span class="label">Vidas</span>
                    <span class="lives-icons">
                        <span v-for="n in lives" :key="n" class="life-icon">🚀</span>
                    </span>
                </div>
            </div>
        </div>

        <canvas ref="gameCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>

        <!-- Start Overlay -->
        <div v-if="!gameStarted && !gameOver" class="start-overlay">
            <div class="start-content">
                <h2>👾 SPACE INVADERS</h2>
                <p>¡Defiende la Tierra de la invasión alienígena!</p>
                <div class="game-instructions">
                    <h3>Cómo Jugar:</h3>
                    <ul>
                        <li>🎯 Dispara a todos los aliens antes de que lleguen abajo</li>
                        <li>💥 Algunos aliens requieren varios disparos</li>
                        <li>🛡️ Usa las barricadas como protección</li>
                        <li>🎁 Recoge power-ups especiales</li>
                        <li>👾 Cuidado con el jefe alien</li>
                    </ul>
                    <h3>Power-Ups:</h3>
                    <ul>
                        <li>⚡ Disparo Rápido - Aumenta tu velocidad de disparo</li>
                        <li>💥 Triple Shot - Dispara 3 balas a la vez</li>
                        <li>🛡️ Escudo - Te protege de un impacto</li>
                    </ul>
                </div>
                <button class="start-btn" @click="startGame">
                    <IconComponent name="play" />
                    Iniciar Juego
                </button>
                <div class="controls-info">
                    <p><strong>←</strong> <strong>→</strong> = Mover | <strong>ESPACIO</strong> = Disparar</p>
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
                    <p>Nivel: {{ level }}</p>
                    <p>Vidas: {{ lives }}</p>
                </div>
                <button @click="togglePause" class="resume-btn">
                    <IconComponent name="play" />
                    Continuar
                </button>
                <div class="controls-info">
                    <p>Presiona <strong>P</strong> o <strong>ESC</strong> para continuar</p>
                </div>
            </div>
        </div>

        <!-- Game Over Overlay -->
        <div v-if="gameOver" class="game-over-overlay">
            <div class="game-over-content">
                <h2>{{ victory ? '🎉 ¡VICTORIA!' : '💥 GAME OVER' }}</h2>
                <div class="final-score">Puntuación Final: {{ score }}</div>
                <div class="level-reached">Nivel Alcanzado: {{ level }}</div>
                <div v-if="isNewRecord" class="new-record">🏆 ¡Nuevo Récord! 🏆</div>
                <button @click="restartGame" class="restart-btn">
                    <IconComponent name="arrow-right" :size="20" />
                    Jugar de Nuevo
                </button>
                <div class="controls-info">
                    <p>Presiona <strong>ESPACIO</strong> para reiniciar</p>
                </div>
            </div>
        </div>

        <div class="controls-info-bottom">
            <p>
                <strong>←</strong> <strong>→</strong> = Mover | 
                <strong>ESPACIO</strong> = Disparar | 
                <strong>P</strong> = Pausa
            </p>
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
const isPaused = ref(false)
const isNewRecord = ref(false)
const level = ref(1)
const lives = ref(3)
const victory = ref(false)

// Player
let player = {
    x: 0,
    y: 0,
    width: 50,
    height: 30,
    speed: 5,
    hasShield: false
}

// Bullets
let bullets = []
const bulletSpeed = 7
let canShoot = true
let shootCooldown = 500
let tripleShot = false
let tripleShotTimer = 0

// Aliens
let aliens = []
let alienBullets = []
const alienRows = 5
const alienCols = 10
let alienDirection = 1
let alienSpeed = 1
let alienDropSpeed = 20

// Barricades
let barricades = []

// Power-ups
let powerUps = []

const initGame = () => {
    ctx = gameCanvas.value.getContext('2d')
    player.x = canvasWidth / 2 - player.width / 2
    player.y = canvasHeight - 60

    // Cargar high score
    const saved = localStorage.getItem('spaceInvadersHighScore')
    if (saved) {
        highScore.value = parseInt(saved)
    }

    draw()
}

const resetGame = () => {
    score.value = 0
    level.value = 1
    lives.value = 3
    gameOver.value = false
    victory.value = false
    isNewRecord.value = false
    isPaused.value = false
    player.x = canvasWidth / 2 - player.width / 2
    player.hasShield = false
    bullets = []
    alienBullets = []
    powerUps = []
    tripleShot = false
    tripleShotTimer = 0
    alienSpeed = 1
    
    createAliens()
    createBarricades()
}

const startGame = () => {
    resetGame()
    gameStarted.value = true
    gameLoop = setInterval(update, 1000 / 60)
}

const restartGame = () => {
    resetGame()
    gameLoop = setInterval(update, 1000 / 60)
}

const togglePause = () => {
    if (!gameStarted.value || gameOver.value) return
    isPaused.value = !isPaused.value
}

const createAliens = () => {
    aliens = []
    const startX = 50
    const startY = 50
    const spacing = 60

    for (let row = 0; row < alienRows; row++) {
        for (let col = 0; col < alienCols; col++) {
            aliens.push({
                x: startX + col * spacing,
                y: startY + row * spacing,
                width: 40,
                height: 30,
                alive: true,
                type: row === 0 ? 'boss' : row < 3 ? 'medium' : 'small',
                hits: row === 0 ? 3 : row < 3 ? 2 : 1,
                maxHits: row === 0 ? 3 : row < 3 ? 2 : 1
            })
        }
    }
}

const createBarricades = () => {
    barricades = []
    const barricadeY = canvasHeight - 150
    const spacing = canvasWidth / 5

    for (let i = 0; i < 4; i++) {
        barricades.push({
            x: spacing * (i + 0.5),
            y: barricadeY,
            width: 80,
            height: 20,
            health: 10
        })
    }
}

const update = () => {
    if (gameOver.value || isPaused.value) return

    // Update triple shot timer
    if (tripleShot && tripleShotTimer > 0) {
        tripleShotTimer--
        if (tripleShotTimer <= 0) {
            tripleShot = false
        }
    }

    // Move bullets
    bullets = bullets.filter(bullet => {
        bullet.y -= bulletSpeed
        return bullet.y > 0
    })

    // Move alien bullets
    alienBullets = alienBullets.filter(bullet => {
        bullet.y += 4
        return bullet.y < canvasHeight
    })

    // Move aliens
    let shouldDrop = false
    for (const alien of aliens) {
        if (!alien.alive) continue
        
        alien.x += alienDirection * alienSpeed
        
        if (alien.x <= 0 || alien.x + alien.width >= canvasWidth) {
            shouldDrop = true
        }
    }

    if (shouldDrop) {
        alienDirection *= -1
        aliens.forEach(alien => {
            if (alien.alive) alien.y += alienDropSpeed
        })
    }

    // Aliens shoot randomly
    if (Math.random() < 0.01) {
        const aliveAliens = aliens.filter(a => a.alive)
        if (aliveAliens.length > 0) {
            const shooter = aliveAliens[Math.floor(Math.random() * aliveAliens.length)]
            alienBullets.push({
                x: shooter.x + shooter.width / 2,
                y: shooter.y + shooter.height,
                width: 5,
                height: 15
            })
        }
    }

    // Check bullet collisions with aliens
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i]
        for (const alien of aliens) {
            if (!alien.alive) continue
            
            if (bullet.x > alien.x && bullet.x < alien.x + alien.width &&
                bullet.y > alien.y && bullet.y < alien.y + alien.height) {
                bullets.splice(i, 1)
                alien.hits--
                
                if (alien.hits <= 0) {
                    alien.alive = false
                    score.value += alien.type === 'boss' ? 50 : alien.type === 'medium' ? 20 : 10
                    
                    // Spawn power-up randomly
                    if (Math.random() < 0.15) {
                        const powerUpTypes = ['speed', 'triple', 'shield']
                        powerUps.push({
                            x: alien.x,
                            y: alien.y,
                            width: 30,
                            height: 30,
                            type: powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)],
                            velocity: 2
                        })
                    }
                }
                break
            }
        }
    }

    // Check alien bullet collisions with player
    for (let i = alienBullets.length - 1; i >= 0; i--) {
        const bullet = alienBullets[i]
        if (bullet.x > player.x && bullet.x < player.x + player.width &&
            bullet.y > player.y && bullet.y < player.y + player.height) {
            alienBullets.splice(i, 1)
            
            if (player.hasShield) {
                player.hasShield = false
            } else {
                lives.value--
                if (lives.value <= 0) {
                    endGame()
                }
            }
        }
    }

    // Check bullet collisions with barricades
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i]
        for (const barricade of barricades) {
            if (barricade.health <= 0) continue
            
            if (bullet.x > barricade.x && bullet.x < barricade.x + barricade.width &&
                bullet.y > barricade.y && bullet.y < barricade.y + barricade.height) {
                bullets.splice(i, 1)
                break
            }
        }
    }

    // Check alien bullet collisions with barricades
    for (let i = alienBullets.length - 1; i >= 0; i--) {
        const bullet = alienBullets[i]
        for (const barricade of barricades) {
            if (barricade.health <= 0) continue
            
            if (bullet.x > barricade.x && bullet.x < barricade.x + barricade.width &&
                bullet.y > barricade.y && bullet.y < barricade.y + barricade.height) {
                alienBullets.splice(i, 1)
                barricade.health--
                break
            }
        }
    }

    // Move and collect power-ups
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i]
        powerUp.y += powerUp.velocity
        
        // Check collision with player
        if (powerUp.x > player.x && powerUp.x < player.x + player.width &&
            powerUp.y > player.y && powerUp.y < player.y + player.height) {
            activatePowerUp(powerUp.type)
            powerUps.splice(i, 1)
        } else if (powerUp.y > canvasHeight) {
            powerUps.splice(i, 1)
        }
    }

    // Check if aliens reached bottom
    for (const alien of aliens) {
        if (alien.alive && alien.y + alien.height >= player.y) {
            endGame()
            return
        }
    }

    // Check if all aliens defeated
    if (aliens.every(a => !a.alive)) {
        nextLevel()
    }

    draw()
}

const activatePowerUp = (type) => {
    switch (type) {
        case 'speed':
            shootCooldown = 200
            setTimeout(() => {
                shootCooldown = 500
            }, 10000)
            break
        case 'triple':
            tripleShot = true
            tripleShotTimer = 600 // 10 seconds at 60fps
            break
        case 'shield':
            player.hasShield = true
            break
    }
}

const nextLevel = () => {
    level.value++
    alienSpeed += 0.3
    score.value += 100 * level.value
    
    createAliens()
    createBarricades()
    bullets = []
    alienBullets = []
}

const shoot = () => {
    if (!canShoot || !gameStarted.value || gameOver.value || isPaused.value) return
    
    canShoot = false
    
    if (tripleShot) {
        bullets.push({
            x: player.x + player.width / 2 - 10,
            y: player.y,
            width: 5,
            height: 15
        })
        bullets.push({
            x: player.x + player.width / 2,
            y: player.y,
            width: 5,
            height: 15
        })
        bullets.push({
            x: player.x + player.width / 2 + 10,
            y: player.y,
            width: 5,
            height: 15
        })
    } else {
        bullets.push({
            x: player.x + player.width / 2,
            y: player.y,
            width: 5,
            height: 15
        })
    }
    
    setTimeout(() => {
        canShoot = true
    }, shootCooldown)
}

const draw = () => {
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // Draw stars background
    ctx.fillStyle = 'white'
    for (let i = 0; i < 100; i++) {
        const x = (i * 123) % canvasWidth
        const y = (i * 456) % canvasHeight
        ctx.fillRect(x, y, 2, 2)
    }

    // Draw player
    ctx.fillStyle = player.hasShield ? '#00ffff' : '#00ff00'
    ctx.fillRect(player.x, player.y, player.width, player.height)
    
    // Draw player cockpit
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(player.x + player.width / 2 - 5, player.y + 5, 10, 10)
    
    if (player.hasShield) {
        ctx.strokeStyle = '#00ffff'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(player.x + player.width / 2, player.y + player.height / 2, 35, 0, Math.PI * 2)
        ctx.stroke()
    }

    // Draw bullets
    ctx.fillStyle = '#ffff00'
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
    })

    // Draw alien bullets
    ctx.fillStyle = '#ff0000'
    alienBullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
    })

    // Draw aliens
    aliens.forEach(alien => {
        if (!alien.alive) return
        
        // Color based on hits remaining
        if (alien.hits === alien.maxHits) {
            ctx.fillStyle = alien.type === 'boss' ? '#ff00ff' : alien.type === 'medium' ? '#ff8800' : '#ff0000'
        } else {
            ctx.fillStyle = alien.type === 'boss' ? '#cc00cc' : alien.type === 'medium' ? '#cc6600' : '#cc0000'
        }
        
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height)
        
        // Draw alien eyes
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(alien.x + 8, alien.y + 8, 8, 8)
        ctx.fillRect(alien.x + alien.width - 16, alien.y + 8, 8, 8)
    })

    // Draw barricades
    barricades.forEach(barricade => {
        if (barricade.health <= 0) return
        
        const healthPercent = barricade.health / 10
        ctx.fillStyle = `rgba(0, 255, 0, ${healthPercent})`
        ctx.fillRect(barricade.x, barricade.y, barricade.width, barricade.height)
    })

    // Draw power-ups
    powerUps.forEach(powerUp => {
        ctx.fillStyle = powerUp.type === 'speed' ? '#ffff00' : powerUp.type === 'triple' ? '#ff00ff' : '#00ffff'
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height)
        
        // Draw power-up symbol
        ctx.fillStyle = '#ffffff'
        ctx.font = '20px Arial'
        ctx.textAlign = 'center'
        const symbol = powerUp.type === 'speed' ? '⚡' : powerUp.type === 'triple' ? '💥' : '🛡️'
        ctx.fillText(symbol, powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2 + 7)
    })

    // Draw triple shot indicator
    if (tripleShot) {
        ctx.fillStyle = '#ff00ff'
        ctx.font = '16px Arial'
        ctx.textAlign = 'left'
        ctx.fillText(`Triple Shot: ${Math.ceil(tripleShotTimer / 60)}s`, 10, canvasHeight - 20)
    }
}

const endGame = () => {
    gameOver.value = true
    clearInterval(gameLoop)
    
    if (score.value > highScore.value) {
        highScore.value = score.value
        isNewRecord.value = true
        localStorage.setItem('spaceInvadersHighScore', highScore.value.toString())
    }
}

const handleKeyPress = (event) => {
    // Handle start
    if (!gameStarted.value && event.code === 'Space') {
        event.preventDefault()
        startGame()
        return
    }

    // Handle pause
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

    if (!gameStarted.value || gameOver.value || isPaused.value) return

    // Shoot
    if (event.code === 'Space') {
        event.preventDefault()
        shoot()
    }
}

const handleKeyDown = (event) => {
    if (!gameStarted.value || gameOver.value || isPaused.value) return

    if (event.key === 'ArrowLeft') {
        player.x = Math.max(0, player.x - player.speed)
    } else if (event.key === 'ArrowRight') {
        player.x = Math.min(canvasWidth - player.width, player.x + player.speed)
    }
}

onMounted(() => {
    initGame()
    window.addEventListener('keypress', handleKeyPress)
    window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    clearInterval(gameLoop)
    window.removeEventListener('keypress', handleKeyPress)
    window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.space-invaders-game {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%);
    position: relative;
    overflow: hidden;
}

.game-info {
    width: 100%;
    max-width: 800px;
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
    gap: 1rem;
}

.score,
.level-display,
.high-score,
.lives {
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
    font-size: 1.8rem;
    font-weight: 700;
    font-family: 'Courier New', monospace;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.lives-icons {
    display: flex;
    gap: 0.3rem;
    font-size: 1.5rem;
}

canvas {
    border: 3px solid rgba(102, 126, 234, 0.5);
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
    background: #000;
}

.start-overlay,
.pause-overlay,
.game-over-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.start-content,
.pause-content,
.game-over-content {
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
}

.start-content h2,
.pause-content h2,
.game-over-content h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.game-instructions {
    text-align: left;
    margin: 2rem auto;
    max-width: 500px;
}

.game-instructions h3 {
    color: #667eea;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
}

.game-instructions ul {
    list-style: none;
    padding: 0;
}

.game-instructions li {
    padding: 0.3rem 0;
    color: rgba(255, 255, 255, 0.9);
}

.pause-info {
    margin: 2rem 0;
}

.pause-info p {
    font-size: 1.3rem;
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.9);
}

.final-score,
.level-reached {
    font-size: 1.5rem;
    margin: 1rem 0;
}

.new-record {
    font-size: 1.8rem;
    color: #ffd700;
    margin: 1rem 0;
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

.start-btn,
.resume-btn,
.restart-btn {
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

.start-btn:hover,
.resume-btn:hover,
.restart-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
}

.controls-info,
.controls-info-bottom {
    margin-top: 1rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
}

.controls-info p,
.controls-info-bottom p {
    margin: 0.5rem 0;
}

.controls-info-bottom {
    position: absolute;
    bottom: 1rem;
    color: rgba(255, 255, 255, 0.5);
}

/* Responsive */
@media (max-width: 850px) {
    canvas {
        width: 100%;
        height: auto;
        max-width: 800px;
    }

    .score-board {
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 0.8rem 1rem;
    }

    .value {
        font-size: 1.5rem;
    }

    .lives-icons {
        font-size: 1.2rem;
    }
}

@media (max-width: 600px) {
    .game-info {
        padding: 0 0.5rem;
    }

    .score-board {
        padding: 0.5rem;
        gap: 0.3rem;
    }

    .label {
        font-size: 0.75rem;
    }

    .value {
        font-size: 1.2rem;
    }

    .start-content,
    .pause-content,
    .game-over-content {
        padding: 1rem;
    }
}
</style>
