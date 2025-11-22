<script setup lang="ts">
import { LazyModalConfirm } from '#components'

const route = useRoute()
const toast = useToast()
const overlay = useOverlay()
const { loggedIn, openInPopup } = useUserSession()

const open = ref(false)

const deleteModal = overlay.create(LazyModalConfirm, {
  props: {
    title: 'Delete chat',
    description: 'Are you sure you want to delete this chat? This cannot be undone.'
  }
})

const { data: chats, refresh: refreshChats } = await useFetch('/api/chats', {
  key: 'chats',
  transform: data => data.map(chat => ({
    id: chat.id,
    label: chat.title || 'Untitled',
    to: `/chat/${chat.id}`,
    icon: 'i-lucide-message-circle',
    createdAt: chat.createdAt
  }))
})

onNuxtReady(async () => {
  const first10 = (chats.value || []).slice(0, 10)
  for (const chat of first10) {
    // prefetch the chat and let the browser cache it
    await $fetch(`/api/chats/${chat.id}`)
  }
})

watch(loggedIn, () => {
  refreshChats()

  open.value = false
})

const { groups } = useChats(chats)

const items = computed(() => groups.value?.flatMap((group) => {
  return [{
    label: group.label,
    type: 'label' as const
  }, ...group.items.map(item => ({
    ...item,
    slot: 'chat' as const,
    icon: undefined,
    class: item.label === 'Untitled' ? 'text-muted' : ''
  }))]
}))

async function deleteChat(id: string) {
  const instance = deleteModal.open()
  const result = await instance.result
  if (!result) {
    return
  }

  await $fetch(`/api/chats/${id}`, { method: 'DELETE' })

  toast.add({
    title: 'Chat deleted',
    description: 'Your chat has been deleted',
    icon: 'i-lucide-trash'
  })

  refreshChats()

  if (route.params.id === id) {
    navigateTo('/chat')
  }
}

async function deleteChatsAll() {
  const instance = deleteModal.open()
  const result = await instance.result
  if (!result) {
    return
  }

  // @ts-expect-error - DELETE method is valid but type definitions are restrictive
  await $fetch(`/api/chats`, { method: 'DELETE' })

  toast.add({
    title: 'All Chats deleted',
    description: 'All your chats has been deleted',
    icon: 'i-lucide-trash'
  })

  refreshChats()

  navigateTo('/chat')
}

defineShortcuts({
  c: () => {
    navigateTo('/chat')
  }
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      :min-size="22"
      :default-size="22"
      collapsible
      resizable
      class="bg-(--ui-bg-elevated)/50"
    >
      <template #header="{ collapsed }">
        <div v-if="!collapsed" class="flex items-center gap-1.5 ms-auto">
          <LogoAndHeader />
          <UDashboardSearchButton collapsed />
          <UDashboardSidebarCollapse />
        </div>
      </template>

      <template #default="{ collapsed }">
        <div class="flex flex-col gap-1.5">
          <UButton
            v-bind="collapsed ? { icon: 'i-lucide-plus' } : { label: 'New chat' }"
            variant="soft"
            block
            to="/chat"
            @click="open = false"
          />

          <template v-if="collapsed">
            <UDashboardSearchButton collapsed />
            <UDashboardSidebarCollapse />
          </template>
        </div>

        <UNavigationMenu
          v-if="!collapsed"
          :items="items"
          :collapsed="collapsed"
          orientation="vertical"
          :ui="{ link: 'overflow-hidden' }"
        >
          <template #chat-trailing="{ item }">
            <div class="flex -mr-1.25 translate-x-full group-hover:translate-x-0 transition-transform">
              <UButton
                icon="i-lucide-x"
                color="neutral"
                variant="ghost"
                size="xs"
                class="text-(--ui-text-muted) hover:text-(--ui-primary) hover:bg-(--ui-bg-accented)/50 focus-visible:bg-(--ui-bg-accented)/50 p-0.5"
                tabindex="-1"
                @click.stop.prevent="deleteChat((item as any).id)"
              />
            </div>
          </template>
        </UNavigationMenu>
        <UButton
          v-if="items.length > 0"
          icon="i-lucide-x"
          color="warning"
          variant="ghost"
          size="xs"
          label="Delete all chats"

          tabindex="-1"
          @click.stop.prevent="deleteChatsAll()"
        />
        <USeparator v-if="!collapsed" class="pt-8" />

        <UContainer v-if="!collapsed">
          This entire Chat app is from <ULink to="https://github.com/nuxt-ui-pro/chat">Nuxt UI Pro Chat</ULink>.

          Its the amazing work of <ULink to="https://github.com/benjamincanac" target="_blank">
            <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />Benjamin Canac</ULink> and <ULink to="https://github.com/Atinux" target="_blank">
            <UAvatar src="https://github.com/atinux.png" alt="Sébastien Chopin" />Sébastien Chopin</ULink>.
        </UContainer>
      </template>

      <template #footer="{ collapsed }">
        <UserMenu v-if="loggedIn" :collapsed="collapsed" :block="true" />
        <UButton
          v-if="!loggedIn"
          :label="collapsed ? '' : 'Login with GitHub'"
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          class="w-full"
          @click="openInPopup('/auth/github')"
        />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch
      placeholder="Search chats..."
      :groups="[{
        id: 'links',
        items: [{
          label: 'New chat',
          to: '/chat',
          icon: 'i-lucide-square-pen'
        }]
      }, ...groups]"
    />

    <slot />
  </UDashboardGroup>
</template>
