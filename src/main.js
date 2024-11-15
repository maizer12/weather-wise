import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import UI from './components/common/_config';
import './assets/style/main.css';

const app = createApp(App);

UI.map((e) => app.component(e.name, e));

app.use(router);

app.mount('#app');
