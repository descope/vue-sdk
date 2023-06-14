<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="wrapper">
		<p v-if="isLoading">Loading...</p>
		<div v-else-if="isAuthenticated">
			<h1>You are authenticated</h1>
		</div>
		<Descope
			v-else
			flowId="sign-in"
			theme="light"
			@error="handleError"
			@success="handleSuccess"
		/>
	</div>
</template>

<script setup>
import { Descope, useSession } from '../../src';
import { useRouter } from 'vue-router';
const router = useRouter();

const handleError = (e) => {
	console.log('Got new event', e);
};

const handleSuccess = (e) => {
	console.log('Got new event', e);
	router.push({ path: '/' });
};

const { isLoading, isAuthenticated } = useSession();
</script>

<style>
.wrapper {
	margin: 20px;
}
</style>
