<script setup>
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const props = defineProps({
  result: { type: Object, default: null },
})

const isSuccess = computed(() => props.result?.status >= 200 && props.result?.status < 300)
</script>

<template>
  <Card class="min-w-0">
    <CardHeader>
      <CardTitle class="flex items-center justify-between gap-2">
        Response
        <Badge v-if="result" :variant="isSuccess ? 'default' : 'destructive'">
          {{ result.status ?? 'Network error' }}
        </Badge>
      </CardTitle>
      <CardDescription>
        <code class="font-mono">{{ result?.request ?? 'No request sent yet' }}</code>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <pre
        v-if="result"
        class="max-h-[28rem] overflow-auto rounded-md bg-muted p-4 font-mono text-xs"
        >{{ result.data }}</pre>
      <p v-else class="text-sm text-muted-foreground">
        Use the actions on this page and the response will show up here.
      </p>
    </CardContent>
  </Card>
</template>
