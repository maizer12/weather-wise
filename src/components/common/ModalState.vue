<template>
  <div class="modal opacity-anim" @click="$emit('close')">
    <div class="modal__inner" @click.stop>
      <h3 class="modal__title">Important Information</h3>
      <button class="modal__close" @click="$emit('close')">
        <img src="@/assets/images/icons/close.svg" alt="close-icon" />
      </button>
      <p class="modal__text">
        <slot name="text"></slot>
      </p>
      <div class="modal__buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-state',
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  height: 100%;
  z-index: 25;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.modal__inner {
  background-color: #fff;
  padding: 20px;
  max-width: 640px;
  width: 100%;
  position: relative;
}
.modal__text {
  color: #4d4d4d;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 21px;
}
.modal__title {
  color: #4d4d4d;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 20px;
}
.modal__close {
  background: none;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: 0.6s;
}
.modal__close img {
  width: 31px;
}
.modal__close:hover {
  opacity: 0.4;
}
.modal__buttons {
  display: flex;
  justify-content: flex-end;
  column-gap: 15px;
}
@media (max-width: 500px) {
  .modal__text {
    font-size: 16px;
  }
}
</style>
