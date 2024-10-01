<template>
  <main class="favorite-page">
    <div class="favorite-page__inner container">
<!--   Когда у нас булевый пропс, то мы просто прокидываем "use-favorites" без значения и он будет в true   -->
      <Dashboard :useFavorites="true" alertText="You haven't selected a place. Please choose a place to proceed." />
    </div>
  </main>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue';

export default {
  components: { Dashboard },
};
</script>

<style scoped></style>
