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
			@success="onSuccess"
			@error="onError"
		/>
	</div>
</template>

<script lang="ts">
import DescopeWc from '@descope/web-component';
import { useOptions, useDescope } from './hooks';
import { baseHeaders } from './constants';
import { RequestConfig } from '@descope/core-js-sdk';
import { SetupContext } from 'vue';

DescopeWc.sdkConfigOverrides = { baseHeaders };

export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Descope',
	props: {
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
		}
	},
	emits: ['success', 'error'],
	setup(_: unknown, { emit }: SetupContext) {
		const { projectId, baseUrl, sessionTokenViaCookie } = useOptions();
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

		return {
			projectId,
			baseUrl,
			sessionTokenViaCookie,
			onSuccess,
			onError
		};
	}
};
</script>
