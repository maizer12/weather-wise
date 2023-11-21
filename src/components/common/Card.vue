<template>
  <component :is="componentType" class="card opacity-anim" :class="{ 'selected-card': selected }">
    <button class="btn-delete" @click.stop="$emit('deleteCard')" v-if="useDeleteCard">
      <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#495cab" stroke-width="1.5" stroke-linecap="round"></path>
          <path
            d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
            stroke="#495cab"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path>
        </g>
      </svg>
    </button>
    <div class="card__content">
      <p class="card__subtitle">{{ country || '' }}</p>
      <h5 class="card__title">{{ city }}</h5>
      <img :src="'../../assets/images/card/' + periodDay + '.png'" :alt="periodDay" class="card__img" />
      <div class="card-switch" @click.stop>
        <button class="card-switch__btn" @click="time = 'today'" :class="{ active: time == 'today' }">Today</button>
        <button class="card-switch__btn" :class="{ active: time != 'today' }" @click="switchTimeData">Week</button>
      </div>
      <spinner-loader v-if="loading" class="spinner opacity-anim" />
      <p v-else-if="error" class="error opacity-anim">*{{ error }}</p>
      <ul class="card-list" v-else>
        <template v-if="time == 'today'">
          <li class="card-list__item opacity-anim">
            Temperature:
            <span>{{ temperature.now }}°C</span>
          </li>
          <li class="card-list__item opacity-anim">
            High:
            <span>{{ temperature.max }}°C</span>
          </li>
          <li class="card-list__item opacity-anim">
            Low:
            <span>{{ temperature.min }}°C</span>
          </li>
        </template>
        <template v-else>
          <li class="card-list__item opacity-anim" v-for="(item, date, i) in weekData" :key="i">
            {{ date }}
            <span>L: {{ item.minTemp }}°C </span>
            <span>H: {{ item.maxTemp }}°C</span>
          </li>
        </template>
      </ul>
    </div>
    <btn-state @click.stop="clickFavorites" class="card__btn">
      {{ favorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </btn-state>
  </component>
</template>

<script>
import { apiKeyWeather } from '@/_config.js';
import dayIcon from '../../assets/images/day.png';

export default {
  name: 'card-state',
  props: {
    componentType: {
      type: String,
      default: 'li',
    },
    useDeleteCard: {
      type: Boolean,
      default: false,
    },
    selected: {
      default: false,
      type: Boolean,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    temperature: {
      type: Object,
      default: () => {},
    },
    periodDay: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      time: 'today',
      weekData: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    clickFavorites() {
      if (this.favorite) {
        this.$emit('removeCard');
      } else {
        this.$emit('addCard');
      }
    },
    switchTimeData() {
      if (this.weekData) return (this.time = 'week');
      this.loading = true;
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.city + '&appid=' + apiKeyWeather)
        .then((response) => response.json())
        .then((data) => {
          this.error = null;
          const dailyData = {};

          data.list.forEach((entry) => {
            const date = entry.dt_txt.split(' ')[0];

            if (!dailyData[date]) {
              dailyData[date] = {
                minTemp: Infinity,
                maxTemp: -Infinity,
              };
            }
            const temp = Number((entry.main.temp - 273.15).toFixed(0));
            dailyData[date].minTemp = Math.min(dailyData[date].minTemp, temp);
            dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, temp);
          });

          this.weekData = dailyData;
          this.time = 'week';
        })
        .catch(() => {
          this.error = 'Sorry, we were unable to retrieve the statistics at the moment. Please try again later or check your internet connection.';
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped>
.card {
  padding: 15px 25px;
  box-shadow: 1px 4px 12px #495cab;
  max-width: 360px;
  width: 100%;
  background-color: #fff;
  transition: 0.6s;
  border: 2px solid rgba(255, 0, 0, 0);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
.card .spinner {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 6px solid #f3f3f3;
  border-top-color: #4457a8;
}
.card__content {
  transition: 0.6s;
}
.card__subtitle {
  color: #4457a8;
  font-family: Montserrat;
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  text-transform: capitalize;
}
.card__title {
  color: #4457a8;
  font-family: Montserrat;
  font-size: 31px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 100%;
  text-align: center;
  position: relative;
  padding-bottom: 6px;
  margin-bottom: 18px;
  text-transform: capitalize;
}
.card__title::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0;
  bottom: 0;
  background-color: #4c5baa;
}
.card__img {
  height: 218px;
  overflow: hidden;
  width: 100%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  margin-bottom: 5px;
}
.card-list {
  margin-bottom: 19px;
}
.card-list__item {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  color: #4d4d4d;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: relative;
}
.card-list__item::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0;
  bottom: 0;
  background-color: #e3e3e3;
}
.card-list__item span {
  font-weight: 700;
  color: #3d53a6;
}
.selected-card {
  box-shadow: 0 0 0px rgb(17, 77, 207);
  border-color: #4c5baa;
}

.btn-delete {
  background: none;
  position: absolute;
  right: 10px;
  top: 10px;
  max-width: 32px;
}
.btn-delete svg {
  width: 100%;
  height: 100%;
}
.btn-delete path {
  transition: 0.6s;
}
.btn-delete:hover path {
  stroke: rgb(156, 2, 2);
}
.card-switch {
  display: flex;
  margin-top: 10px;
  margin-bottom: 5px;
  width: fit-content;
  margin-left: auto;
}
.card-switch__btn {
  background-color: #a3b1f5;
  padding: 8px 12px;
  font-size: 18px;
  color: #fff;
  transition: 0.6s;
}
.card-switch__btn.active {
  background-color: #4c5baa;
}
.card-switch__btn:hover {
  background-color: #4c5baa;
}
@media (max-width: 1100px) {
  .card {
    padding: 14px 17px;
  }
}
@media (max-width: 990px) {
  .card {
    margin: 0 auto;
  }
}
@media (max-width: 500px) {
  .card-list__item {
    font-size: 14px;
    padding: 8px;
  }
  .card-switch__btn {
    padding: 6px 8px;
    font-size: 14px;
  }
  .card__title {
    font-size: 26px;
  }
  .card__subtitle {
    font-size: 18px;
    margin-bottom: 3px;
  }
}
</style>
