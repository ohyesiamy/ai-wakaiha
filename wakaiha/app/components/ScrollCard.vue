<script setup lang="ts">
interface Props {
  variant?: 'outline' | 'soft' | 'subtle' | 'solid'
  gradientFrom?: string
  gradientTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  gradientFrom: 'from-primary-500/20',
  gradientTo: 'to-violet-500/20'
})

const { elementRef, isVisible, scrollProgress } = useScrollAnimation({ threshold: 0.1 })

const gradientOpacity = computed(() => {
  return isVisible.value ? Math.min(1, scrollProgress.value * 2) : 0
})

const gradientPosition = computed(() => {
  return `${scrollProgress.value * 100}%`
})
</script>

<template>
  <div
    ref="elementRef"
    class="scroll-card-wrapper relative"
    :class="{ 'is-visible': isVisible }"
  >
    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-500 overflow-hidden"
      :style="{ opacity: gradientOpacity }"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br"
        :class="[gradientFrom, gradientTo]"
        :style="{
          transform: `translateY(${(1 - scrollProgress) * 20}px)`,
          opacity: gradientOpacity
        }"
      />
      <div
        class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
        :style="{
          backgroundPosition: `${scrollProgress * 100}% ${scrollProgress * 100}%`,
          backgroundSize: '200% 200%'
        }"
      />
    </div>

    <!-- Card content -->
    <UCard
      :variant="variant"
      class="relative z-10 h-full transition-all duration-500"
      :class="{
        'translate-y-0 opacity-100': isVisible,
        'translate-y-8 opacity-0': !isVisible
      }"
      :ui="{
        root: 'backdrop-blur-sm bg-default/80 dark:bg-default/60'
      }"
    >
      <slot />
    </UCard>
  </div>
</template>

<style scoped>
.scroll-card-wrapper {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-card-wrapper.is-visible {
  transform: translateY(0);
}
</style>
