<script setup>
defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <RouterLink to="/" class="brand" :class="{ 'brand-dark': dark }" aria-label="Sítio Radan, início">
    <img src="/src/assets/logo.jpeg" alt="Logo Sítio Radan" class="brand-logo" />
    <span class="brand-name">Sítio <strong>Radan</strong></span>
  </RouterLink>
</template>
