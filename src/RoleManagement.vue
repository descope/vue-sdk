<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<descope-role-management-widget
			:project-id="projectId"
			:base-url="baseUrl"
			:theme.attr="theme"
			:tenant.attr="tenant"
			:debug.attr="debug"
			widget-id="role-management-widget"
		/>
	</div>
</template>

<script setup lang="ts">
import '@descope/role-management-widget';
import { useOptions } from './hooks';

defineProps({
	tenant: {
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
