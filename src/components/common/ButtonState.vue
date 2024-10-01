<template>
<!--  Вместо data-variant и вообще дата-атрибутов просто используй computed и навешивай нужные классы -->
  <button class="button" :data-variant="variant">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'btn-state',
  props: {
    variant: {
      type: String,
      // не хватает validator или же хотя бы JSDoc, чтобы тип норм было описывать
      default: 'outline',
    },
  },
};
</script>

<style scoped>
.button {
  display: block;
  padding: 16px 20px;
  background: #4457a8;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  transition: 0.4s ease-in-out;
  width: 100%;
}
.button:hover {
  background: #576dce;
}
@media (max-width: 500px) {
  .button {
    font-size: 14px;
    padding: 14px 17px;
    width: auto;
  }
}
</style>
