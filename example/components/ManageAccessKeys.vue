<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="manage-access-keys-wrapper">
		<h1>Manage Access Keys</h1>
		<AccessKeyManagement :tenant="tenant" />
	</div>
</template>

<script setup>
import { AccessKeyManagement } from '../../src';

const tenant = process.env.VUE_APP_DESCOPE_TENANT;
</script>

<style>
.manage-access-keys-wrapper {
	margin: 20px;
}
</style>
