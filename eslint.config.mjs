// @ts-check
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import vuelint from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	vuelint.configs['flat/recommended'],
	{
		files: ['**/*.{js,mjs,cjs,ts,vue}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: vuelint.parser,
			parserOptions: {
				parser: {
					ts: '@typescript-eslint/parser',
					js: 'espree',
					'<template>': 'espree',
				},
			},
			globals: globals.browser,
		},
		plugins: {
			vue: vuelint,
			import: pluginImport,
			'@typescript-eslint': tseslint.plugin,
			'@stylistic': stylistic,
		},
		rules: {
			indent: 'off',
			semi: ['error', 'always'],
			quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
			'import/order': ['error', {
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				'newlines-between': 'never',
				alphabetize: { order: 'asc' },
			}],
			'no-useless-escape': 'off',

			// Vue
			'vue/no-unused-vars': 'error',
			'vue/no-v-html': 'off',
			'vue/html-indent': ['error', 'tab'],
			'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: true, ignores: [] }],

			'@typescript-eslint/no-explicit-any': 'off',
			'@stylistic/indent': ['error', 'tab'],
		},
	},
);
