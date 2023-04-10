import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router';
import descope from '../dist';

const app = createApp(App);
app.use(router);
app.use(descope, {
	projectId: 'P2Nb7W8vCwFZ878Iy9r8bjEXYr8K',
	baseUrl: 'http://localhost:8000',
	sessionTokenViaCookie: true
});
app.mount('#app');
