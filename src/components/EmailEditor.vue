<template>
	<EmailEditor
		ref="emailEditorRef"
		:appearance="appearance"
		:project-id="projectId"
		:options="options"
		:locale="locale"
		@load="editorLoaded"
		@ready="editorReady"
	/>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { EmailEditor } from 'vue-email-editor';
import { useEditorOperations } from '../composables/useEditorOperations';

// Props
interface Props {
	projectId: number;
	locale?: string;
	appearance?: object;
	options?: object;
}

withDefaults(defineProps<Props>(), {
	locale: 'ru-RU',
	appearance: () => ({}),
	options: () => ({})
});

// Emits
const emit = defineEmits<{
	'editor-load': [];
	'editor-ready': [];
}>();

// Composables
const {
	setEditorInstance,
	registerImageCallback
} = useEditorOperations();

// Refs
const emailEditorRef = useTemplateRef<typeof EmailEditor>('emailEditorRef');

// Methods
const editorLoaded = () => {
	emit('editor-load');
};

const editorReady = async () => {
	if (!emailEditorRef.value) return;

	try {
		// Установка экземпляра редактора
		setEditorInstance({ editor: emailEditorRef.value.editor });

		// Регистрация callback для загрузки изображений
		await registerImageCallback();

		emit('editor-ready');
	} catch (err) {
		console.error('Ошибка при инициализации редактора:', err);
	}
};
</script>
