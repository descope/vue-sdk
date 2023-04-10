<template>
	<div id="routes">
		<router-link to="/">Home</router-link>
		<router-link to="/login">Login</router-link>
	</div>
	<router-view />
</template>

<script lang="ts">
export default {
	name: 'App'
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#routes {
	display: flex;
	justify-content: space-evenly;
}
</style>
