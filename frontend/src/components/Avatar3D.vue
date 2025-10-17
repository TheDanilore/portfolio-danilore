<template>
  <div class="avatar-3d-container">
    <div ref="avatarCanvas" class="avatar-canvas"></div>
    <div class="avatar-controls">
      <p class="control-hint">
        <i class="fas fa-hand-pointer"></i>
        Arrastra para rotar
      </p>
    </div>
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
    45, // Reducido de 75 a 45 para zoom más cercano
    avatarCanvas.value.clientWidth / avatarCanvas.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 2.5 // Más cerca: reducido de 5 a 2.5

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
  controls.minDistance = 1.5 // Ajustado de 3 a 1.5 para permitir acercarse más
  controls.maxDistance = 4 // Ajustado de 8 a 4 para mantener el avatar visible
  controls.autoRotate = true
  controls.autoRotateSpeed = 1.5 // Reducido de 2 a 1.5 para rotación más suave

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
      
      // 🎯 Ajustar posición y escala (AUMENTADO para verse más grande)
      avatar.position.set(0, -1, 0) // Subido de -1.5 a -1 para centrarlo mejor
      avatar.scale.set(2.5, 2.5, 2.5) // Aumentado de 2 a 2.5 (25% más grande)
      
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
      console.log('📏 Escala: 2.5x | Posición Y: -1 | Cámara Z: 2.5')
    },
    (progress) => {
      // Progreso de carga
      const percent = (progress.loaded / progress.total) * 100
      console.log(`Cargando avatar: ${percent.toFixed(0)}%`)
    },
    (error) => {
      console.error('❌ Error cargando avatar:', error)
      // Si falla, crear avatar de respaldo
      createAvatar()
    }
  )
}

const createAvatar = () => {
  avatar = new THREE.Group()

  // Material principal con efecto holográfico
  const material = new THREE.MeshPhongMaterial({
    color: 0x667eea,
    emissive: 0x667eea,
    emissiveIntensity: 0.3,
    shininess: 100,
    transparent: true,
    opacity: 0.9
  })

  // Cabeza
  const headGeometry = new THREE.SphereGeometry(0.8, 32, 32)
  const head = new THREE.Mesh(headGeometry, material)
  head.position.y = 1.5
  avatar.add(head)

  // Ojos
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16)
  
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
  leftEye.position.set(-0.25, 1.6, 0.6)
  avatar.add(leftEye)
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
  rightEye.position.set(0.25, 1.6, 0.6)
  avatar.add(rightEye)

  // Pupilas
  const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
  const pupilGeometry = new THREE.SphereGeometry(0.05, 16, 16)
  
  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial)
  leftPupil.position.set(-0.25, 1.6, 0.65)
  avatar.add(leftPupil)
  
  const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial)
  rightPupil.position.set(0.25, 1.6, 0.65)
  avatar.add(rightPupil)

  // Cuerpo
  const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.7, 1.5, 32)
  const body = new THREE.Mesh(bodyGeometry, material)
  body.position.y = 0
  avatar.add(body)

  // Brazos
  const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 16)
  
  const leftArm = new THREE.Mesh(armGeometry, material)
  leftArm.position.set(-0.85, 0.2, 0)
  leftArm.rotation.z = Math.PI / 8
  avatar.add(leftArm)
  
  const rightArm = new THREE.Mesh(armGeometry, material)
  rightArm.position.set(0.85, 0.2, 0)
  rightArm.rotation.z = -Math.PI / 8
  avatar.add(rightArm)

  // Anillo de energía alrededor
  const ringGeometry = new THREE.TorusGeometry(1.5, 0.05, 16, 100)
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xf093fb,
    transparent: true,
    opacity: 0.6
  })
  const ring = new THREE.Mesh(ringGeometry, ringMaterial)
  ring.rotation.x = Math.PI / 2
  avatar.add(ring)

  // Agregar a la escena
  scene.add(avatar)
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

  // Animar avatar
  if (avatar) {
    avatar.rotation.y += 0.001
    
    // Animación de respiración
    const scale = 1 + Math.sin(Date.now() * 0.002) * 0.02
    avatar.scale.set(scale, scale, scale)
  }

  // Animar partículas
  if (particles) {
    particles.rotation.y += 0.0005
  }

  // Actualizar controles
  controls.update()

  // Renderizar
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

.avatar-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.control-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  animation: hint-fade 3s ease-in-out infinite;
}

@keyframes hint-fade {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.control-hint i {
  font-size: 1.2rem;
  color: #667eea;
}

/* Responsive */
@media (max-width: 768px) {
  .avatar-3d-container {
    min-height: 300px;
  }
  
  .control-hint {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>
