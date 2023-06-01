import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router';
import descope from '../src';

const app = createApp(App);
app.use(router);
app.use(descope, {
	projectId: process.env.VUE_APP_PROJECT_ID || 'P2Nb7W8vCwFZ878Iy9r8bjEXYr8K',
	sessionTokenViaCookie: true
});
app.mount('#app');
