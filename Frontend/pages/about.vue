<script setup lang="ts">

import { useState } from '#app';
import type { UserStatus } from "~/mockdata/users";

const authorization = useState<UserStatus>('user-status');

</script>

<template>

  <div class="m-12 ">
    <h1 class="mb-4 text-3xl font-extrabold text-gray-500 dark:text-gray-200 md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-cyan-600">Booktopia</span> is a Student Project</h1>
    <p class="text-xl text-gray-500 dark:text-gray-200"> designed by Jannek Brödling, Benjamin Dockhorn and Fabian Hils </p>

  </div>

</template>

<style scoped>

</style>