import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';
import typescript from '@rollup/plugin-typescript';
// import typescript from 'rollup-plugin-typescript2';
import define from 'rollup-plugin-define';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/index.js',
		format: 'esm'
	},
	plugins: [
		define({
			replacements: {
				BUILD_VERSION: JSON.stringify(require('./package.json').version)
			}
		}),
		resolve({
			browser: true
		}),
		commonjs(),
		vue({
			template: {
				isProduction: true
			},
			compileTemplate: true,
			compilerOptions: {
				isCustomElement: (tag) => tag.startsWith('descope-')
			}
		}),
		typescript({ tsconfig: './tsconfig.json' }),
		autoExternal()
		// terser()
	]
};
