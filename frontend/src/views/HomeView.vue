<template>
  <div class="home">
    <HeaderNav />
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <CertificationsSection />
    <ServicesSection />
    <ContactSection />
    <FooterSection />
    <BackToTop />
  </div>
</template>
<script setup>
import HeaderNav from '../components/layout/HeaderNav.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'
import SkillsSection from '../components/sections/SkillsSection.vue'
import CertificationsSection from '../components/sections/CertificationsSection.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import FooterSection from '../components/layout/FooterSection.vue'
import BackToTop from '../components/ui/BackToTop.vue'
</script>

<style scoped>
.home {
  width: 100%;
  overflow-x: hidden;
}
</style>
