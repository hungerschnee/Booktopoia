<template>
  <nav class="navbar">
    <div class="container">
      <NuxtLink to="/" class="navbar-brand">Booktopia</NuxtLink>
      <UInput id="search-bar" color="gray" variant="outline" placeholder="Search..." leading-icon="ic:baseline-search" />
      <ul class="navbar-nav">
        <li class="nav-item">
          <NuxtLink to="/my_books" class="nav-link">My Books</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
  <div>
    <div v-if="loading">Loading books...</div>
    <div v-else-if="error">Error loading books: {{ error }}</div>
    <div v-else>
      <div v-if="books.length > 0">
        <UCard v-for="book in books" :key="book.id" class="book-card">
          <img :src="book.coverImage" :alt="book.title" class="cover-image" />
          <div class="book-card-body">
            <h3 class="text-3xl font-bold underline">Titel: {{ book.title }}</h3>
          </div>
        </UCard>
      </div>
      <div v-else>No books found.</div>
    </div>
  </div>
</template>



<script lang="ts">

import mockBooks from '@/mockdata/book_mocks'
import { IInput } from '@inspira-ui/plugins';
import { cn } from "@/lib/utils";

const mock_books = mockBooks

export default {
  name: 'Navbar',
  data() {
    return {
      loading: false,
      error: null,
      books: mock_books,
    };
  }

}
</script>

<style scoped>
/* Basic Navbar Styling - Customize as needed */
.navbar {
  background-color: #364332;
  padding: 1rem 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1500px; /* Example container width */
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ACABA2;
  text-decoration: none;
}

.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin-left: 1.5rem; /* Spacing between nav items */
}

.nav-link {
  text-decoration: none;
  color: #ACABA2;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem; /* Optional rounded corners */
}

.nav-link:hover {
  background-color: #6d8f6d;
  color: #3a3a36;
}

/* Add active class styling if needed (see explanation below) */
.nav-link.nuxt-link-exact-active {
  background-color: #007bff; /* Example active link color */
  color: white;
}

.book-card {
  display: flex;
  padding: 0 1rem;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 10px;
}

.cover-image {
  display: block;
  width: 100px;
}

#search-bar {
  background-color: white;
/*
#0E131F for background
#9E9589 For Icon
#555454 For Font
TODO: Design ändern
*/
}


template {
  background-color: #181A1B;
}


</style>