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
			@success="onSuccess"
			@error="onError"
			@page-updated="onPageUpdated"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import DescopeWc from '@descope/web-component';
import { useOptions, useDescope } from './hooks';
import { baseHeaders } from './constants';
import type { RequestConfig } from '@descope/core-js-sdk';
import type descopeSdk from '@descope/web-js-sdk';
type SDK = ReturnType<typeof descopeSdk>;

DescopeWc.sdkConfigOverrides = { baseHeaders };
const props = defineProps({
	projectId: {
		type: String
	},
	baseUrl: {
		type: String
	},
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
});
const emit = defineEmits(['success', 'error', 'page-updated']);
let _projectId: string;
let _baseUrl: string;
let httpClient: SDK['httpClient'];
try {
	({ projectId: _projectId, baseUrl: _baseUrl } = useOptions());
	({ httpClient } = useDescope());
	// eslint-disable-next-line no-empty
} catch {}

const onSuccess = async (e: CustomEvent) => {
	await httpClient?.hooks?.afterRequest?.(
		{} as RequestConfig,
		new Response(JSON.stringify(e.detail))
	);
	emit('success', e);
};
const onError = (e: Event) => emit('error', e);
const onPageUpdated = (e: Event) => emit('page-updated', e);
const projectId = computed(() => props.projectId || _projectId);
const baseUrl = computed(() => props.baseUrl || _baseUrl);
</script>
