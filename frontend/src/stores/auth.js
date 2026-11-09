import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useSocketStore } from './socket'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
})

export const useAuthStore = defineStore('auth', () => {
  const socketStore = useSocketStore()

  const token = ref(null)
  const user = ref(null)

  const isLoggedIn = computed(() => token.value !== null)

  function clearSession() {
    token.value = null
    user.value = null
    delete api.defaults.headers.common.Authorization
  }

  async function login(credentials) {
    const response = await api.post('/login', credentials)
    token.value = response.data.token
    user.value = response.data.user
    api.defaults.headers.common.Authorization = `Bearer ${token.value}`
    socketStore.login(user.value)
    return response
  }

  async function logout() {
    const response = await api.post('/logout')
    clearSession()
    socketStore.logout()
    return response
  }

  async function fetchUser() {
    const response = await api.get('/users/me')
    user.value = response.data
    return response
  }

  return { token, user, isLoggedIn, login, logout, fetchUser }
})
