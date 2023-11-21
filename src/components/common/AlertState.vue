<template>
  <div class="alert-state">
    <img src="@/assets/images/icons/info.svg" alt="" />
    <p class="alert-state__text"><slot></slot></p>
  </div>
</template>

<script>
export default {
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
.alert-state img {
  width: 32px;
}
.alert-state__text {
  color: #000000;
  font-family: Montserrat;
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
