<template>
  <Transition name="fade">
    <button v-if="isVisible" @click="scrollToTop" class="back-to-top" aria-label="Volver arriba">
      <IconComponent name="arrow-up" :size="20" />
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import IconComponent from '../icons/IconComponents.vue'

const isVisible = ref(false)
const { y: scrollY } = useWindowScroll()

const handleScroll = () => {
  isVisible.value = scrollY.value > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
