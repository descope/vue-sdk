<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="wrapper">
		<h1>Manage Users</h1>
		<UserManagement :tenant="tenant" />
	</div>
</template>

<script setup>
import { UserManagement } from '../../src';

const tenant = process.env.VUE_APP_DESCOPE_TENANT;
</script>

<style>
.wrapper {
	margin: 20px;
}
</style>
