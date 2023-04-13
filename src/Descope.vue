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
			@page-updated="onPageUpdated"
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
	emits: ['success', 'error', 'page-updated'],
	setup(_: unknown, { emit }: SetupContext) {
		const { projectId, baseUrl, sessionTokenViaCookie } = useOptions();
		const sdk = useDescope();

		const onSuccess = async (e: CustomEvent) => {
			await sdk.httpClient.hooks?.afterRequest?.(
				{} as RequestConfig,
				new Response(JSON.stringify(e.detail))
			);

			emit('success', e);
		};
		const onError = (e: Event) => emit('error', e);
		const onPageUpdated = (e: Event) => emit('page-updated', e);

		return {
			projectId,
			baseUrl,
			sessionTokenViaCookie,
			onSuccess,
			onError,
			onPageUpdated
		};
	}
};
</script>
