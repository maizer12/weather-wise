<template>
  <input class="input" placeholder="Enter city here" :value="modelValue" @input="updateValue" />
</template>

<script>
export default {
  name: 'input-state',
  props: ['modelValue'],

  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },

  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
};
</script>

<style scoped>
.input {
  min-width: 280px;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #272727;
  background: #fafafa;
  padding: 0 18px;
  border-bottom: 2px solid #4457a8;
  transition: 0.7s;
}
.input::placeholder {
  transition: 0.6s;
  color: #909090;
}
.input:focus::placeholder {
  opacity: 0;
}
.input:focus {
  border-color: #3498db;
}
@media (max-width: 500px) {
  .input {
    min-width: auto;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
  }
}
</style>
