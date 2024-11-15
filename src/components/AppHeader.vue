<template>
  <header class="shadow-lg bg-light-bg py-4">
    <div class="flex justify-between items-center container">
      <router-link to="/">
        <img
          src="../assets/images/logo.svg"
          alt="logo"
          class="w-40 sm:w-60"
        />
      </router-link>
      <nav class="flex gap-2 sm:gap-6 items-center">
        <router-link
          class="nav-link"
          active-class="active"
          v-for="item in navMenu"
          :key="item.name"
          :to="item.link"
        >
          {{ item.name }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
const navMenu = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Favorite Places',
    link: '/favorite',
  },
]
</script>
