import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './views/HomePage.vue'
import SurveyPage from './views/SurveyPage.vue'
import CampaignsPage from './views/CampaignsPage.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/avaliacao', component: SurveyPage },
    { path: '/campanhas', component: CampaignsPage },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

createApp(App).use(router).mount('#app')
