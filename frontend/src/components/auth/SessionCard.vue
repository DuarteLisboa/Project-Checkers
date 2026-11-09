<script setup>
import { computed } from 'vue'
import { LogOutIcon, UserRoundIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/auth'

defineProps({
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['fetch-user', 'logout'])

const authStore = useAuthStore()

const shortToken = computed(() => authStore.token && `${authStore.token.slice(0, 16)}…`)
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Session</CardTitle>
      <CardDescription>
        Both requests stay enabled when logged out, so you can see the 401 response.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <dl class="space-y-2 text-sm">
        <div class="flex justify-between gap-4">
          <dt class="text-muted-foreground">User</dt>
          <dd class="truncate font-medium">{{ authStore.user?.name ?? '—' }}</dd>
        </div>
        <div class="flex justify-between gap-4">
          <dt class="text-muted-foreground">Email</dt>
          <dd class="truncate font-medium">{{ authStore.user?.email ?? '—' }}</dd>
        </div>
        <div class="flex justify-between gap-4">
          <dt class="text-muted-foreground">Token</dt>
          <dd class="truncate font-mono">{{ shortToken ?? '—' }}</dd>
        </div>
      </dl>
      <div class="grid gap-2 sm:grid-cols-2">
        <Button variant="outline" :disabled="disabled" @click="emit('fetch-user')">
          <UserRoundIcon />
          GET /api/users/me
        </Button>
        <Button variant="outline" :disabled="disabled" @click="emit('logout')">
          <LogOutIcon />
          POST /api/logout
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
