import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router';
import descope from '../src';

const app = createApp(App);
app.use(router);
app.use(descope, {
	projectId: process.env.VUE_APP_DESCOPE_PROJECT_ID || '',
	baseUrl: process.env.VUE_APP_DESCOPE_BASE_URL || '',
	sessionTokenViaCookie: true
});
app.mount('#app');
