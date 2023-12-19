<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<descope-wc
			:project-id="projectId"
			:base-url="baseUrl"
			:flow-id="flowId"
			:theme.attr="theme"
			:locale.attr="locale"
			:tenant.attr="tenant"
			:debug.attr="debug"
			:telemetryKey.attr="telemetryKey"
			:redirect-url="redirectUrl"
			:auto-focus="autoFocus"
			:errorTransformer.prop="errorTransformer"
			:form="formStr"
			:client="clientStr"
			@success="onSuccess"
			@error="onError"
		/>
	</div>
</template>

<script setup lang="ts">
import DescopeWcClass from '@descope/web-component';
import { useOptions, useDescope } from './hooks';
import { baseHeaders } from './constants';
import { RequestConfig } from '@descope/core-js-sdk';
import { computed } from 'vue';

DescopeWcClass.sdkConfigOverrides = { baseHeaders };

const props = defineProps({
	flowId: {
		type: String,
		required: true
	},
	tenant: {
		type: String
	},
	theme: {
		type: String
	},
	locale: {
		type: String
	},
	debug: {
		type: Boolean
	},
	telemetryKey: {
		type: String
	},
	redirectUrl: {
		type: String
	},
	autoFocus: {
		type: Boolean
	},
	errorTransformer: {
		type: Function
	},
	form: {
		type: Object
	},
	client: {
		type: Object
	}
});
const emit = defineEmits(['success', 'error']);
const { projectId, baseUrl } = useOptions();
const sdk = useDescope();

const formStr = computed(() => JSON.stringify(props.form));
const clientStr = computed(() => JSON.stringify(props.client));
const onSuccess = async (e: CustomEvent) => {
	await sdk.httpClient.hooks?.afterRequest?.(
		{} as RequestConfig,
		new Response(JSON.stringify(e.detail))
	);
	emit('success', e);
};

const onError = (e: Event) => emit('error', e);
</script>
