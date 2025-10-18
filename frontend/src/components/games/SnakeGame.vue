<template>
  <div class="snake-game">
    <div class="game-info">
      <div class="score-board">
        <div class="score">
          <span class="label">Puntuación:</span>
          <span class="value">{{ score }}</span>
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
        <p>¡Come la comida y crece!</p>
        <button class="start-btn" @click="startGame">
          <IconComponent name="play" />
          Iniciar Juego
        </button>
      </div>
    </div>

    <div class="controls-info">
      <p>
        <IconComponent name="arrow-up" /> <IconComponent name="arrow-down" />
        <IconComponent name="arrow-left" /> <IconComponent name="arrow-right" />
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

// Snake
let snake = []
let direction = { x: 1, y: 0 }
let nextDirection = { x: 1, y: 0 }

// Food
let food = { x: 0, y: 0 }

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
  gameOver.value = false
  isNewRecord.value = false
  spawnFood()
}

const startGame = () => {
  gameStarted.value = true
  gameOver.value = false
  resetGame()
  gameLoop = setInterval(update, 100)
}

const restartGame = () => {
  startGame()
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
  position: relative;
}

.game-info {
  width: 600px;
  margin-bottom: 1rem;
}

.score-board {
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  border-radius: 15px;
  color: white;
}

.score,
.high-score {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.3rem;
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

canvas {
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
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

.final-score {
  font-size: 1.5rem;
  margin-bottom: 1rem;
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

/* Responsive */
@media (max-width: 768px) {
  .snake-game {
    padding: 1rem;
  }

  .game-info {
    width: 100%;
    max-width: 400px;
  }

  canvas {
    width: 100%;
    max-width: 400px;
    height: auto;
  }

  .score-board {
    padding: 0.8rem 1rem;
  }

  .value {
    font-size: 1.5rem;
  }

  .game-over-content h2,
  .start-content h2 {
    font-size: 2rem;
  }
}
</style>
