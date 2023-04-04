export default {
	name: 'mixin',
	methods: {
		log(message) {
			console.log(`[${this.$options.name}] ${message}`);
		}
	}
};
