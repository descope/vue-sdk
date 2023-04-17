<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<h1 v-if="user">Welcome to the Home Page {{ user.name || user.email }}!</h1>
		<div v-else>Loading</div>
	</div>
</template>

<script>
import { useUser } from '../../src';

export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Home',
	setup() {
		const user = useUser();

		return {
			user: user.user
		};
	}
};
</script>
