// index.vue
<script setup lang="ts">
import initialMockBooks from '@/mockdata/book_mocks'
import { useState } from '#app';
import { ref, computed } from "vue";
import type { UserStatus } from "~/mockdata/users";
import type { AggregatedBook, Book } from "~/types/book";
import AddBookModal from '~/components/AddBookModal.vue';
import BookDetailsModal from '~/components/BookDetailsModal.vue';

// --- State ---
const isAddModalOpen = ref(false);
const authorization = useState<UserStatus>('user-status');
const isDetailsModalOpen = ref(false);
const selectedBook = ref<Book | null>(null);
const searchQuery = ref('');

// 2. Create a reactive ref holding the book data
const allBooks = ref<Book[]>(initialMockBooks);

// --- Computed Properties ---

// 3. Update filteredBooks to use the reactive 'allBooks.value'
const filteredBooks = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) {
    return allBooks.value; // Access the array via .value
  }

  // Access the array via .value for filtering
  return allBooks.value.filter(book => {
    const isbnMatch = book.isbn?.toLowerCase().includes(query);
    const titleMatch = book.title?.toLowerCase().includes(query);
    const authorMatch = book.author?.toLowerCase().includes(query);
    const genreMatch = book.genre?.some(g => g.toLowerCase().includes(query));
    return isbnMatch || titleMatch || authorMatch || genreMatch;
  });
});

// uniqueBooksWithCount depends on filteredBooks, no change needed here
const uniqueBooksWithCount = computed(() => {
  const booksByIsbn: Record<string, AggregatedBook> = {};
  for (const book of filteredBooks.value) { // implicitly uses the updated filteredBooks
    if (!book.isbn) {
      console.warn(`Book with id ${book.id} ('${book.title}') is missing an ISBN and will be skipped.`);
      continue;
    }
    if (booksByIsbn[book.isbn]) {
      booksByIsbn[book.isbn].count++;
    } else {
      booksByIsbn[book.isbn] = {
        book: book,
        count: 1,
      };
    }
  }
  return Object.values(booksByIsbn);
});

// --- Methods ---

function openAddModal() {
  isAddModalOpen.value = true;
}
function closeAddModal() {
  isAddModalOpen.value = false;
}

// 4. Update handleBookAdded to modify the reactive 'allBooks.value'
function handleBookAdded(newBook: Book) {
  console.log('New book received:', newBook);
  // Push the new book into the reactive ref's array
  allBooks.value.push(newBook);
  // Vue detects this change, computed properties update, list re-renders
  closeAddModal(); // Close modal after adding
}

function openDetailsModal(book: Book) {
  selectedBook.value = book;
  isDetailsModalOpen.value = true;
}

</script>

<template>
  <div>
    <div class="mt-3 flex items-center">
      <div class="flex-grow max-w-sm mx-auto">
        <IInput
            id="search-bar"
            placeholder="Search by ISBN, Title, Author, Genre"
            container-class="w-full"
            v-model="searchQuery"
        />
      </div>
      <div class="mr-9">
        <UButton
            v-if="authorization === 'librarian'"
            class="u-buttons dark:bg-booktopia-green dark:text-booktopia-font outline-none"
            size="xl"
            variant="ghost"
            @click="openAddModal"
        >
          Add Book
        </UButton>
        <div v-else class="w-[102px] h-[44px]"/>
      </div>
    </div>

    <AddBookModal
        v-if="isAddModalOpen"
        @close="closeAddModal"
        @book-added="handleBookAdded" />

    <div v-if="uniqueBooksWithCount.length" class="w-full">
      <UCard v-for="item in uniqueBooksWithCount" :key="item.book.isbn" class="px-4 mx-9 my-4 dark:bg-gray-900">
        <div class="flex">
          <div class="w-fit flex-shrink-0">
            <BookComponent size="sm" shadow="sm" radius="lg">
              <img class="absolute top-0 left-5 max-w-full max-h-full object-contain" :src="item.book.coverImage" :alt="item.book.title"/>
            </BookComponent>
          </div>
          <div class="book-card-body grow px-6 flex flex-col justify-between">
            <div>
              <h1
                  class="book-title text-2xl font-bold mb-2 cursor-pointer hover:underline"
                  @click="openDetailsModal(item.book)" >
                {{ item.book.title }}
              </h1>
              <p class="book-description text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {{ item.book.description }}
              </p>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              <p>Author: {{ item.book.author }}</p>
              <p>Genre:
                <span v-for="(genre, index) in item.book.genre" :key="genre">
                  {{ genre }} <span v-if="index < item.book.genre.length - 1">, </span>
                </span>
              </p>
              <p>ISBN: {{ item.book.isbn }}</p>
            </div>
          </div>
          <div class="flex flex-col-reverse space-y-reverse space-y-2 ml-4 flex-shrink-0">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              <p v-if="item.count > 1">{{ item.count }} Copies Available</p>
              <p v-if="item.count == 1">{{ item.count }} Copy Available</p>
            </div>
            <UButton class="text-center" v-if="authorization === 'customer' || authorization === 'librarian' ">Borrow Book</UButton>
            <UButton class="text-center" v-if="authorization === 'librarian'">Delete Book</UButton>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else class="text-center mt-10 text-gray-500 dark:text-gray-400">
      <span v-if="searchQuery">No books found matching "{{ searchQuery }}".</span>
      <span v-else>There are currently no books available.</span>
    </div>

    <BookDetailsModal
        v-model="isDetailsModalOpen"
        :book="selectedBook"
    />
  </div>
</template>

<style scoped>
/* Styles remain the same */
.u-buttons:hover {
  background-color: #6d8f6d;
  color: #3a3a36;
}
.book-title:hover {
  color: #4a90e2;
  text-decoration: underline;
}
.dark .book-title:hover {
  color: #6d8f6d;
}
.book-card-body img {
  max-width: 100%;
  height: auto;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>