<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="wrapper">
		<h2>Set Project ID with "VUE_APP_PROJECT_ID=foo" in .env.local</h2>
		<p v-if="isLoading">Loading...</p>
		<div v-else-if="isAuthenticated">
			<h1>You are authenticated</h1>
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

<script setup>
import { Descope, useSession } from '../../src';

const handleEvent = (e) => {
	console.log('Got new event', e);
};
const { isLoading, isAuthenticated } = useSession();
</script>

<style>
.wrapper {
	margin: 20px;
}
</style>
