<script setup lang="ts">

import mockBooks from '@/mockdata/book_mocks'
import { useState } from '#app';
import {computed} from "vue";
import type { UserStatus } from "~/mockdata/users";
import type {AggregatedBook} from "~/types/book";
const authorization = useState<UserStatus>('user-status');


const uniqueBooksWithCount = computed(() => {
  const booksByIsbn: Record<string, AggregatedBook> = {};

  for (const book of mockBooks) {
    if (!book.isbn) {
      console.warn(`Book with id ${book.id} ('${book.title}') is missing an ISBN and will be skipped.`);
      continue; // Skip books without an ISBN if necessary
    }

    if (booksByIsbn[book.isbn]) {
      // If ISBN already exists, just increment the count
      booksByIsbn[book.isbn].count++;
    } else {
      // If ISBN is new, add the book and set count to 1
      booksByIsbn[book.isbn] = {
        book: book, // Store the first encountered book object
        count: 1,
      };
    }
  }

  // Return an array of the aggregated book objects
  return Object.values(booksByIsbn);
});

</script>

<template>
  <div>
    <div class="mt-3 flex  justify-center">
      <IInput
          id="search-bar"
          placeholder="Search..."
          container-class="w-full max-w-sm"
      />
    </div>
    <div v-if="uniqueBooksWithCount.length" class="w-full">
      <UCard v-for="item in uniqueBooksWithCount" :key="item.book.isbn" class="px-4 mx-9 my-4">
        <div class="flex">
          <div class="w-fit">
            <Book size="sm" shadow="sm" radius="lg">
              <img class="absolute top-0 left-5 max-w-full max-h-full" :src="item.book.coverImage" :alt="item.book.title"/>
            </Book>
          </div>
          <div class="book-card-body grow px-6 flex flex-col justify-between">
            <div>
              <h1 class="book-title text-2xl font-bold mb-2">{{ item.book.title }}</h1>
              <p class="book-description">{{ item.book.description }}</p>
            </div>
            <div class="text-sm text-gray-500">
              <p>Author: {{ item.book.author }}</p>
              <p>Genre:
                <span v-for="(genre, index) in item.book.genre" :key="genre">
                  {{ genre }} <span v-if="index < item.book.genre.length - 1">, </span>
                </span>
              </p>
              <p>ISBN: {{ item.book.isbn }}</p>
            </div>
          </div>
          <div class="flex flex-col-reverse space-y-reverse space-y-2">
            <div class="text-sm text-gray-500">
              <p v-if="item.count > 1">{{ item.count }} Copies Available</p>
              <p v-if="item.count == 1">{{ item.count }} Copy Available</p>
            </div>
            <UButton v-if="authorization === 'customer' || authorization === 'librarian' ">Borrow Book</UButton>
            <UButton v-if="authorization === 'librarian'">Delete Book</UButton>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else>No books found.</div>
  </div>
</template>

<style scoped>

</style>