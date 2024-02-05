import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import ManageUsers from './components/ManageUsers.vue';
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
			// Alternative method to guard route implemented in the beforeEach bellow:
			/*
			beforeEnter: async (to, from, next) => {
			  // alternative method to guard route
				const isAuthenticated = await routeGuard();
				if (!isAuthenticated) {
					next({ name: 'login' });
				} else {
					next();
				}
			}
			*/
			// alternative method to guard route implemented in the beforeEach bellow:
			// beforeEnter: routeGuard
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/manage-users',
			name: 'manage-users',
			component: ManageUsers
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
