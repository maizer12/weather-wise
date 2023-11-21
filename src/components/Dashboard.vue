<template>
  <alert-state v-if="alertText.length && !cardItems.length">{{ alertText }}</alert-state>
  <template v-else>
    <ul class="card-items">
      <card-state
        @click="openChard(card)"
        v-for="card in cardItems"
        :key="card.id"
        :selected="card.id == chartData.id"
        :favorite="isInFavorites(card)"
        v-bind="card"
        @removeCard="removeFromFavorites(card)"
        @addCard="addToFavorites(card)"
        @deleteCard="$emit('deleteCard', card.id)"
        :useDeleteCard="useDeleteCard"
      />
    </ul>
    <Chart :data="chartData" v-if="chartData.city" />
    <modal-state v-if="modal.show" @close="resetModal">
      <template v-slot:text>{{ modal.text }}</template>
      <template v-slot:buttons>
        <btn-state class="btn-modal" @click="confirmDeletionFavorite" v-if="modal.id"> Yes </btn-state>
        <btn-state class="btn-modal" @click="resetModal">{{ modal.btn }}</btn-state>
      </template>
    </modal-state>
  </template>
</template>

<script>
import Chart from '@/components/Chart.vue';

export default {
  emits: ['deleteCard'],
  props: {
    cards: {
      type: Array,
      default: [],
    },
    useFavorites: {
      type: Boolean,
      default: false,
    },
    alertText: {
      type: String,
      default: '',
    },
    useDeleteCard: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Chart,
  },
  data() {
    return {
      chartData: {},
      favorites: [],
      modal: {},
    };
  },
  computed: {
    cardItems() {
      return this.useFavorites ? this.favorites : this.cards;
    },
  },
  methods: {
    addToFavorites(ell) {
      if (this.favorites.length >= 5) {
        this.modal = {
          show: true,
          text: 'Are you sure you want to remove the card with the city from your favorites?',
          btn: 'Ok',
        };
        return;
      }
      this.favorites = [...this.favorites, ell];
    },
    removeFromFavorites(ell) {
      this.modal = {
        show: true,
        text: 'Are you sure you want to remove the card with the city from your favorites?',
        btn: 'Close',
        id: ell.id,
      };
    },
    confirmDeletionFavorite() {
      this.favorites = this.favorites.filter((e) => e.id !== this.modal.id);
      this.resetModal();
    },
    isInFavorites(ell) {
      return !!this.favorites.find((e) => e.id && e.id == ell.id);
    },
    getFavoritesLocalStorage() {
      const storedDataString = localStorage.getItem('favorites');
      if (storedDataString == 'null') return;
      const storedData = JSON.parse(storedDataString);
      this.favorites = storedData;
    },
    openChard(card) {
      if (this.chartData.id && this.chartData.id == card.id) {
        this.chartData = {};
        return;
      }
      this.chartData = {};
      this.chartData = card;
    },
    resetModal() {
      this.modal = {};
    },
  },
  mounted() {
    this.getFavoritesLocalStorage();
  },
  watch: {
    favorites(newFavorites) {
      const dataString = JSON.stringify(newFavorites);
      localStorage.setItem('favorites', dataString);
    },
  },
};
</script>

<style scoped>
.card-items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 1150px;
  margin: 0 auto;
  column-gap: 25px;
  row-gap: 45px;
}
@media (max-width: 990px) {
  .card-items {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 767px) {
  .card-items {
    grid-template-columns: 1fr;
  }
}
</style>
