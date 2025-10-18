<template>
	<div class="flex flex-row justify-end gap-5">
		<button
			:disabled="isLoading || !fileNameWithDate"
			class="py-2 px-6 border bg-teal-900 bg-opacity-30 border-teal-600 text-teal-600 rounded hover:opacity-70 transition-opacity"
			title="Сохранить дизайн"
			@click="handleSaveDesign"
		>
			Сохранить разметку
		</button>

		<button
			:disabled="isLoading || !fileNameWithDate"
			class="py-2 px-6 border bg-lime-900 bg-opacity-30 border-lime-600 text-lime-600 rounded hover:opacity-70 transition-opacity"
			title="Экспортировать HTML"
			@click="handleExportHtml"
		>
			Сохранить HTML
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEditorOperations } from '../composables/useEditorOperations';
import { useFileOperations } from '../composables/useFileOperations';

// Props
interface Props {
	fileNameWithDate: string;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
	'save-design': [];
	'export-html': [];
}>();

// Composables
const { isLoading, saveDesign, exportHtml } = useFileOperations();
const { saveDesign: saveEditorDesign, exportHtml: exportEditorHtml } = useEditorOperations();

// Refs
const isSaving = ref(false);
const isExporting = ref(false);
const successMessage = ref('');

// Methods
const handleSaveDesign = async () => {
	if (!props.fileNameWithDate) return;

	isSaving.value = true;
	successMessage.value = '';

	try {
		// Получаем данные дизайна из редактора
		const designData = await saveEditorDesign();

		if (!designData) {
			throw new Error('Не удалось получить данные дизайна');
		}

		// Сохраняем дизайн в файл
		const result = await saveDesign(designData, props.fileNameWithDate);

		if (result.success) {
			successMessage.value = `Дизайн сохранен как ${result.data?.fileName || props.fileNameWithDate}`;
			emit('save-design');
		}
	} catch (err) {
		console.error('Ошибка при сохранении дизайна:', err);
	} finally {
		isSaving.value = false;
	}
};

const handleExportHtml = async () => {
	if (!props.fileNameWithDate) return;

	isExporting.value = true;
	successMessage.value = '';

	try {
		// Получаем HTML из редактора
		const htmlContent = await exportEditorHtml();

		if (!htmlContent) {
			throw new Error('Не удалось получить HTML контент');
		}

		// Экспортируем HTML в файл
		const result = await exportHtml(htmlContent, props.fileNameWithDate);

		if (result.success) {
			successMessage.value = `HTML экспортирован как ${result.data?.fileName || props.fileNameWithDate}`;
			emit('export-html');
		}
	} catch (err) {
		console.error('Ошибка при экспорте HTML:', err);
	} finally {
		isExporting.value = false;
	}
};
</script>
