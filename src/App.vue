<template>
	<div class="h-screen">
		<div class="flex flex-col justify-between h-full">
			<div
				id="bar"
				class="bg-gray-800 text-gray-50 flex flex-row justify-between gap-4 p-3"
			>
				<div class="flex flex-row gap-8 items-center">
					<div class="flex flex-col gap-2">
						<div class="opacity-50 font-light">
							Загрузить разметку:
						</div>
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
							<span class="text-base leading-normal">{{ state.loadedFile || 'Выберите разметку' }}</span>
							<input
								ref="inputFileLoad"
								class="hidden"
								type="file"
								accept=".json"
								@change="uploadFile"
							>
						</label>
					</div>
					<div>
						<label class="flex flex-col gap-2">
							<span class="flex flex-row gap-6">
								<span class="opacity-50 font-light">Название файла:</span>
								<div class="flex items-center text-sm hover:opacity-90">
									<input
										id="is-save-date"
										v-model="state.isSaveDate"
										type="checkbox"
										class="opacity-0 absolute h-8 w-8 cursor-pointer"
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
								v-model="state.nameFile"
								type="text"
								class="border p-2 rounded border-gray-500 text-gray-300 bg-gray-700 bg-opacity-20 focus:border-sky-600 focus:bg-sky-900 focus:bg-opacity-5"
								@keypress="filterInputFileName"
							>
						</label>
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<div class="flex flex-row gap-5 justify-between">
						<div class="flex flex-row gap-3">
							<span class="opacity-50 font-light">Имя файла:</span>
							<span class="text-cyan-600 underline font-light">{{ getFileName }}</span>
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
						<button
							class="py-2 px-6 border bg-teal-900 bg-opacity-30 border-teal-600 text-teal-600 rounded hover:opacity-70 transition-opacity"
							@click="saveDesign"
						>
							Сохранить разметку
						</button>
						<button
							class="py-2 px-6 border bg-lime-900 bg-opacity-30 border-lime-600 text-lime-600 rounded hover:opacity-70 transition-opacity"
							@click="exportHtml"
						>
							Сохранить HTML
						</button>
					</div>
				</div>
			</div>

			<div class="flex h-full">
				<EmailEditor 
					ref="email-editor"
					:appearance="{
						theme: 'dark',
					}"
					:project-id="1"
					:options="{
						devices: ['mobile', 'desktop', 'tablet'],
						defaultDevice: 'desktop',
						features: {
							audit: false,
							beta: false,
							devTab: false,
							stockImages: false,
							undoRedo: true,
							ai: false
						}
					}"
					locale="ru-RU"
					@load="editorLoaded" 
					@ready="editorReady"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, useTemplateRef } from 'vue';
import { EmailEditor } from 'vue-email-editor';

const emailEditor = useTemplateRef<typeof EmailEditor>('email-editor');
const inputFileLoad = ref<HTMLInputElement | null>(null);

const state = reactive({
	listInputFileName: {
		include: ['-', '_'],
		exclude: ['.', ',']
	},
	isSaveDate: false,
	nameFile: 'name',
	loadedFile: '',
	appearance: {
		theme: 'dark',
		panels: {
			tools: {
				dock: 'right'
			}
		}
	}
});

const getDate = () => {
	return new Date().toLocaleDateString();
};

const getFileName = computed(() => {
	return state.isSaveDate ? `${state.nameFile}.${getDate()}` : state.nameFile;
});

function filterInputFileName(evt: KeyboardEvent) {
	const key = evt.key;
	if (
		(/^\W$/.test(key) && !/^[ЁёА-я]$/.test(key) && !state.listInputFileName.include.includes(key)) ||
		state.listInputFileName.exclude.includes(key)
	) {
		evt.preventDefault();
	}
}

function uploadFile() {
	if (!inputFileLoad.value || !inputFileLoad.value.files?.[0]) return;
	const fileUpload = inputFileLoad.value.files[0];
	const fileName = fileUpload.name;
	const reader = new FileReader();

	reader.onload = () => {
		if (!reader.result) return;
		const json = JSON.parse(reader.result as string);
		editorLoaded(json);
		state.loadedFile = 'Файл: ' + fileName;
		state.nameFile = fileName.split('.')[0] || 'mail-template';
	};
	reader.readAsText(fileUpload);
}

function editorReady() {
	if (!emailEditor.value) return;

	emailEditor.value.editor.setBodyValues({
		contentWidth: '600px'
	});

	// ✅ Регистрируем загрузку изображений в Base64
	emailEditor.value.editor.registerCallback('image', (file: any, done: (payload: any) => void) => {
		// file.attachments — массив File
		const attachment: File | undefined = file.attachments?.[0];
		if (!attachment) {
			done({ progress: 100, url: '' }); // на всякий случай
			return;
		}

		const MAX_BYTES = 5 * 1024 * 1024; // пример: 5MB
		if (attachment.size > MAX_BYTES) {
			alert('Файл слишком большой. Максимум 5 MB');
			return;
		}

		const reader = new FileReader();
		reader.onprogress = (ev) => {
			if (ev.lengthComputable) {
				const percent = Math.round((ev.loaded / ev.total) * 100);
				done({ progress: percent }); // обновление прогресса
			}
		};

		reader.onload = () => {
			const dataUrl = reader.result as string; // data:image/..;base64,...
			// ВАЖНО: Unlayer ждёт объект с url
			done({ progress: 100, url: dataUrl });
		};

		reader.onerror = () => {
			alert('Ошибка чтения файла');
			done({ progress: 100, url: '' });
		};

		reader.readAsDataURL(attachment);
	});
}

function editorLoaded(json?: object) {
	if (json && emailEditor.value) {
		emailEditor.value.editor.loadDesign(json);
	}
}

function saveDesign() {
	if (!emailEditor.value) return;
	emailEditor.value.editor.saveDesign((design: object) => {
		const element = document.createElement('a');
		const file = new Blob([JSON.stringify(design)], { type: 'json/plain' });
		element.href = URL.createObjectURL(file);
		element.download = `${getFileName.value}.json`;
		document.body.appendChild(element);
		element.click();
	});
}

function exportHtml() {
	if (!emailEditor.value) return;
	emailEditor.value.editor.exportHtml((data: { html: string }) => {
		const { html } = data;
		const element = document.createElement('a');
		const file = new Blob([html], { type: 'html/plain' });
		element.href = URL.createObjectURL(file);
		element.download = `${getFileName.value}.html`;
		document.body.appendChild(element);
		element.click();
	});
}
</script>
