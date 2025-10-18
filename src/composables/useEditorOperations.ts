import { computed, ref } from 'vue';
import type { EditorInstance, DesignData, ImageUploadCallback, ImageUploadData } from '../types';

// Реактивный singleton для хранения экземпляра редактора
let editorInstanceRef: EditorInstance | null = null;

export function useEditorOperations() {
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	const editorInstance = computed<EditorInstance | null>(() => editorInstanceRef);

	/**
   * Установка экземпляра редактора
   * @param instance - Экземпляр редактора
   */
	const setEditorInstance = (instance: EditorInstance | null) => {
		editorInstanceRef = instance;
	};

	/**
   * Загрузка дизайна в редактор
   * @param json - Объект дизайна для загрузки
   * @returns Promise с результатом операции
   */
	const loadDesign = async (json: DesignData): Promise<boolean> => {
		if (!editorInstance.value) {
			error.value = 'Редактор не инициализирован';
			return false;
		}

		isLoading.value = true;
		error.value = null;

		try {
			// Валидация входных данных
			if (!json || typeof json !== 'object') {
				throw new Error('Некорректные данные дизайна');
			}

			// Загрузка дизайна в редактор
			editorInstance.value.editor.loadDesign(json);

			isLoading.value = false;
			return true;
		} catch (err) {
			isLoading.value = false;
			const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
			error.value = errorMessage;
			return false;
		}
	};

	/**
   * Установка параметров тела письма
   * @param values - Объект с параметрами тела письма
   * @returns Promise с результатом операции
   */
	const setBodyValues = async (values: Record<string, any>): Promise<boolean> => {
		if (!editorInstance.value) {
			error.value = 'Редактор не инициализирован';
			return false;
		}

		isLoading.value = true;
		error.value = null;

		try {
			// Валидация входных данных
			if (!values || typeof values !== 'object') {
				throw new Error('Некорректные параметры тела письма');
			}

			// Установка параметров тела письма
			editorInstance.value.editor.setBodyValues(values);

			isLoading.value = false;
			return true;
		} catch (err) {
			isLoading.value = false;
			const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
			error.value = errorMessage;
			return false;
		}
	};

	/**
   * Регистрация callback для загрузки изображений
   * @returns Promise с результатом операции
   */
	const registerImageCallback = async (): Promise<boolean> => {
		if (!editorInstance.value) {
			error.value = 'Редактор не инициализирован';
			return false;
		}

		isLoading.value = true;
		error.value = null;

		try {
			// Создание callback для обработки изображений
			const imageCallback: ImageUploadCallback = (file: ImageUploadData, done) => {
				// Проверка наличия файла
				const attachment: File | undefined = file.attachments?.[0];
				if (!attachment) {
					done({ progress: 100, url: '' });
					return;
				}

				// Проверка размера файла (максимум 5MB)
				const MAX_BYTES = 5 * 1024 * 1024;
				if (attachment.size > MAX_BYTES) {
					error.value = 'Файл слишком большой. Максимум 5 MB';
					done({ progress: 100, url: '' });
					return;
				}

				const reader = new FileReader();

				// Обработка прогресса загрузки
				reader.onprogress = (ev) => {
					if (ev.lengthComputable) {
						const percent = Math.round((ev.loaded / ev.total) * 100);
						done({ progress: percent });
					}
				};

				// Успешное завершение загрузки
				reader.onload = () => {
					const dataUrl = reader.result as string;
					done({ progress: 100, url: dataUrl });
				};

				// Обработка ошибки чтения файла
				reader.onerror = () => {
					error.value = 'Ошибка чтения файла';
					done({ progress: 100, url: '' });
				};

				// Чтение файла в формате DataURL
				reader.readAsDataURL(attachment);
			};

			// Регистрация callback в редакторе
			editorInstance.value.editor.registerCallback('image', imageCallback);

			isLoading.value = false;
			return true;
		} catch (err) {
			isLoading.value = false;
			const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
			error.value = errorMessage;
			return false;
		}
	};

	/**
   * Сохранение дизайна
   * @returns Promise с объектом дизайна
   */
	const saveDesign = async (): Promise<DesignData | null> => {
		if (!editorInstance.value) {
			error.value = 'Редактор не инициализирован';
			return null;
		}

		isLoading.value = true;
		error.value = null;

		return new Promise((resolve) => {
			try {
				editorInstance.value!.editor.saveDesign((design: DesignData) => {
					isLoading.value = false;
					resolve(design);
				});
			} catch (err) {
				isLoading.value = false;
				const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
				error.value = errorMessage;
				resolve(null);
			}
		});
	};

	/**
   * Экспорт HTML
   * @returns Promise с HTML контентом
   */
	const exportHtml = async (): Promise<string | null> => {
		if (!editorInstance.value) {
			error.value = 'Редактор не инициализирован';
			return null;
		}

		isLoading.value = true;
		error.value = null;

		return new Promise((resolve) => {
			try {
				editorInstance.value!.editor.exportHtml((data: { html: string }) => {
					isLoading.value = false;
					resolve(data.html);
				});
			} catch (err) {
				isLoading.value = false;
				const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
				error.value = errorMessage;
				resolve(null);
			}
		});
	};

	return {
		editorInstance,
		isLoading,
		error,
		setEditorInstance,
		loadDesign,
		setBodyValues,
		registerImageCallback,
		saveDesign,
		exportHtml
	};
}