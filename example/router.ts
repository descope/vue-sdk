import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import { routeGuard } from '../src';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				requiresAuth: true
			}
			// beforeEnter: async (to, from, next) => {
			//   // alternative method to guard route
			// 	const isAuthenticated = await routeGuard();
			// 	if (!isAuthenticated) {
			// 		next({ name: 'login' });
			// 	} else {
			// 		next();
			// 	}
			// }
			// beforeEnter: routeGuard
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		}
	]
});

router.beforeEach(async (to, from, next) => {
	const isAuthenticated = await routeGuard();
	if (to.meta.requiresAuth && !isAuthenticated) {
		next({ name: 'login' });
	} else {
		next();
	}
});

export default router;
