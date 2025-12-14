export function useScrollAnimation(options: { threshold?: number; rootMargin?: string } = {}) {
  const { threshold = 0.1, rootMargin = '0px' } = options
  const isVisible = ref(false)
  const scrollProgress = ref(0)
  const elementRef = ref<HTMLElement | null>(null)

  let observer: IntersectionObserver | null = null

  const updateScrollProgress = () => {
    if (!elementRef.value) return

    const rect = elementRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementHeight = rect.height

    // Calculate how much of the element is visible
    const visibleTop = Math.max(0, windowHeight - rect.top)
    const visibleBottom = Math.max(0, rect.bottom)
    const visibleHeight = Math.min(visibleTop, visibleBottom, elementHeight, windowHeight)

    // Calculate progress (0 to 1)
    const progress = Math.min(1, Math.max(0, visibleTop / (windowHeight + elementHeight)))
    scrollProgress.value = progress
  }

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting
          if (entry.isIntersecting) {
            window.addEventListener('scroll', updateScrollProgress, { passive: true })
            updateScrollProgress()
          } else {
            window.removeEventListener('scroll', updateScrollProgress)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
    }
    window.removeEventListener('scroll', updateScrollProgress)
  })

  return {
    elementRef,
    isVisible,
    scrollProgress
  }
}
