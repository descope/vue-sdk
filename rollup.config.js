import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import autoExternal from 'rollup-plugin-auto-external';
import typescript from 'rollup-plugin-typescript2';
import define from 'rollup-plugin-define';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
	{
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
			typescript({
				tsconfig: './tsconfig.json',
				useTsconfigDeclarationDir: true
			}),
			define({
				replacements: {
					BUILD_VERSION: JSON.stringify(packageJson.version)
				}
			}),
			autoExternal(),
			terser()
		]
	},
	{
		input: './dist/dts/index.d.ts',
		output: [{ file: packageJson.types, format: 'esm' }],
		plugins: [
			dts(),
			// del({
			// 	hook: 'buildEnd',
			// 	targets: ['./dist/dts']
			// })
		]
	}
];
