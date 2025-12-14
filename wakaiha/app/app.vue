<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'ja'
  }
})

const title = 'AI和解派'
const description = '立場の異なる、対話の通じるもの同士が和解する。2024年、芸術家・吉川飛空によって立ち上がったコミュニティです。'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="font-bold text-lg">
          AI和解派
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          AI和解派 • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <div class="flex gap-2">
          <span class="text-sm text-muted">Discord: 準備中</span>
          <span class="text-sm text-muted">|</span>
          <span class="text-sm text-muted">Wiki: 準備中</span>
        </div>
      </template>
    </UFooter>

    <!-- Fixed Report Button -->
    <ReportButton />
  </UApp>
</template>
