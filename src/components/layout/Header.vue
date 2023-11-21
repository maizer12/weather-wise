<template>
  <header class="header">
    <div class="header__inner container">
      <router-link to="/"><img src="@/assets/images/logo.svg" alt="logo" class="logo" /></router-link>
      <nav class="menu">
        <router-link to="/" class="menu__link">Home</router-link>
        <router-link to="/favorite" class="menu__link">Favorite Places</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  padding: 15px 0;
  background-color: #f7f6f6;
  box-shadow: 0px 1px 11px #777481;
}
.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu {
  display: flex;
  column-gap: 34px;
}
.menu__link {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 18px;
  font-weight: 500;
  color: #999999;
  transition: 0.6s;
  position: relative;
}
.menu__link::after {
  content: '';
  width: 0;
  transition: 0.6s;
  position: absolute;
  background-color: #000;
  height: 1px;
  left: 0;
  bottom: 0;
}
.menu__link:hover {
  color: #000;
}
.menu__link:hover.menu__link::after {
  width: 100%;
}
.menu__link.router-link-exact-active.menu__link::after {
  width: 100%;
}
.menu__link.router-link-exact-active {
  color: #000;
}
@media (max-width: 767px) {
  .logo {
    max-width: 140px;
  }
}
@media (max-width: 500px) {
  .logo {
    max-width: 120px;
  }
  .menu {
    column-gap: 10px;
  }
  .menu__link {
    font-size: 14px;
  }
}
</style>
