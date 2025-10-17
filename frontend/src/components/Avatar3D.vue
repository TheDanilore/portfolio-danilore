<template>
  <div class="avatar-3d-container">
    <div ref="avatarCanvas" class="avatar-canvas"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const avatarCanvas = ref(null)

// 🎭 CONFIGURA AQUÍ LA URL DE TU AVATAR
const AVATAR_URL = 'https://models.readyplayer.me/68f1ede706dff28ec928b1af.glb'

let scene, camera, renderer, controls
let avatar, particles
let animationId

const initThreeJS = () => {
  if (!avatarCanvas.value) return

  // Escena
  scene = new THREE.Scene()
  
  // Cámara (FOV más pequeño = avatar más grande)
  camera = new THREE.PerspectiveCamera(
    50, // FOV optimizado para mejor visualización
    avatarCanvas.value.clientWidth / avatarCanvas.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 2 // Cámara más cerca para mejor encuadre

  // Renderer
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true 
  })
  renderer.setSize(avatarCanvas.value.clientWidth, avatarCanvas.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  avatarCanvas.value.appendChild(renderer.domElement)

  // Controles (ajustados para el nuevo tamaño)
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = true
  controls.enablePan = false
  controls.minDistance = 1
  controls.maxDistance = 3
  controls.autoRotate = true // ✅ Auto-rotación activada
  controls.autoRotateSpeed = 0.5 // Velocidad de rotación

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  const pointLight1 = new THREE.PointLight(0x667eea, 1, 100)
  pointLight1.position.set(-3, 2, 3)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0xf093fb, 1, 100)
  pointLight2.position.set(3, -2, 3)
  scene.add(pointLight2)

  // Cargar avatar desde Ready Player Me
  loadReadyPlayerMeAvatar()

  // Crear partículas de fondo
  createParticles()

  // Animación
  animate()
}

// Cargar modelo GLB de Ready Player Me
const loadReadyPlayerMeAvatar = () => {
  const loader = new GLTFLoader()
  
  loader.load(
    AVATAR_URL,
    (gltf) => {
      // Avatar cargado exitosamente
      avatar = gltf.scene
      
      // 🎯 Ajustar posición y escala (OPTIMIZADO para mejor visualización)
      avatar.position.set(0, -1, 0) // Centrado vertical optimizado
      avatar.scale.set(1, 1, 1) // Escala real del modelo
      
      // Agregar iluminación especial al avatar
      avatar.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          
          // Mejorar materiales para mejor visualización
          if (child.material) {
            child.material.needsUpdate = true
          }
        }
      })
      
      scene.add(avatar)
      console.log('✅ Avatar de Ready Player Me cargado correctamente')
      console.log('📏 Escala: 1x | Posición Y: -1 | Cámara Z: 1.5 | FOV: 50°')
    },
    (progress) => {
      // Progreso de carga
      const percent = (progress.loaded / progress.total) * 100
      console.log(`Cargando avatar: ${percent.toFixed(0)}%`)
    },
    (error) => {
      console.error('❌ Error cargando avatar de Ready Player Me:', error)
      console.error('Verifica que la URL sea correcta y que tengas conexión a internet')
    }
  )
}

const createParticles = () => {
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 1000
  const posArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x667eea,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  })

  particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  // Animar partículas de fondo
  if (particles) {
    particles.rotation.y += 0.0005
  }

  // Actualizar controles
  controls.update()

  // Renderizar escena
  renderer.render(scene, camera)
}

const handleResize = () => {
  if (!avatarCanvas.value || !camera || !renderer) return

  camera.aspect = avatarCanvas.value.clientWidth / avatarCanvas.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(avatarCanvas.value.clientWidth, avatarCanvas.value.clientHeight)
}

onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (renderer) {
    renderer.dispose()
  }
  
  if (controls) {
    controls.dispose()
  }
})
</script>

<style scoped>
.avatar-3d-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.avatar-canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
}

.avatar-canvas:active {
  cursor: grabbing;
}

/* Responsive */
@media (max-width: 768px) {
  .avatar-3d-container {
    min-height: 300px;
  }
}
</style>
