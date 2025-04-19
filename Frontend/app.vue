<script setup lang="ts">

</script>

<template>
    <nav class="navbar">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand">Booktopia</NuxtLink>
        <ul class="navbar-nav">
          <li class="nav-item mt-3">
            <NuxtLink to="/my_books" class="nav-link">My Books</NuxtLink>
          </li>
          <li class="nav-item mt-3">
            <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          </li>
          <li class="nav-item">
            <toggle-button/>
          </li>
        </ul>
      </div>
    </nav>
    <NuxtPage/>
  <UNotifications/>
</template>


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
  align-items: center;
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

button {
  padding: 8px 15px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  margin-top: 5px;
}

</style>