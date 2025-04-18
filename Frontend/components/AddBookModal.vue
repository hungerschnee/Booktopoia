<template>
  <div
      class="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
      @click.self="closeModal"
  >
    <div class="bg-gray-900 p-6 rounded-lg shadow-xl z-50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-booktopia-font">Add New Book</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-booktopia-font">Title *</label>
            <UInput type="text" id="title" v-model="bookData.title" required />
          </div>

          <div class="mb-4">
            <label for="author" class="block text-sm font-medium text-booktopia-font">Author *</label>
            <UInput type="text" id="author" v-model="bookData.author" required />
          </div>

          <div class="mb-4">
            <label for="releaseDate" class="block text-sm font-medium text-booktopia-font">Release Date *</label>
            <UInput type="date" id="releaseDate" v-model="bookData.releaseDate" required />
          </div>

          <div class="mb-4">
            <label for="genre" class="block text-sm font-medium text-booktopia-font">Genre(s) * (comma-separated)</label>
            <UInput type="text" id="genre" v-model="genreInput" required placeholder="e.g., Fiction, Sci-Fi, Mystery" />
          </div>

          <div class="mb-4">
            <label for="coverImage" class="block text-sm font-medium text-booktopia-font">Cover Image URL *</label>
            <UInput type="url" id="coverImage" v-model="bookData.coverImage" required placeholder="https://example.com/cover.jpg" />
          </div>

          <div class="mb-4">
            <label for="pages" class="block text-sm font-medium text-booktopia-font">Pages *</label>
            <UInput type="number" id="pages" v-model.number="bookData.pages" required min="1" />
          </div>

          <div class="mb-4">
            <label for="isbn" class="block text-sm font-medium text-booktopia-font">ISBN *</label>
            <UInput type="text" id="isbn" v-model="bookData.isbn" required />
          </div>

          <div class="mb-4">
            <label for="publisher" class="block text-sm font-medium text-booktopia-font">Publisher</label>
            <UInput type="text" id="publisher" v-model="bookData.publisher" />
          </div>

          <div class="mb-4">
            <label for="language" class="block text-sm font-medium text-booktopia-font">Language *</label>
            <UInput type="text" id="language" v-model="bookData.language" required />
          </div>

          <div class="mb-4">
            <label for="format" class="block text-sm font-medium text-booktopia-font">Format *</label>
            <USelect
                id="format"
                v-model="bookData.format"
                required
                placeholder="Select a format"
                :options="['hardcover','paperback','ebook', 'audiobook']"
            />
          </div>

          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-booktopia-font">Price *</label>
            <UInput type="number" id="price" v-model.number="bookData.price" required min="0" step="0.01" />
          </div>
        </div> <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-booktopia-font">Description *</label>
        <UTextarea id="description" v-model="bookData.description" required :rows="4"/>
      </div>

        <div class="mt-6 flex justify-end space-x-3">
          <UButton
              type="button"
              color="red"
              @click="closeModal"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </UButton>
          <UButton
              type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Book
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// No need to import defineEmits in Nuxt 3 with <script setup>
// Use the defineEmits compiler macro directly
const emit = defineEmits(['close', 'book-added']);

// Reactive object to hold form data
const bookData = ref({
  id: '', // ID will be generated on submission
  title: '',
  author: '',
  releaseDate: '',
  genre: [], // Will be populated from genreInput
  coverImage: '',
  description: '',
  pages: null,
  isbn: '',
  publisher: '',
  language: '',
  format: '',
  price: null,
});

// Separate ref for the comma-separated genre input
const genreInput = ref('');

// Function to generate a simple unique ID (replace with a robust method like UUID if needed)
function generateUniqueId() {
  return `book_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Function to handle form submission
function submitForm() {
  // Generate ID
  bookData.value.id = generateUniqueId();

  // Convert genreInput string to array, trimming whitespace
  bookData.value.genre = genreInput.value
      .split(',')
      .map(g => g.trim())
      .filter(g => g !== ''); // Remove empty strings

  // Basic validation check (HTML5 required handles most)
  if (!bookData.value.title || !bookData.value.author /* add more checks if needed */) {
    alert('Please fill in all required fields.');
    return;
  }

  // Emit the event with a copy of the book data
  emit('book-added', { ...bookData.value });

  // Optionally clear the form after submission (though closing the modal usually suffices)
  // resetForm();
}

// Function to close the modal by emitting the 'close' event
function closeModal() {
  emit('close');
}

// Optional: Function to reset the form (if needed)
// function resetForm() {
//   bookData.value = { /* reset all fields */ };
//   genreInput.value = '';
// }

</script>

<style scoped>
/* Ensure vertical scrollbar only appears when needed */
.overflow-y-auto {
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: #a0aec0 #e2e8f0; /* For Firefox - thumb track */
}
/* For Chrome, Edge, and Safari */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #a0aec0;
  border-radius: 4px;
  border: 2px solid #e2e8f0;
}
</style>