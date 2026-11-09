<script setup>
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

defineProps({
  users: { type: Array, required: true },
  unread: { type: Object, required: true },
  selectedId: { type: Number, default: undefined },
})

const emit = defineEmits(['select'])
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Online users</CardTitle>
      <CardDescription>Choose who to chat with.</CardDescription>
    </CardHeader>
    <CardContent>
      <ul v-if="users.length" class="space-y-1">
        <li v-for="user in users" :key="user.id">
          <Button
            class="w-full justify-between"
            :variant="user.id === selectedId ? 'secondary' : 'ghost'"
            @click="emit('select', user.id)"
          >
            <span class="truncate">{{ user.name }}</span>
            <Badge v-if="unread[user.id]">{{ unread[user.id] }}</Badge>
          </Button>
        </li>
      </ul>
      <p v-else class="text-sm text-muted-foreground">Nobody else is online.</p>
    </CardContent>
  </Card>
</template>
