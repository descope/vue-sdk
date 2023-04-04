import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/index.js',
		format: 'esm'
	},
	plugins: [
		vue({
			template: {
				isProduction: true
			},
			compileTemplate: true,
			compilerOptions: {
				isCustomElement: (tag) => tag.startsWith('descope-')
			}
		}),
		autoExternal()
		// terser()
	]
};
