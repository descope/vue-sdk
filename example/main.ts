import { createApp } from 'vue';
import App from './components/App.vue';
import router from './router';
import descope, { getSdk } from '../src';

const app = createApp(App);
app.use(router);

app.use(descope, {
	projectId:
		process.env.VUE_APP_DESCOPE_PROJECT_ID || 'P2KFKhheHR9aICDa9kYkrGsYNnk3',
	baseUrl: process.env.VUE_APP_DESCOPE_BASE_URL || '',
	sessionTokenViaCookie: true
});

const sdk = getSdk();
sdk?.onSessionTokenChange((newSession) => {
	// here you can implement custom logic when the session is changing
});

app.mount('#app');
