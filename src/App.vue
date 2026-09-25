<script setup>
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <SiteHeader />
  <main><RouterView /></main>

  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <p>Um lugar para celebrar o que importa.</p>
      </div>
      <div>
        <p class="footer-label">Instagram</p>
        <a href="https://instagram.com/sitioradan" target="_blank" rel="noopener" aria-label="Instagram do Sítio Radan">@sitioradan ↗</a>
      </div>
    </div>
    <div class="footer-bottom"><span>© 2026 Sítio Radan</span><span>Barreiras, Bahia</span></div>
  </footer>
</template>
