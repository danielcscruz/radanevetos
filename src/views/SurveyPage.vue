<script setup>
import { computed, ref } from 'vue'
import { Check, ChevronLeft, LockKeyhole, Send, Star } from 'lucide-vue-next'

// Crie este access key no painel do Web3Forms usando o e-mail danielcscruz@gmail.com
const WEB3FORMS_ACCESS_KEY = 'SEU_ACCESS_KEY_WEB3FORMS_AQUI'
const categories = ['Infraestrutura e limpeza do local', 'Atendimento e suporte da equipe', 'Localização e acesso', 'Experiência geral do evento']
const ratings = ref({})
const form = ref({ name: '', contact: '', message: '' })
const captchaAnswer = ref('')
const submitted = ref(false)
const isSubmitting = ref(false)
const submissionError = ref('')
const captcha = { a: 4, b: 7 }
const captchaValid = computed(() => Number(captchaAnswer.value) === captcha.a + captcha.b)
const formValid = computed(() => categories.every((_, index) => ratings.value[index]) && captchaValid.value && form.value.contact.trim().length > 3)

function setRating(category, rating) {
  ratings.value[category] = rating
}

function buildSurveySummary() {
  const scoreLines = categories
    .map((category, index) => `${category}: ${ratings.value[index] || 0}/5`)
    .join('\n')

  return [
    `Nome: ${form.value.name || 'Não informado'}`,
    `Contato: ${form.value.contact}`,
    '',
    'Avaliação:',
    scoreLines,
    '',
    'Mensagem:',
    form.value.message || 'Sem mensagem adicional.'
  ].join('\n')
}

async function submitForm() {
  if (!formValid.value) return

  isSubmitting.value = true
  submissionError.value = ''

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: form.value.name || 'Avaliação do Sítio Radan',
        email: form.value.contact,
        subject: 'Nova avaliação do Sítio Radan',
        message: buildSurveySummary(),
        from_name: 'Formulário de avaliação',
      }),
    })

    const data = await response.json()

    if (!response.ok || data.success !== true) {
      throw new Error(data.message || 'Não foi possível enviar a avaliação.')
    }

    submitted.value = true
  } catch (error) {
    submissionError.value = error instanceof Error ? error.message : 'Erro ao enviar a avaliação.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="survey-page page-width section-pad">
    <RouterLink to="/" class="back-link"><ChevronLeft :size="16" /> Voltar ao sítio</RouterLink>
    <div class="survey-intro"><div class="section-kicker">Sua experiência</div><h1>Pesquisa de<br /><em>satisfação</em></h1><p>Sua opinião é fundamental para mantermos a excelência do nosso espaço em Barreiras - BA.</p></div>
    <div v-if="submitted" class="success-panel"><div class="success-icon"><Check :size="30" /></div><div><p class="section-kicker">Recebemos sua avaliação</p><h2>Obrigado por compartilhar.</h2><p>Seu olhar nos ajuda a cuidar ainda melhor de cada detalhe do Sítio Radan.</p><RouterLink to="/" class="text-link">Voltar para o início <ChevronLeft :size="16" /></RouterLink></div></div>
    <form v-else class="survey-form" @submit.prevent="submitForm"><div class="rating-panel"><div class="form-heading"><span>01</span><div><h2>Como foi sua experiência?</h2><p>Conte para nós como podemos continuar criando momentos especiais.</p></div></div><fieldset v-for="(category, index) in categories" :key="category"><legend>{{ category }}</legend><div class="stars" role="radiogroup" :aria-label="category"><button v-for="star in 5" :key="star" type="button" :class="{ selected: star <= (ratings[index] || 0) }" :aria-label="`${star} estrelas`" @click="setRating(index, star)"><Star :size="23" :fill="star <= (ratings[index] || 0) ? 'currentColor' : 'none'" /></button></div><span class="rating-label">{{ ratings[index] ? `${ratings[index]} de 5 estrelas` : 'Selecione uma nota' }}</span></fieldset></div><div class="details-panel"><div class="form-heading"><span>02</span><div><h2>Mais alguns detalhes</h2><p>Opcionalmente, deixe uma mensagem para a nossa equipe.</p></div></div><label>Nome completo <span>opcional</span><input v-model="form.name" name="name" type="text" placeholder="Como podemos chamar você?" /></label><label>E-mail ou telefone <span>obrigatório</span><input v-model="form.contact" name="email" required type="text" placeholder="Para um possível retorno" /></label><label>Mensagem <span>opcional</span><textarea v-model="form.message" name="message" rows="5" placeholder="Dúvidas, críticas, elogios e/ou sugestões"></textarea></label><div class="captcha-box"><div class="captcha-check" :class="{ valid: captchaValid }"><Check v-if="captchaValid" :size="17" /></div><div><strong>Confirme que você é uma pessoa</strong><span>Resolva para enviar sua avaliação</span><div class="captcha-question">Quanto é <b>{{ captcha.a }} + {{ captcha.b }}</b>? <input v-model="captchaAnswer" type="number" aria-label="Resposta do desafio" /></div></div><LockKeyhole :size="17" /></div><button class="button button-dark submit-button" type="submit" :disabled="!formValid || isSubmitting">{{ isSubmitting ? 'Enviando...' : 'Enviar avaliação' }} <Send :size="16" /></button><p v-if="submissionError" class="error-message">{{ submissionError }}</p><p class="form-note">Seus dados são tratados com respeito e não serão compartilhados.</p></div></form>
  </div>
</template>
