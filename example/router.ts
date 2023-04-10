import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import { routeGuard } from '../dist';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			beforeEnter: async (to, from, next) => {
				const isAuthenticated = await routeGuard();

				if (!isAuthenticated) {
					next({ name: 'login' });
				} else {
					next();
				}
			}
			// beforeEnter: routeGuard
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		}
	]
});

// router.beforeEach((to, from, next) => {
// 	// eslint-disable-next-line no-constant-condition
// 	if (to.meta.requiresAuth && !isAuthenticated) {
// 		next({ name: 'login' });
// 	} else {
// 		next();
// 	}
// });

export default router;
