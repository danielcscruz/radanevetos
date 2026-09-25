<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
import campaigns from '../data/campaigns.json'
</script>

<template>
  <section class="campaigns-page page-width section-pad">
    <div class="campaigns-header">
      <p class="section-kicker"></p>
      <h1>Campanhas</h1>
    </div>

    <div class="campaigns-list">
      <article v-for="campaign in campaigns" :key="campaign.title" class="campaign-card">
        <div class="campaign-topline">
          <span class="campaign-badge">{{ campaign.season }}</span>
          <span :class="['campaign-status', campaign.status.replace(/\s+/g, '-')]">{{ campaign.status }}</span>
        </div>



        <h2>{{ campaign.title }}</h2>
        <p class="campaign-description">{{ campaign.description }}</p>


        <a v-if="campaign.termsUrl" :href="campaign.termsUrl" target="_blank" rel="noopener" class="campaign-terms">
          Termos e condições <ArrowUpRight :size="15" />
        </a>

        <a href="https://instagram.com/sitioradan" target="_blank" rel="noopener" class="button button-outline">
          {{ campaign.cta }} <ArrowUpRight :size="17" />
        </a>
      </article>
    </div>
  </section>
</template>
