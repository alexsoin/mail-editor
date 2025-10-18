<template>
	<div class="flex flex-row justify-between gap-4 w-full">
		<div class="flex flex-row gap-8 items-center">
			<div class="flex flex-col gap-2">
				<div class="opacity-50 font-light">
					Загрузить разметку:
				</div>
				<FileUploader
					:loaded-file="loadedFile"
					@file-selected="handleFileSelected"
				/>
			</div>
			<div>
				<FileNameSettings
					v-model:name-file="localNameFile"
					v-model:is-save-date="localIsSaveDate"
				/>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex flex-row gap-5 justify-between">
				<div class="flex flex-row gap-3">
					<span class="opacity-50 font-light">Имя файла:</span>
					<span class="text-cyan-600 underline font-light">{{ computedFileNameWithDate }}</span>
				</div>
				<a
					href="https://github.com/alexsoin/mail-editor"
					target="_blank"
					title="репозиторий проекта"
					class="block opacity-50 hover:opacity-100"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							class="fill-current"
							clip-rule="evenodd"
							d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C27.42 29.06 32 23.06 32 16C32 7.16 24.84 0 16 0V0Z"
							fill="#24292E"
						/>
					</svg>
				</a>
			</div>
			<div class="flex flex-row justify-end gap-5">
				<ActionButtons
					:file-name-with-date="computedFileNameWithDate"
					@save-design="handleSaveDesign"
					@export-html="handleExportHtml"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useFileName } from '../composables/useFileName';
import ActionButtons from './ActionButtons.vue';
import FileNameSettings from './FileNameSettings.vue';
import FileUploader from './FileUploader.vue';

// Props
interface Props {
	loadedFile?: string;
	nameFile?: string;
	isSaveDate?: boolean;
	fileNameWithDate?: string;
}

const props = withDefaults(defineProps<Props>(), {
	loadedFile: '',
	nameFile: 'name',
	isSaveDate: false,
	fileNameWithDate: ''
});

// Emits
const emit = defineEmits<{
	'update:nameFile': [value: string];
	'update:isSaveDate': [value: boolean];
	'load-file': [file: File];
	'save-design': [];
	'export-html': [];
}>();

// Composables
const { getFileNameWithDate } = useFileName();

// Refs
const localNameFile = ref(props.nameFile);
const localIsSaveDate = ref(props.isSaveDate);

// Computed
const computedFileNameWithDate = computed(() => {
	return getFileNameWithDate(localNameFile.value, localIsSaveDate.value);
});

// Watch for props changes
watch(() => props.nameFile, (newValue) => {
	localNameFile.value = newValue;
});

watch(() => props.isSaveDate, (newValue) => {
	localIsSaveDate.value = newValue;
});

// Watch for local changes and emit to parent
watch(localNameFile, (newValue) => {
	emit('update:nameFile', newValue);
});

watch(localIsSaveDate, (newValue) => {
	emit('update:isSaveDate', newValue);
});

// Methods
const handleFileSelected = (file: File) => {
	emit('load-file', file);
};

const handleSaveDesign = () => {
	emit('save-design');
};

const handleExportHtml = () => {
	emit('export-html');
};
</script>
