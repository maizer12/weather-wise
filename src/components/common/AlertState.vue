<template>
  <div class="alert-state">
<!--    Мелочь, но - всегда добавляем alt картинке -->
    <img src="@/assets/images/icons/info.svg" alt="" />
<!--  <slot></slot> => <slot />  -->
    <p class="alert-state__text"><slot></slot></p>
  </div>
</template>

<script>
export default {
  // Даем name ВСЕГДА в PascalCase
  name: 'alert-state',
};
</script>

<style scoped>
.alert-state {
  background-color: #fff;
  display: flex;
  column-gap: 12px;
  padding: 21px;
  width: fit-content;
  align-items: center;
}
/* Энтеры ставим между стилями чтобы было разделение */
.alert-state img {
  width: 32px;
}
.alert-state__text {
  color: #000000;
  font-family: Montserrat; /* Нет фоллбека для шрифта */
  font-size: 21px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
@media (max-width: 500px) {
  .alert-state {
    padding: 14px;
    column-gap: 8px;
    align-items: flex-start;
  }
  .alert-state__text {
    font-size: 14px;
  }
  .alert-state img {
    width: 21px;
    margin-top: 2px;
  }
}
</style>
