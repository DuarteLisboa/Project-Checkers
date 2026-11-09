import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_WS_URL)

export const useSocketStore = defineStore('socket', () => {
  const isConnected = ref(socket.connected)
  const currentUser = ref(null)
  const users = ref([])
  const messages = ref([])
  const unread = ref({})
  const selectedUserId = ref(null)

  const otherUsers = computed(() => {
    return users.value.filter((user) => user.id !== currentUser.value?.id)
  })

  const selectedUser = computed(() => {
    return otherUsers.value.find((user) => user.id === selectedUserId.value)
  })

  const conversation = computed(() => {
    return messages.value.filter(
      (message) => message.from.id === selectedUserId.value || message.to === selectedUserId.value,
    )
  })

  socket.on('connect', () => {
    isConnected.value = true
    // The server forgets us when the connection drops, so we log in again
    if (currentUser.value) {
      socket.emit('login', currentUser.value)
    }
  })

  socket.on('disconnect', () => {
    isConnected.value = false
    users.value = []
  })

  socket.on('users', (onlineUsers) => {
    users.value = onlineUsers
  })

  socket.on('chat-message', (message) => {
    messages.value.push(message)

    const senderId = message.from.id
    if (senderId !== currentUser.value?.id && senderId !== selectedUserId.value) {
      unread.value[senderId] = (unread.value[senderId] ?? 0) + 1
    }
  })

  function clearChat() {
    messages.value = []
    unread.value = {}
    selectedUserId.value = null
  }

  function login(user) {
    clearChat()
    currentUser.value = user
    socket.emit('login', user)
  }

  function logout() {
    socket.emit('logout')
    clearChat()
    currentUser.value = null
    users.value = []
  }

  function selectUser(userId) {
    selectedUserId.value = userId
    delete unread.value[userId]
  }

  function sendMessage(text) {
    socket.emit('chat-message', { to: selectedUserId.value, text })
  }

  return {
    isConnected,
    currentUser,
    otherUsers,
    selectedUser,
    conversation,
    unread,
    login,
    logout,
    selectUser,
    sendMessage,
  }
})
