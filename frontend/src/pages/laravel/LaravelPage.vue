<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import ResponseCard from '@/components/auth/ResponseCard.vue'
import SessionCard from '@/components/auth/SessionCard.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const apiUrl = import.meta.env.VITE_API_URL ?? 'not defined'

const result = ref(null)
const isLoading = ref(false)

const send = async (request, action) => {
  isLoading.value = true
  try {
    const response = await action()
    result.value = { request, status: response.status, data: response.data }
  } catch (error) {
    result.value = {
      request,
      status: error.response?.status,
      data: error.response?.data ?? error.message,
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="mb-6">
    <h2 class="text-2xl font-semibold">Laravel Test</h2>
    <p class="text-sm text-muted-foreground">
      API: <code class="font-mono">{{ apiUrl }}</code>
    </p>
  </div>
  <div class="grid items-start gap-6 lg:grid-cols-2">
    <div class="space-y-6">
      <LoginForm
        :disabled="isLoading"
        @login="(credentials) => send('POST /api/login', () => authStore.login(credentials))"
      />
      <SessionCard
        :disabled="isLoading"
        @fetch-user="send('GET /api/users/me', authStore.fetchUser)"
        @logout="send('POST /api/logout', authStore.logout)"
      />
    </div>
    <ResponseCard :result="result" />
  </div>
</template>
