<script setup>
import { ref } from 'vue'
import { LogInIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

defineProps({
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['login'])

const email = ref('test@example.com')
const password = ref('password')
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription><code class="font-mono">POST /api/login</code></CardDescription>
    </CardHeader>
    <CardContent>
      <form class="space-y-4" @submit.prevent="emit('login', { email, password })">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" autocomplete="username" />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" autocomplete="current-password" />
        </div>
        <Button type="submit" class="w-full" :disabled="disabled">
          <LogInIcon />
          Login
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
