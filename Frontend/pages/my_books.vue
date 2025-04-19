// pages/my_books.vue
<script setup lang="ts">
import { useState } from '#app';
import type { Book, BorrowedBookEntry } from '~/types/book';
import { useToast} from "#ui/composables/useToast";

// Access shared states
const borrowedBooks = useState<BorrowedBookEntry[]>('borrowed-books');
const allBooks = useState<Book[]>('all-books');

// --- Get the toast function ---
const toast = useToast();

// --- Date Formatting Helper ---
// Formats an ISO date string into a user-friendly format (German locale)
function formatDate(isoString: string): string {
  if (!isoString) return 'N/A';
  try {
    return new Date(isoString).toLocaleDateString('de-DE', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch (e) {
    console.error("Error formatting date:", isoString, e);
    return 'Invalid Date';
  }
}

// --- Helper function to add weeks (can be moved to a utils file) ---
function addWeeks(date: Date, weeks: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + weeks * 7);
  return newDate;
}

// --- Extend Borrow Time Logic ---
function extendBorrowTime(bookId: string) {
  console.log(`Attempting to extend borrow time for book ID: ${bookId}`);
  const entry = borrowedBooks.value.find(e => e.book.id === bookId);

  if (entry) {
    const currentDueDate = new Date(entry.returnUntil);
    const newDueDate = addWeeks(currentDueDate, 2);
    entry.returnUntil = newDueDate.toISOString();

    const formattedNewDueDate = formatDate(entry.returnUntil);
    console.log(`Borrow time for "${entry.book.title}" extended. New due date: ${formattedNewDueDate}`);

    // *** Use toast for success feedback ***
    toast.add({
      id: `extend-success-${bookId}`, // Optional: prevents duplicate toasts if clicked fast
      title: "Borrow Time Extended!",
      description: `"${entry.book.title}" is now due on ${formattedNewDueDate}.`,
      icon: 'i-heroicons-calendar-days-20-solid', // Appropriate icon
      color: 'green', // Green for success
      timeout: 5000 // Automatically close after 5 seconds
    });

  } else {
    console.error(`Error: Could not find book with ID ${bookId} in borrowed list to extend time.`);
    // *** Use toast for error feedback ***
    toast.add({
      id: `extend-error-${bookId}`,
      title: 'Extension Failed',
      description: "Could not find this book in your borrowed list.",
      icon: 'i-heroicons-x-circle-20-solid', // Error icon
      color: 'red', // Red for error
      timeout: 5000
    });
  }
}

// --- Return Book Logic (Adjusted for BorrowedBookEntry) ---
// --- Return Book Logic (using toast) ---
function returnBook(bookId: string) {
  console.log(`Attempting to return book with ID: ${bookId}`);
  const entryIndex = borrowedBooks.value.findIndex(entry => entry.book.id === bookId);

  if (entryIndex !== -1) {
    const returnedEntry = borrowedBooks.value.splice(entryIndex, 1)[0];
    const returnedBook = returnedEntry.book;
    console.log(`Entry for "${returnedBook.title}" removed from borrowed list.`);

    if (allBooks.value) {
      allBooks.value.push(returnedBook);
      console.log(`Book "${returnedBook.title}" added back to available list.`);
      // *** Use toast for return success feedback ***
      toast.add({
        id: `return-success-${bookId}`,
        title: 'Book Returned',
        description: `You have successfully returned "${returnedBook.title}".`,
        icon: 'i-heroicons-check-circle-20-solid',
        color: 'primary', // Or 'green'
        timeout: 4000
      });
    } else {
      console.error("CRITICAL ERROR: Cannot return book. The main 'allBooks' state is not available.");
      borrowedBooks.value.splice(entryIndex, 0, returnedEntry); // Put entry back

      // *** Use toast for critical error feedback ***
      toast.add({
        id: `return-critical-error-${bookId}`,
        title: 'System Error',
        description: "Could not return the book due to a system error. Please refresh.",
        icon: 'i-heroicons-exclamation-triangle-20-solid',
        color: 'red',
        timeout: 0 // Keep persistent until manually closed
      });
    }
  } else {
    console.error(`Error: Could not find book with ID ${bookId} in borrowed list to return.`);
    // *** Use toast for error feedback ***
    toast.add({
      id: `return-find-error-${bookId}`,
      title: 'Return Failed',
      description: "Could not find this book in your borrowed list to return.",
      icon: 'i-heroicons-x-circle-20-solid',
      color: 'red',
      timeout: 5000
    });
  }
}

</script>

<template>
  <div class="p-4 md:p-8 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-booktopia-font">My Borrowed Books</h1>

    <div v-if="borrowedBooks && borrowedBooks.length > 0" class="space-y-4">
      <UCard v-for="entry in borrowedBooks" :key="entry.book.id" class="px-4 mx-auto max-w-4xl my-4 dark:bg-gray-900 shadow-md">
        <div class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 flex justify-center items-center">
            <div class="relative w-32 h-48 shadow-lg rounded overflow-hidden">
              <img class="absolute inset-0 w-full h-full object-cover" :src="entry.book.coverImage" :alt="entry.book.title"/>
            </div>
          </div>
          <div class="book-card-body grow flex flex-col justify-between">
            <div>
              <h2 class="book-title text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                {{ entry.book.title }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Author: {{ entry.book.author }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">ISBN: {{ entry.book.isbn }}</p>
              <p class="text-sm font-semibold mt-2" :class="{'text-red-500 dark:text-red-400 font-bold': new Date(entry.returnUntil) < new Date()}">
                Return by: {{ formatDate(entry.returnUntil) }}
              </p>
              <p v-if="new Date(entry.returnUntil) < new Date()" class="text-xs text-red-600 dark:text-red-500 font-bold uppercase">Overdue</p>
            </div>
            <div class="mt-4 flex flex-wrap justify-end gap-2">
              <UButton
                  color="primary"
                  variant="soft" size="sm"
                  @click="extendBorrowTime(entry.book.id)"
              >
                Extend (2 Weeks)
              </UButton>
              <UButton
                  color="red"
                  variant="outline"
                  size="sm"
                  @click="returnBook(entry.book.id)"
              >
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
/* Add specific styles if needed */
/* Example: Ensure buttons wrap nicely on small screens */
.gap-2 {
  gap: 0.5rem;
}
</style>