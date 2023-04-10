<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div v-if="isLoading">Loading</div>
		<div v-else>{{ sessionToken }}</div>
		<div v-if="isUserLoading">Loading User</div>
		<div v-else>{{ user }}</div>
		<button @click="toggleState">Click</button>
		<Descope
			flowId="sign-in"
			debug="false"
			theme="dark"
			@error="handleEvent"
			@success="handleEvent"
			@page-updated="handleEvent"
		/>
	</div>
</template>

<script>
import { Descope, useSession, useUser } from '../../src';
import { ref } from 'vue';

export default {
	components: {
		Descope
	},
	setup() {
		const flowName = ref('sign-in');

		function toggleState() {
			flowName.value = 'sign-up';
		}

		const session = useSession();
		const user = useUser();

		const handleEvent = (e) => {
			console.log(e, 'LOGIN!!');
		};

		return {
			flowName,
			toggleState,
			isLoading: session.isLoading,
			sessionToken: session.sessionToken,
			isUserLoading: user.isLoading,
			user: user.user,
			handleEvent
		};
	}
};
</script>
