<script>
import { debounce } from 'lodash';
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    errorCard: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchQuery: '',
      selectedItem: '',
      closeSearch: false,
      autoCompleteResults: [],
      err: '',
      apiKeyWeather: 'd4b4f4b2c5a2a6b4a5b4a6b4a5b4a6b4',
      geoNames: 'mizer123',
    };
  },
  methods: {
    getAutoCompleteResults: debounce(async function (query) {
      if (query.length < 1) {
        this.autoCompleteResults = [];
        return;
      }
      const apiUrl = `https://secure.geonames.org/searchJSON?q=${query}&maxRows=10&username=${this.geoNames}`;

      try {
        const response = await fetch(apiUrl);
        const { geonames } = await response.json();
        const uniqueCityNames = new Set();
        this.err = '';
        this.autoCompleteResults = geonames.filter((e) => {
          if (e.name.split(' ').length === 1 && !uniqueCityNames.has(e.name)) {
            uniqueCityNames.add(e.name);
            return true;
          }
          return false;
        });
      } catch (error) {
        this.err = 'Sorry, autocomplete is temporarily unavailable, but you can manually enter the city name.';
      }
    }, 500),
    selectCity(elem) {
      this.searchQuery = elem.name + ' , ' + (elem.countryName || elem.name);
      this.selectedItem = elem;
      this.startSearch(this.selectedItem);
    },
    startSearch(ell) {
      if (!ell.name) return (this.err = 'Please fill in the required field.');
      this.$emit('search', ell);
    },
    handelBlur() {
      setTimeout(() => {
        this.closeSearch = true;
      }, 300);
    },
  },
  watch: {
    searchQuery(newSearch) {
      this.closeSearch = false;
      this.getAutoCompleteResults(newSearch);
    },
  },
};
</script>

<template>
  <div class="search">
    <p v-if="errorCard.length || err.length" class="error opacity-anim">*{{ errorCard || err }}</p>
    <div class="search__inner">
      <div class="search-form">
        <input-state v-model="searchQuery" @blur="handelBlur" />
        <btn-state @click="startSearch(selectedItem || { name: this.searchQuery })">
          <spinner-loader v-if="loading" /> <template v-else>Search</template>
        </btn-state>
      </div>
      <ul v-if="!!autoCompleteResults.length && !closeSearch" class="search-list">
        <li
          v-for="elem in autoCompleteResults"
          :key="elem.id"
          class="search-list__item"
          @click="selectCity(elem)"
          :class="{ 'active-item': elem.name == selectedItem.name }"
        >
          {{ elem.name }}, {{ elem.countryName || elem.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.search {
  margin-bottom: 50px;
  width: fit-content;
}
.search-form {
  display: flex;
}
.search__inner {
  position: relative;
  width: fit-content;
}
.search-list {
  background-color: #fff;
  position: absolute;
  z-index: 20;
  bottom: -7px;
  transform: translateY(100%);
  width: 100%;
  max-width: 100%;
  box-shadow: 0 0px 2px #495cab;
}
.search-list__item {
  padding: 10px;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #272727;
  cursor: pointer;
  transition: 0.6s;
}
.search-list__item:hover {
  color: #fff;
  background-color: #495cab;
}
.active-item {
  color: #fff;
  background-color: #495cab;
}
@media (max-width: 500px) {
  .search,
  .search__inner {
    width: 100%;
  }
  .search {
    margin-bottom: 37px;
  }
}
</style>
