<script setup lang="ts">

import mockBooks from '@/mockdata/book_mocks'
import { cn } from "@/lib/utils";

const books = mockBooks



</script>

<template>
  <div>
    <div v-if="books.length" class="card">
      <UCard v-for="book in books" :key="book.id" class="px-4 mx-9 my-4">
        <div class="flex">
          <div class="w-fit max-w-28 ">
            <img :src="book.coverImage" :alt="book.title"/>
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

.card {
  width: 100%;
}

.book-card {
  padding: 0 1rem;
  margin: 10px 40px;
}


</style>