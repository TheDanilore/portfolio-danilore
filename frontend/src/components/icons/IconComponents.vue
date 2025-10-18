<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})
</script>

<template>
  <svg v-if="name === 'github'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
    </path>
  </svg>

  <svg v-else-if="name === 'linkedin'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>

  <svg v-else-if="name === 'email'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>

  <svg v-else-if="name === 'youtube'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path
      d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z">
    </path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>

  <svg v-else-if="name === 'eye'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>

  <svg v-else-if="name === 'code'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>

  <svg v-else-if="name === 'download'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>

  <svg v-else-if="name === 'arrow-up'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>

  <svg v-else-if="name === 'arrow-down'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <polyline points="19 12 12 19 5 12"></polyline>
  </svg>

  <svg v-else-if="name === 'arrow-left'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>

  <svg v-else-if="name === 'arrow-right'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>

  <svg v-else-if="name === 'send'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>

  <svg v-else-if="name === 'sun'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>

  <svg v-else-if="name === 'moon'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>

  <svg v-else-if="name === 'menu'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>

  <svg v-else-if="name === 'close'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>

  <svg v-else-if="name === 'x-exit'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>

  <svg v-else-if="name === 'x'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>

  <svg v-else-if="name === 'server'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>

  <svg v-else-if="name === 'smartphone'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>

  <svg v-else-if="name === 'layout'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>

  <svg v-else-if="name === 'database'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>

  <svg v-else-if="name === 'shopping-cart'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>

  <svg v-else-if="name === 'users'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>

  <svg v-else-if="name === 'message-circle'" :width="size" :height="size" viewBox="0 0 24 24" fill="none"
    :stroke="color" stroke-width="2">
    <path
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">
    </path>
  </svg>

  <svg v-else-if="name === 'link'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>

  <svg v-else-if="name === 'briefcase'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>

  <svg v-else-if="name === 'award'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>

  <svg v-else-if="name === 'check-circle'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>

  <svg v-else-if="name === 'coffee'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
    <line x1="6" y1="1" x2="6" y2="4"></line>
    <line x1="10" y1="1" x2="10" y2="4"></line>
    <line x1="14" y1="1" x2="14" y2="4"></line>
  </svg>

  <svg v-else-if="name === 'book-open'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>

  <svg v-else-if="name === 'globe'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>

  <svg v-else-if="name === 'file-text'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>

  <svg v-else-if="name === 'wifi'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
    <line x1="12" y1="20" x2="12.01" y2="20"></line>
  </svg>

  <svg v-else-if="name === 'zoom-in'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>

  <svg v-else-if="name === 'zoom-out'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>

  <svg v-else-if="name === 'maximize'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>

  <svg v-else-if="name === 'minimize'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
  </svg>

  <svg v-else-if="name === 'refresh-cw'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>

  <svg v-else-if="name === 'calendar'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>

  <svg v-else-if="name === 'gamepad'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"></line>
    <line x1="8" y1="10" x2="8" y2="14"></line>
    <line x1="15" y1="13" x2="15.01" y2="13"></line>
    <line x1="18" y1="11" x2="18.01" y2="11"></line>
    <rect x="2" y="6" width="20" height="12" rx="4"></rect>
  </svg>

  <svg v-else-if="name === 'trophy'" :width="size" :height="size" viewBox="0 0 24 24" fill="none" :stroke="color"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>


</template>
