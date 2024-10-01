import './assets/style/main.css';
import { createApp } from 'vue';
import App from './App.vue';
// избегаем индекс файлов
import router from './router';
import UI from './components/common/_config';

const app = createApp(App);

// глобальные компоненты - зло
UI.map((e) => app.component(e.name, e));

app.use(router);

app.mount('#app');

/*
  ОБЩЕЕ
  1. _config.js - убираем такое, это то же, что и индекс файлы
  2. Всегда делаем компоненты с двух слов. Это уже не так обязательно, но это best practice, сразу показывает что ты минимально шаришь за конфликт имен
  3. eslint не настроен
  4. В README.md нету гайда как запускать проект
 */
