<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

interface Props {
  id?: string
  title: string
  description?: string
  features?: Feature[]
  gradientFrom?: string
  gradientTo?: string
}

const props = withDefaults(defineProps<Props>(), {
  gradientFrom: 'from-primary-500/30',
  gradientTo: 'to-violet-500/30'
})

const { elementRef, isVisible, scrollProgress } = useScrollAnimation({ threshold: 0.05 })

const gradientStyle = computed(() => ({
  opacity: isVisible.value ? Math.min(0.8, scrollProgress.value * 1.5) : 0,
  transform: `translateY(${(1 - scrollProgress.value) * 30}px) scale(${0.95 + scrollProgress.value * 0.05})`,
  backgroundPosition: `${scrollProgress.value * 100}% ${scrollProgress.value * 50}%`
}))
</script>

<template>
  <section
    :id="id"
    ref="elementRef"
    class="relative py-16 sm:py-24"
  >
    <!-- Animated gradient background -->
    <div
      class="absolute inset-0 -z-10 transition-all duration-700 ease-out overflow-hidden"
      :style="gradientStyle"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br opacity-50"
        :class="[gradientFrom, gradientTo]"
      />
      <div
        class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent dark:via-white/5"
        :style="{
          backgroundSize: '400% 400%',
          backgroundPosition: `${scrollProgress * 100}% ${scrollProgress * 100}%`
        }"
      />
    </div>

    <UContainer>
      <UCard
        variant="subtle"
        class="transition-all duration-700 ease-out"
        :class="{
          'translate-y-0 opacity-100': isVisible,
          'translate-y-12 opacity-0': !isVisible
        }"
        :ui="{
          root: 'backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/30 shadow-xl',
          body: 'p-8 sm:p-12'
        }"
      >
        <!-- Header -->
        <div class="text-center mb-12">
          <h2
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-500 delay-100"
            :class="{
              'translate-y-0 opacity-100': isVisible,
              'translate-y-4 opacity-0': !isVisible
            }"
          >
            {{ title }}
          </h2>
          <p
            v-if="description"
            class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-500 delay-200"
            :class="{
              'translate-y-0 opacity-100': isVisible,
              'translate-y-4 opacity-0': !isVisible
            }"
          >
            {{ description }}
          </p>
        </div>

        <!-- Features Grid -->
        <div
          v-if="features?.length"
          class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="group relative p-6 rounded-xl transition-all duration-500 hover:bg-white/50 dark:hover:bg-gray-800/50"
            :class="{
              'translate-y-0 opacity-100': isVisible,
              'translate-y-8 opacity-0': !isVisible
            }"
            :style="{ transitionDelay: `${300 + index * 100}ms` }"
          >
            <!-- Feature gradient accent -->
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              :class="[gradientFrom, gradientTo]"
              style="filter: blur(20px);"
            />

            <div class="flex flex-col gap-4">
              <div
                class="w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center"
                :class="[gradientFrom, gradientTo]"
              >
                <UIcon
                  :name="feature.icon"
                  class="w-6 h-6 text-primary-600 dark:text-primary-400"
                />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Default slot for custom content -->
        <slot />
      </UCard>
    </UContainer>
  </section>
</template>
