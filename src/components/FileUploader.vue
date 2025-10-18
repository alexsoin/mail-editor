<template>
	<div>
		<label
			class="flex flex-row gap-3 justify-center items-center px-4 py-1 bg-sky-900 bg-opacity-30 text-sky-600 border border-sky-600 rounded cursor-pointer transition-colors hover:opacity-70"
		>
			<svg
				class="w-8 h-8 fill-current"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
			>
				<path
					d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
				/>
			</svg>
			<span class="text-base leading-normal">{{ loadedFile || 'Выберите разметку' }}</span>
			<input
				ref="fileInput"
				class="hidden"
				type="file"
				accept=".json"
				:disabled="isLoading"
				@change="handleFileChange"
			>
		</label>

		<div
			v-if="error"
			class="text-red-500 text-sm mt-2"
		>
			{{ error }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFileOperations } from '../composables/useFileOperations';

// Props
interface Props {
	loadedFile?: string;
}

withDefaults(defineProps<Props>(), {
	loadedFile: ''
});

// Emits
const emit = defineEmits<{
	'file-selected': [file: File];
}>();

// Composables
const { isLoading, error, uploadFile } = useFileOperations();

// Refs
const fileInput = ref<HTMLInputElement>();

// Methods
const handleFileChange = async (event: Event) => {
	const target = event.target as HTMLInputElement;
	const file = target.files?.[0];

	if (!file) return;

	try {
		const result = await uploadFile(file);

		if (result.success) {
			emit('file-selected', file);
		}
	} catch (err) {
		console.error('Ошибка при загрузке файла:', err);
	}

	// Сброс значения input для возможности повторной загрузки того же файла
	target.value = '';
};

</script>
