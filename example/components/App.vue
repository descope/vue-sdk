<template>
	<header>
		<div class="routes">
			<router-link to="/">Home</router-link>
			<router-link to="/login">Login</router-link>
		</div>
		<button v-if="isAuthenticated" @click="logout">Logout</button>
	</header>
	<router-view />
</template>

<script lang="ts">
import { useSession, useDescope } from '../../src';

export default {
	name: 'App',
	setup() {
		const session = useSession();
		const sdk = useDescope();

		return {
			isAuthenticated: session.isAuthenticated,
			logout: sdk.logout
		};
	}
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.routes {
	display: flex;
	gap: 20px;
	flex-grow: 1;
}

header {
	display: flex;
}
</style>
