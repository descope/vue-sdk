<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<h1>Welcome to the Home Page!</h1>
		<div v-if="isLoading">Loading</div>
	</div>
</template>

<script>
import { useSession } from '../../dist';

export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Home',
	setup() {
		const session = useSession();

		return {
			isLoading: session.isLoading
		};
	}
};
</script>
