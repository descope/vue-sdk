<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="wrapper">
		<p v-if="isLoading">Loading...</p>
		<div v-else-if="isAuthenticated">
			<h1>You are authenticated</h1>
		</div>
		<Descope
			flowId="sign-up-or-in"
			v-bind:debug="true"
			@error="handleError"
			@success="handleSuccess"
			:errorTransformer="errorTransformer"
		/>
	</div>
</template>

<script setup>
import { Descope, useSession } from '../../src';
import { useRouter } from 'vue-router';
const router = useRouter();

const handleError = (e) => {
	console.log('Got error', e);
};

const handleSuccess = (e) => {
	console.log('Logged in', e);
	router.push({ path: '/' });
};

const errorTransformer = (error) => {
	const translationMap = {
		SAMLStartFailed: 'Failed to start SAML flow'
	};
	return translationMap[error.type] || error.text;
};

const { isLoading, isAuthenticated } = useSession();
const flowId = process.env.VUE_APP_DESCOPE_FLOW_ID || 'sign-up-or-in';
</script>

<style>
.wrapper {
	margin: 20px;
}
</style>
