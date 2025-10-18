<template>
	<div class="h-screen">
		<div class="flex flex-col justify-between h-full">
			<!-- Панель инструментов -->
			<div
				id="bar"
				class="bg-gray-800 text-gray-50 flex flex-row justify-between gap-4 p-3"
			>
				<HeaderToolbar
					v-model:name-file="state.nameFile"
					v-model:is-save-date="state.isSaveDate"
					:loaded-file="state.loadedFile"
					@load-file="handleLoadFile"
					@save-design="handleSaveDesign"
					@export-html="handleExportHtml"
				/>
			</div>

			<!-- Редактор -->
			<div class="flex h-full">
				<EmailEditor
					:project-id="1"
					:locale="'ru-RU'"
					:appearance="state.appearance"
					:options="editorOptions"
					@editor-load="handleEditorLoad"
					@editor-ready="handleEditorReady"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import EmailEditor from './components/EmailEditor.vue';
import HeaderToolbar from './components/HeaderToolbar.vue';
import { useEditorOperations } from './composables/useEditorOperations';
import { useFileName } from './composables/useFileName';
import { useFileOperations } from './composables/useFileOperations';
import type { AppearanceConfig, EditorOptions } from './types';

// Composables
const { uploadFile } = useFileOperations();
const {
	editorInstance,
	loadDesign,
	setBodyValues,
	registerImageCallback,
	saveDesign: saveEditorDesign,
	exportHtml: exportEditorHtml,
} = useEditorOperations();
const { getFileNameWithDate } = useFileName();

// Состояние приложения
const state = reactive({
	nameFile: 'name',
	isSaveDate: false,
	loadedFile: '',
	appearance: {
		theme: 'dark' as const,
		panels: {
			tools: {
				dock: 'right',
			},
		},
	} as AppearanceConfig,
});

// Опции редактора
const editorOptions: EditorOptions = {
	devices: ['mobile', 'desktop', 'tablet'],
	defaultDevice: 'desktop',
	features: {
		audit: false,
		beta: false,
		devTab: false,
		stockImages: false,
		undoRedo: true,
		ai: false,
	},
};

// Обработчики событий
const handleLoadFile = async (file: File) => {
	if (!file || file.name === '') {
		state.loadedFile = '';
		return;
	}

	try {
		const result = await uploadFile(file);

		if (result.success && result.data) {
			await loadDesign(result.data);
			state.loadedFile = 'Файл: ' + file.name;
			state.nameFile = file.name.split('.')[0] || 'mail-template';
		}
	} catch (error) {
		console.error('Ошибка при загрузке файла:', error);
	}
};

const handleEditorLoad = () => {
	// Редактор начинает загружаться
};

const handleEditorReady = async () => {
	if (!editorInstance.value) return;

	// Установка начальных параметров
	await setBodyValues({
		contentWidth: '600px',
	});

	// Регистрация callback для загрузки изображений
	await registerImageCallback();
};

const handleSaveDesign = async () => {
	try {
		const designData = await saveEditorDesign();

		if (!designData) {
			throw new Error('Не удалось получить данные дизайна');
		}

		const fileName = getFileNameWithDate(state.nameFile, state.isSaveDate);

		// Создание и скачивание файла
		const element = document.createElement('a');
		const file = new Blob([JSON.stringify(designData)], { type: 'json/plain' });
		element.href = URL.createObjectURL(file);
		element.download = `${fileName}.json`;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	} catch (error) {
		console.error('Ошибка при сохранении дизайна:', error);
	}
};

const handleExportHtml = async () => {
	try {
		const htmlContent = await exportEditorHtml();

		if (!htmlContent) {
			throw new Error('Не удалось получить HTML контент');
		}

		const fileName = getFileNameWithDate(state.nameFile, state.isSaveDate);

		// Создание и скачивание файла
		const element = document.createElement('a');
		const file = new Blob([htmlContent], { type: 'html/plain' });
		element.href = URL.createObjectURL(file);
		element.download = `${fileName}.html`;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	} catch (error) {
		console.error('Ошибка при экспорте HTML:', error);
	}
};
</script>
