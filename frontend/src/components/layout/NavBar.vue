<script setup>
import { Badge } from '@/components/ui/badge'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <header class="border-b bg-background">
    <nav class="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
      <RouterLink to="/" class="text-lg font-semibold">DAD Intermediate Submission</RouterLink>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Testing</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="w-44">
                <li>
                  <NavigationMenuLink as-child>
                    <RouterLink to="/laravel">Laravel Test</RouterLink>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <RouterLink to="/websockets">WebSockets Test</RouterLink>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Badge class="ml-auto" :variant="authStore.isLoggedIn ? 'default' : 'secondary'">
        {{ authStore.isLoggedIn ? authStore.user.name : 'Logged out' }}
      </Badge>
    </nav>
  </header>
</template>
