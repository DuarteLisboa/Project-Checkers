<script setup>
import ChatUserList from '@/components/chat/ChatUserList.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSocketStore } from '@/stores/socket'

const socketStore = useSocketStore()

const wsUrl = import.meta.env.VITE_WS_URL ?? 'not defined'
</script>

<template>
  <div class="mb-6 flex items-start justify-between gap-4">
    <div>
      <h2 class="text-2xl font-semibold">WebSockets Test</h2>
      <p class="text-sm text-muted-foreground">
        Server: <code class="font-mono">{{ wsUrl }}</code>
      </p>
    </div>
    <Badge :variant="socketStore.isConnected ? 'default' : 'destructive'">
      {{ socketStore.isConnected ? 'Connected' : 'Disconnected' }}
    </Badge>
  </div>

  <div v-if="socketStore.currentUser" class="grid items-start gap-6 md:grid-cols-[16rem_1fr]">
    <ChatUserList
      :users="socketStore.otherUsers"
      :unread="socketStore.unread"
      :selected-id="socketStore.selectedUser?.id"
      @select="socketStore.selectUser"
    />
    <ChatWindow
      :user="socketStore.selectedUser"
      :messages="socketStore.conversation"
      :current-user-id="socketStore.currentUser.id"
      @send="socketStore.sendMessage"
    />
  </div>

  <Card v-else>
    <CardHeader>
      <CardTitle>Login required</CardTitle>
      <CardDescription>
        Logging in also tells the web socket server who you are, so you can join the chat.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button as-child>
        <RouterLink to="/laravel">Go to Laravel Test</RouterLink>
      </Button>
    </CardContent>
  </Card>
</template>
