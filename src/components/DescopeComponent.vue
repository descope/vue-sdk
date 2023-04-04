<template>
	<div>
		<descope-wc
			:project-id="projectId"
			:base-url="baseUrl"
			:flow-id="flowId"
		></descope-wc>
	</div>
</template>

<script>
import { inject } from 'vue';
import '@descope/web-component';
import MyMixin from '../mixins/MyMixin.js';

export default {
	mixins: [MyMixin],
	props: {
		flowId: {
			type: String,
			required: true
		}
	},
	created() {
		this.log('nnnnn');
	},
	setup() {
		const { projectId, baseUrl, sessionTokenViaCookie } =
			inject('descopeContext');

		return {
			projectId,
			baseUrl,
			sessionTokenViaCookie
		};
	}
};
</script>
