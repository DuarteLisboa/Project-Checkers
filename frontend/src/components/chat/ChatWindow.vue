<script setup>
import { nextTick, ref, watch } from 'vue'
import { SendIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const props = defineProps({
  user: { type: Object, default: undefined },
  messages: { type: Array, required: true },
  currentUserId: { type: Number, required: true },
})

const emit = defineEmits(['send'])

const text = ref('')
const messageList = ref(null)

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const send = () => {
  if (!text.value.trim()) return

  emit('send', text.value.trim())
  text.value = ''
}

watch(
  () => [props.messages.length, props.user?.id],
  async () => {
    await nextTick()
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight
    }
  },
)
</script>

<template>
  <Card class="min-w-0">
    <CardHeader>
      <CardTitle>{{ user?.name ?? 'Chat' }}</CardTitle>
      <CardDescription>
        {{
          user ? 'Messages are only kept until you log out.' : 'Select a user to start chatting.'
        }}
      </CardDescription>
    </CardHeader>
    <CardContent v-if="user" class="space-y-4">
      <div ref="messageList" class="h-80 space-y-2 overflow-y-auto rounded-md bg-muted p-4">
        <p v-if="!messages.length" class="text-sm text-muted-foreground">No messages yet.</p>
        <div
          v-for="message in messages"
          :key="`${message.from.id}-${message.sentAt}`"
          class="flex"
          :class="{ 'justify-end': message.from.id === currentUserId }"
        >
          <div
            class="max-w-[80%] rounded-lg px-3 py-2 text-sm wrap-break-word"
            :class="
              message.from.id === currentUserId
                ? 'bg-primary text-primary-foreground'
                : 'border bg-background'
            "
          >
            <p>{{ message.text }}</p>
            <p class="mt-1 text-xs opacity-70">{{ formatTime(message.sentAt) }}</p>
          </div>
        </div>
      </div>
      <form class="flex gap-2" @submit.prevent="send">
        <Input v-model="text" placeholder="Type a message…" aria-label="Message" />
        <Button type="submit">
          <SendIcon />
          Send
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
