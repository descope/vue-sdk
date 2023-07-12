<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<descope-wc
			:project-id="projectId"
			:base-url="baseUrl"
			:flow-id="flowId"
			:theme.attr="theme"
			:tenant.attr="tenant"
			:debug.attr="debug"
			:telemetryKey.attr="telemetryKey"
			:redirect-url="redirectUrl"
			:auto-focus="autoFocus"
			:errorTransformer.prop="errorTransformer"
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

DescopeWcClass.sdkConfigOverrides = { baseHeaders };

defineProps({
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
	}
});
const emit = defineEmits(['success', 'error']);
const { projectId, baseUrl } = useOptions();
const sdk = useDescope();

const onSuccess = async (e: CustomEvent) => {
	// Note: We need to emit AFTER the afterRequest hook has been called, but for
	// an unknown reason, the emit is not called if we await the hook.
	emit('success', e);
	await sdk.httpClient.hooks?.afterRequest?.(
		{} as RequestConfig,
		new Response(JSON.stringify(e.detail))
	);
};

const onError = (e: Event) => emit('error', e);
</script>
