<template>
  <main class="home-page">
    <div class="home-page__inner container">
      <search-form @search="getCard" :loading="loading" :errorCard="errorCard" />
      <Dashboard
        :cards="cards"
        alertText="Enter the city name in the input field to proceed."
        @deleteCard="deleteCardCity($event)"
        :useDeleteCard="true"
      />
      <modal-state v-if="modal.show" @close="resetModal">
        <template v-slot:text>{{ modal.text }}</template>
        <template v-slot:buttons>
          <btn-state class="btn-modal" @click="saveModal" v-if="modal.id"> Yes </btn-state>
          <btn-state class="btn-modal" @click="resetModal">{{ modal.btn }}</btn-state>
        </template>
      </modal-state>
    </div>
  </main>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';
import Dashboard from '@/components/Dashboard.vue';
import { apiKeyWeather } from '@/_config.js';

export default {
  components: {
    SearchForm,
    Dashboard,
  },
  data() {
    return {
      cards: [],
      loading: false,
      errorCard: '',
      modal: {},
    };
  },
  methods: {
    getTemperature(num) {
      return (num - 273.15).toFixed(0);
    },
    async getCard(event) {
      const countrySearch = event.countryName;
      const city = event.name;

      if (this.cards.length >= 5) {
        this.modal = {
          text: "Here, you have the opportunity to add up to 5 cards. If you wish to add more, you'll need to free up space by removing some existing ones.",
          show: true,
          btn: 'OK',
        };
        return;
      }

      this.loading = true;

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`);
        const data = await response.json();

        if (this.cards.find((e) => e.id === data.id)) {
          this.errorCard =
            'Sorry, but it seems that a card for the selected city already exists. Please choose another city or use the existing card.';
        } else {
          this.errorCard = '';

          const { main, id, dt, sys } = data;
          const country = countrySearch || sys.country;
          const temperature = {
            now: this.getTemperature(main.temp),
            min: this.getTemperature(main.temp_min),
            max: this.getTemperature(main.temp_max),
          };

          const currentTime = new Date(dt * 1000);
          const sunriseTime = new Date(sys.sunrise * 1000);
          const sunsetTime = new Date(sys.sunset * 1000);

          const periodDay = sunriseTime < currentTime && currentTime < sunsetTime ? 'day' : 'night';

          const card = { temperature, country, city, id, periodDay };
          this.cards = [...this.cards, card];
        }
      } catch (error) {
        this.errorCard = "Sorry, the location couldn't be found. Please refine your query or choose another location.";
      } finally {
        this.loading = false;
      }
    },

    deleteCardCity(id) {
      this.modal = {
        text: 'Are you sure you want to delete the card with this location?',
        show: true,
        btn: 'Close',
        id,
      };
    },
    saveLocalStorage(newCards) {
      const dataString = JSON.stringify(newCards);
      localStorage.setItem('cards', dataString);
    },
    getCardsLocalStorage() {
      const storedDataString = localStorage.getItem('cards');
      const storedData = JSON.parse(storedDataString);

      if (storedData && storedData.length) {
        this.cards = storedData;
      }
      this.isDuplicateCity();
    },
    saveModal() {
      this.cards = this.cards.filter((e) => e.id !== this.modal.id);
      this.resetModal();
    },
    resetModal() {
      this.modal = {};
    },
    getCityByGeolocation() {
      return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

              try {
                const response = await fetch(url);
                const data = await response.json();

                const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
                resolve(city);
              } catch (error) {
                console.error(error);
                reject(error);
              }
            },
            (error) => {
              console.error(error);
              reject(error);
            }
          );
        } else {
          reject('Geolocation is not supported by your browser.');
        }
      });
    },
    isDuplicateCity() {
      this.getCityByGeolocation().then((resolve) => {
        const check = this.cards.find((e) => e.city.toUpperCase() == resolve.toUpperCase());

        if (!check) {
          console.log(resolve);
          this.getCard({ name: resolve });
        }
      });
    },
  },
  watch: {
    cards(newCards) {
      this.saveLocalStorage(newCards);
    },
  },
  mounted() {
    this.getCardsLocalStorage();
  },
};
</script>

<style scoped></style>
