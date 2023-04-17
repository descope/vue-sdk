<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="wrapper">
		<p v-if="isLoading">Loading...</p>
		<div v-else-if="isAuthenticated">
			<h1>You are already authenticated</h1>
		</div>
		<Descope
			v-else
			flowId="sign-in"
			theme="light"
			@error="handleEvent"
			@success="handleEvent"
			@page-updated="handleEvent"
		/>
	</div>
</template>

<script>
import { Descope, useSession } from '../../src';

export default {
	components: {
		Descope
	},
	setup() {
		const handleEvent = (e) => {
			console.log('Got new event', e);
		};

		const session = useSession();

		return {
			handleEvent,
			isLoading: session.isLoading,
			isAuthenticated: session.isAuthenticated
		};
	}
};
</script>

<style>
.wrapper {
	margin: 20px;
}
</style>
