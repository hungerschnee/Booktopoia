// pages/my_books.vue
<script setup lang="ts">
import { useState } from '#app';
import type { Book } from '~/types/book';
// import BookComponent from '~/components/BookComponent.vue'; // If needed

// Access the shared borrowed books state
const borrowedBooks = useState<Book[]>('borrowed-books');

// *** Access the shared ALL books state ***
// Use the same key 'all-books'. Do NOT initialize it here again.
// We assume it's already initialized (e.g., in index.vue).
const allBooks = useState<Book[]>('all-books');

// --- Fully Implemented Return Book Logic ---
function returnBook(bookId: string) {
  console.log(`Attempting to return book with ID: ${bookId}`);

  // Find the index of the book in the borrowed list
  const bookIndex = borrowedBooks.value.findIndex(book => book.id === bookId);

  if (bookIndex !== -1) {
    // Remove the book from the borrowed list (reactive operation)
    const returnedBook = borrowedBooks.value.splice(bookIndex, 1)[0];
    console.log(`Book "${returnedBook.title}" removed from borrowed list.`);

    // Add the book back to the main available list (reactive operation)
    // Check if allBooks state was correctly retrieved
    if (allBooks.value) {
      allBooks.value.push(returnedBook);
      console.log(`Book "${returnedBook.title}" (ID: ${returnedBook.id}) added back to available list.`);
      // Both lists are reactive and shared, so index.vue and my_books.vue
      // will automatically update their views.
    } else {
      // This indicates a problem - the 'all-books' state wasn't initialized or accessed correctly.
      console.error("CRITICAL ERROR: Cannot return book. The main 'allBooks' state is not available.");
      // Attempt to revert the removal from borrowed list to avoid losing the book data
      borrowedBooks.value.splice(bookIndex, 0, returnedBook); // Put it back at the same index
      alert("Error returning book: Could not access the main book list. Please refresh the application or contact support.");
    }
  } else {
    console.error(`Error: Could not find book with ID ${bookId} in the borrowed list.`);
    alert("Error: Could not find this book in your borrowed list.");
  }
}
// --- End Return Book Logic ---

</script>

<template>
  <div class="p-4 md:p-8 dark:bg-gray-800 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-booktopia-font">My Borrowed Books</h1>

    <div v-if="borrowedBooks && borrowedBooks.length > 0" class="space-y-4">
      <UCard v-for="book in borrowedBooks" :key="book.id" class="px-4 mx-auto max-w-4xl my-4 dark:bg-gray-900 shadow-md">
        <div class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 flex justify-center items-center">
            <div class="relative w-32 h-48 shadow-lg rounded overflow-hidden">
              <img class="absolute inset-0 w-full h-full object-cover" :src="book.coverImage" :alt="book.title"/>
            </div>
          </div>
          <div class="book-card-body grow flex flex-col justify-between">
            <div>
              <h2 class="book-title text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                {{ book.title }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Author: {{ book.author }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">ISBN: {{ book.isbn }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Format: {{ book.format }}</p>
            </div>
            <div class="mt-4 flex justify-end">
              <UButton
                  color="red"
                  variant="outline"
                  @click="returnBook(book.id)" >
                Return Book
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else class="text-center mt-10 text-gray-500 dark:text-gray-400">
      You haven't borrowed any books yet. Go explore the library!
    </div>
  </div>
</template>

<style scoped>
/* Styles remain the same */
/* ... */
</style>