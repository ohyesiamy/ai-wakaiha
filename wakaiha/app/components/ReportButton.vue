<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const isOpen = ref(false)
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const state = reactive({
  reporterId: '',
  targetId: '',
  content: ''
})

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors: FormError[] = []
  if (!state.reporterId?.trim()) {
    errors.push({ name: 'reporterId', message: '自分のIDを入力してください' })
  }
  if (!state.targetId?.trim()) {
    errors.push({ name: 'targetId', message: '通報相手のIDを入力してください' })
  }
  if (!state.content?.trim()) {
    errors.push({ name: 'content', message: '通報内容を入力してください' })
  } else if (state.content.length < 10) {
    errors.push({ name: 'content', message: '通報内容は10文字以上で入力してください' })
  }
  return errors
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true
  submitError.value = ''

  try {
    await $fetch('/api/report', {
      method: 'POST',
      body: event.data
    })
    submitSuccess.value = true
    // Reset form
    state.reporterId = ''
    state.targetId = ''
    state.content = ''
    // Close modal after delay
    setTimeout(() => {
      isOpen.value = false
      submitSuccess.value = false
    }, 2000)
  } catch (error: any) {
    submitError.value = error?.data?.message || '送信に失敗しました。しばらく経ってから再度お試しください。'
  } finally {
    isSubmitting.value = false
  }
}

function openModal() {
  submitSuccess.value = false
  submitError.value = ''
  isOpen.value = true
}
</script>

<template>
  <div>
    <!-- Fixed Report Button -->
    <button
      class="report-button"
      aria-label="通報する"
      @click="openModal"
    >
      <UIcon name="i-lucide-flag" class="w-5 h-5 sm:w-6 sm:h-6" />
      <span class="hidden sm:inline ml-2">通報</span>
    </button>

    <!-- Report Modal -->
    <UModal
      v-model:open="isOpen"
      title="通報フォーム"
      description="コミュニティルール違反を報告してください"
      :ui="{
        footer: 'justify-end'
      }"
    >
      <template #body>
        <!-- Success Message -->
        <div
          v-if="submitSuccess"
          class="flex flex-col items-center justify-center py-8 text-center"
        >
          <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
            <UIcon name="i-lucide-check" class="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            送信完了
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            通報を受け付けました。ご協力ありがとうございます。
          </p>
        </div>

        <!-- Form -->
        <UForm
          v-else
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="自分のID" name="reporterId" required>
            <UInput
              v-model="state.reporterId"
              placeholder="あなたのDiscord IDまたはユーザー名"
              class="w-full"
              :disabled="isSubmitting"
            />
          </UFormField>

          <UFormField label="通報相手のID" name="targetId" required>
            <UInput
              v-model="state.targetId"
              placeholder="通報対象のDiscord IDまたはユーザー名"
              class="w-full"
              :disabled="isSubmitting"
            />
          </UFormField>

          <UFormField label="通報内容" name="content" required>
            <UTextarea
              v-model="state.content"
              placeholder="具体的な状況や問題となる行動を記載してください"
              class="w-full"
              :rows="5"
              :disabled="isSubmitting"
            />
          </UFormField>

          <!-- Error Message -->
          <div
            v-if="submitError"
            class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <p class="text-sm text-red-600 dark:text-red-400">
              {{ submitError }}
            </p>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <UButton
              type="button"
              color="neutral"
              variant="outline"
              :disabled="isSubmitting"
              @click="isOpen = false"
            >
              キャンセル
            </UButton>
            <UButton
              type="submit"
              color="error"
              :loading="isSubmitting"
            >
              送信する
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.report-button {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  box-shadow:
    0 4px 6px -1px rgba(239, 68, 68, 0.3),
    0 2px 4px -2px rgba(239, 68, 68, 0.2),
    0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.report-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 6px 8px -1px rgba(239, 68, 68, 0.4),
    0 4px 6px -2px rgba(239, 68, 68, 0.3),
    0 15px 20px -3px rgba(0, 0, 0, 0.15);
}

.report-button:active {
  transform: translateY(0);
}

@media (min-width: 640px) {
  .report-button {
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
  }
}

@media (max-width: 639px) {
  .report-button {
    bottom: 1rem;
    right: 1rem;
    padding: 0.875rem;
  }
}
</style>
