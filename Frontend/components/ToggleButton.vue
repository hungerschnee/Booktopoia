<template>
  <div>
    <UButton
        class="dark:bg-booktopia-green dark:text-booktopia-font outline-none hover:dark:divide-booktopia-green-hover"
        @click="toggleStatus"
        variant="ghost"
    >
      {{ buttonText }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useState } from '#app';
import type { UserStatus } from "~/mockdata/users";


// Define the possible statuses
// type UserStatus = 'customer' | 'librarian';

// Create a reactive state variable using useState
// - 'user-status' is a unique key for this state across your app.
// - The second argument is a factory function providing the initial value.
const currentStatus = useState<UserStatus>('user-status', () => 'customer'); // Default to 'customer'

const toast = useToast()
// Function to toggle the status
const toggleStatus = () => {
  if (currentStatus.value === 'customer') {
    currentStatus.value = 'librarian';
    toast.add({
      title: 'Successfully changed to Librarian',
    })
  } else {
    currentStatus.value = 'customer';
    toast.add({
      title: 'Successfully changed to Customer',
    })
  }
  // You could also write the toggle more concisely:
  // currentStatus.value = currentStatus.value === 'customer' ? 'librarian' : 'customer';

};

// Computed property to determine the button text based on the *next* state
const buttonText = computed(() => {
  return currentStatus.value === 'customer'
      ? 'Switch to Librarian Role'
      : 'Switch to Customer Role';
});

// If you need to access the status elsewhere in your app,
// simply use useState('user-status') in that component/page.
// Example:
// import { useState } from '#app';
// const statusInAnotherComponent = useState<UserStatus>('user-status');
// console.log(statusInAnotherComponent.value);

</script>

<style scoped>
/* Add some basic styling if you like */
button {
  padding: 8px 15px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  margin-top: 5px;
}
button:hover {
  background-color: #e0e0e0;
}
p {
  margin-bottom: 10px;
}
</style>