<template>
  <UModal
      :model-value="modelValue"
      @close="$emit('update:modelValue', false)"
      prevent-close
      :ui="{ width: 'sm:max-w-3xl' }" >
    <UCard v-if="book" :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-booktopia-font">
            {{ book.title }}
          </h3>
          <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="$emit('update:modelValue', false)"
          />
        </div>
      </template>

      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-1/3 flex-shrink-0">
          <img :src="book.coverImage" :alt="book.title" class="w-full h-auto object-cover rounded-md shadow-md">
        </div>

        <div class="md:w-2/3 space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p><strong class="font-semibold text-gray-900 dark:text-green-500">Author:</strong> {{ book.author }}</p>
          <p><strong class="font-semibold text-gray-900 dark:text-green-500">Full Description:</strong> {{ book.description }}</p>
          <p>
            <strong class="font-semibold text-gray-900 dark:text-green-500">Genre: </strong>
            <span v-for="(genre, index) in book.genre" :key="genre">
                  {{ genre }}<span v-if="index < book.genre.length - 1">, </span>
              </span>
          </p>
          <p><strong class="font-semibold text-gray-900 dark:text-green-500">ISBN:</strong> {{ book.isbn }}</p>
          <p><strong class="font-semibold text-gray-900 dark:text-green-500">Release Date:</strong> {{ book.releaseDate }}</p>
          <p><strong class="font-semibold text-gray-900 dark:text-green-500">Pages:</strong> {{ book.pages }}</p>
          <p v-if="book.publisher"><strong class="font-semibold text-gray-900 dark:text-green-500">Publisher:</strong> {{ book.publisher }}</p>
          <p><strong class="font-semibold text-gray-900 dark:text-green-500">Language:</strong> {{ book.language }}</p>
          <p><strong class="font-semibold text-gray-900 dark:text-green-500">Format:</strong> <span class="capitalize">{{ book.format }}</span></p>
          <p v-if="book.rating !== undefined"><strong class="font-semibold text-gray-900 dark:text-green-500">Rating:</strong> {{ book.rating }} / 5</p>
        </div>
      </div>

    </UCard>
    <div v-else class="p-4">
      Loading book details...
    </div>
  </UModal>
</template>

<script setup lang="ts">
import type { Book } from '~/types/book'; // Adjust path if necessary

// Props definition using defineProps
defineProps({
  // Prop for v-model compatibility (controls visibility)
  modelValue: {
    type: Boolean,
    required: true,
  },
  // Prop to receive the book object
  book: {
    type: Object as () => Book | null, // Type assertion for complex types
    default: null, // Allow null when modal is closed or book not yet selected
  },
});

// Emits definition for v-model compatibility
defineEmits(['update:modelValue']);

</script>

<style scoped>
/* Add any specific styles for the modal component here if needed */
.capitalize {
  text-transform: capitalize;
}
</style>