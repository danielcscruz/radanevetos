<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowUpRight, Menu, X } from 'lucide-vue-next'

const menuOpen = ref(false)
const isScrolled = ref(false)
const route = useRoute()
const whatsappUrl = 'https://wa.me/5571999575989?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20a%20disponibilidade%20do%20S%C3%ADtio%20Radan%20para%20um%20evento.'
const links = [
  { label: 'O sítio', href: '/#sobre' },
  { label: 'Campanhas', href: '/campanhas' },
  { label: 'Avaliação', href: '/avaliacao' },
]

const darkHeaderRoutes = ['/avaliacao', '/campanhas']
const isDarkHeader = computed(() => darkHeaderRoutes.includes(route.path))

function closeMenu() {
  menuOpen.value = false
}

function updateHeaderState() {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  updateHeaderState()
  window.addEventListener('scroll', updateHeaderState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeaderState)
})
</script>

<template>
  <header class="site-header" :class="{ 'header-dark': isDarkHeader, 'header-scrolled': isScrolled }">
    <div class="header-inner">
      <RouterLink to="/" class="brand brand-header" aria-label="Sítio Radan, início" @click="closeMenu">
        <span class="brand-name">Sítio <strong>Radan</strong></span>
      </RouterLink>

      <button class="menu-toggle" type="button" aria-label="Abrir menu" @click="menuOpen = !menuOpen">
        <X v-if="menuOpen" :size="22" />
        <Menu v-else :size="22" />
      </button>

      <nav class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Navegação principal">
        <a v-for="link in links" :key="link.label" :href="link.href" @click="closeMenu">{{ link.label }}</a>
        <a class="header-cta" :href="whatsappUrl" target="_blank" rel="noopener">
          Reservar <ArrowUpRight :size="16" />
        </a>
      </nav>
    </div>
  </header>
</template>
