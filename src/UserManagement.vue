<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<descope-user-management-widget
			:project-id="projectId"
			:base-url="baseUrl"
			:theme.attr="theme"
			:tenant.attr="tenant"
			:debug.attr="debug"
			:widget-id="widgetId"
		/>
	</div>
</template>

<script setup lang="ts">
import '@descope/user-management-widget';
import { useOptions } from './hooks';

defineProps({
	tenant: {
		type: String,
		required: true
	},
	widgetId: {
		type: String,
		required: true
	},
	theme: {
		type: String
	},
	debug: {
		type: Boolean
	}
});

const { projectId, baseUrl } = useOptions();
</script>
