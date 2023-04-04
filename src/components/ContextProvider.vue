<template>
	<slot></slot>
</template>

<script>
import { provide } from 'vue';

export default {
	props: {
		baseUrl: {
			type: String,
			required: false
		},
		projectId: {
			type: String,
			required: true
		}
	},
	setup(props, { slots }) {
		const context = {
			projectId: props.projectId,
			baseUrl: props.baseUrl,
			sessionTokenViaCookie: props.sessionTokenViaCookie
		};

		provide('descopeContext', context);

		return {
			slots
		};
	}
};
</script>
