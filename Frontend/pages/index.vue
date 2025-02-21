<script setup lang="ts">

import mockBooks from '@/mockdata/book_mocks'

const books = mockBooks



</script>

<template>
  <div>
    <div class="mt-3 flex  justify-center">
      <IInput
          id="search-bar"
          placeholder="Search..."
          container-class="w-full max-w-sm"
      >
      </IInput>
    </div>
    <div v-if="books.length" class="w-full">
      <UCard v-for="book in books" :key="book.id" class="px-4 mx-9 my-4">
        <div class="flex">
          <div class="w-fit">
            <Book size="sm" shadow="sm" radius="lg">
              <img class="absolute top-0 left-5 max-w-full max-h-full" :src="book.coverImage" :alt="book.title"/>
            </Book>
          </div>
          <div class="book-card-body grow px-6 flex flex-col justify-between">
            <div>
              <h1 class="book-title text-2xl font-bold mb-2">{{ book.title }}</h1>
              <p class="book-description">{{ book.description }}</p>
            </div>
            <div class="text-sm text-gray-600">
              <p>Author: {{ book.author }}</p>
              <p>Genre:
                <span v-for="(item, index) in book.genre" :key="item">
                  {{ item }} <span v-if="index < book.genre.length - 1">, </span>
                </span>
              </p>
              <p>ISBN: {{ book.isbn }}</p>
            </div>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else>No books found.</div>
  </div>
</template>

<style scoped>

</style>