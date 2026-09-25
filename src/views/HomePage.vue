<script setup>
import { computed, onMounted, ref } from 'vue'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import heroImage from '../assets/photos/hero.jpg'
import foto1 from '../assets/photos/foto1.jpeg'
import foto2 from '../assets/photos/foto2.jpeg'
import foto3 from '../assets/photos/foto3.jpeg'

const slides = [foto1, foto2, foto3]
const activeIndex = ref(0)
const whatsappUrl = 'https://wa.me/5571999575989?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20a%20disponibilidade%20do%20S%C3%ADtio%20Radan%20para%20um%20evento.'

const activeSlide = computed(() => slides[activeIndex.value])

function nextSlide() {
  activeIndex.value = (activeIndex.value + 1) % slides.length
}

function prevSlide() {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length
}

onMounted(() => {
  const interval = window.setInterval(nextSlide, 4000)
  return () => window.clearInterval(interval)
})
</script>

<template>
  <section class="hero" aria-label="Apresentação do Sítio Radan">
    <div class="hero-slide active" :style="{ backgroundImage: `url(${heroImage})` }"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content page-width">
      <p class="eyebrow light">Barreiras, Bahia</p>
      <h1>Inesquecível<br /><em>por natureza.</em></h1>
      <p class="hero-description">Um espaço de eventos onde o verde do Cerrado encontra a beleza dos seus melhores dias.</p>
      <div class="hero-actions">
        <a :href="whatsappUrl" target="_blank" rel="noopener" class="button button-gold">Falar com a equipe <ArrowUpRight :size="17" /></a>
        <a href="#sobre" class="text-link light-link">Conhecer o sítio <ArrowDown :size="16" /></a>
      </div>
    </div>
    <div class="scroll-note"><span></span> role para explorar</div>
  </section>

  <section id="sobre" class="minimal-about page-width section-pad">
    <div class="minimal-copy">
      <p class="section-kicker">O sítio</p>
      <h2>Um lugar para<br /><em>viver o momento.</em></h2>
      <p>Um espaço aberto, cercado pelo verde de Barreiras, para celebrar com calma e presença.</p>
      <a :href="whatsappUrl" target="_blank" rel="noopener" class="text-link">Consultar disponibilidade <ArrowUpRight :size="16" /></a>
    </div>
    <div class="minimal-image carousel" aria-label="Galeria de fotos do Sítio Radan">
      <img :src="activeSlide" :alt="`Foto do Sítio Radan ${activeIndex + 1}`" />
      <div class="carousel-controls">
        <button type="button" class="carousel-button" aria-label="Foto anterior" @click="prevSlide">
          <ArrowLeft :size="16" />
        </button>
        <div class="carousel-dots" aria-label="Seleção de fotos">
          <span v-for="(slide, index) in slides" :key="slide" :class="['dot', { active: index === activeIndex }]" />
        </div>
        <button type="button" class="carousel-button" aria-label="Próxima foto" @click="nextSlide">
          <ArrowRight :size="16" />
        </button>
      </div>
    </div>
  </section>

  <section id="contato" class="minimal-contact">
    <div class="page-width minimal-contact-inner">
      <h2>Seu momento<br /><em>começa aqui.</em></h2>
      <a :href="whatsappUrl" target="_blank" rel="noopener" class="button button-outline">Falar pelo WhatsApp <ArrowUpRight :size="17" /></a>
    </div>
  </section>
</template>
