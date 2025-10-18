<template>
	<label class="flex flex-col gap-2">
		<span class="flex flex-row gap-6">
			<span class="opacity-50 font-light">Название файла:</span>
			<div class="flex items-center text-sm hover:opacity-90">
				<input
					id="is-save-date"
					v-model="saveDate"
					type="checkbox"
					class="opacity-0 absolute h-8 w-8 cursor-pointer"
					@change="updateSaveDate"
				>
				<div
					class="bg-transparent border rounded-xl border-cyan-400 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-1 focus-within:border-cyan-500 cursor-pointer"
				>
					<svg
						class="fill-current hidden w-2 h-2 text-cyan-400 pointer-events-none"
						version="1.1"
						viewBox="0 0 17 12"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							fill="none"
							fill-rule="evenodd"
						>
							<g
								transform="translate(-9 -11)"
								class="fill-current"
							>
								<path
									d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
								/>
							</g>
						</g>
					</svg>
				</div>
				<label
					for="is-save-date"
					class="select-none text-xs text-cyan-600 cursor-pointer font-normal"
				>Добавлять дату в имя файла</label>
			</div>
		</span>
		<input
			v-model="fileName"
			type="text"
			class="border p-2 rounded border-gray-500 text-gray-300 bg-gray-700 bg-opacity-20 focus:border-sky-600 focus:bg-sky-900 focus:bg-opacity-5"
			@keydown="filterInputFileName"
			@input="updateFileName"
		>
	</label>

	<div
		v-if="validationError"
		class="text-red-500 text-sm mt-2"
	>
		{{ validationError }}
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFileName } from '../composables/useFileName';

// Props
interface Props {
	nameFile?: string;
	isSaveDate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	nameFile: 'name',
	isSaveDate: false
});

// Emits
const emit = defineEmits<{
	'update:nameFile': [value: string];
	'update:isSaveDate': [value: boolean];
}>();

// Composables
const {
	filterInputFileName,
	validateFileName,
	setFileName,
	setSaveDate
} = useFileName(props.nameFile);

// Refs
const fileName = ref(props.nameFile);
const saveDate = ref(props.isSaveDate);
const validationError = ref('');

// Watch for props changes
watch(() => props.nameFile, (newValue) => {
	fileName.value = newValue;
});

watch(() => props.isSaveDate, (newValue) => {
	saveDate.value = newValue;
});

// Methods
const updateFileName = () => {
	const validation = validateFileName(fileName.value);

	if (!validation.isValid) {
		validationError.value = validation.error || '';
		return;
	}

	validationError.value = '';
	setFileName(fileName.value);
	emit('update:nameFile', fileName.value);
};

const updateSaveDate = () => {
	setSaveDate(saveDate.value);
	emit('update:isSaveDate', saveDate.value);
};
</script>
