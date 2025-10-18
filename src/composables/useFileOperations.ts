import { ref } from 'vue';
import type { FileOperationResult, DesignData } from '../types';

export function useFileOperations() {
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	/**
   * Загрузка файла
   * @param file - Файл для загрузки
   * @returns Promise с результатом операции
   */
	const uploadFile = async (file: File): Promise<FileOperationResult> => {
		isLoading.value = true;
		error.value = null;

		try {
			// Проверка типа файла
			if (!file.name.endsWith('.json')) {
				throw new Error('Поддерживаются только JSON файлы');
			}

			// Проверка размера файла (максимум 10MB)
			const maxSize = 10 * 1024 * 1024;
			if (file.size > maxSize) {
				throw new Error('Размер файла превышает 10MB');
			}

			return new Promise((resolve) => {
				const reader = new FileReader();

				reader.onload = () => {
					try {
						if (!reader.result) {
							throw new Error('Ошибка чтения файла');
						}

						const json = JSON.parse(reader.result as string);

						// Валидация JSON структуры
						if (!json || typeof json !== 'object') {
							throw new Error('Некорректная структура JSON файла');
						}

						resolve({
							success: true,
							data: json
						});
					} catch (parseError) {
						resolve({
							success: false,
							error: parseError instanceof Error ? parseError.message : 'Ошибка парсинга JSON'
						});
					} finally {
						isLoading.value = false;
					}
				};

				reader.onerror = () => {
					isLoading.value = false;
					resolve({
						success: false,
						error: 'Ошибка чтения файла'
					});
				};

				reader.readAsText(file);
			});
		} catch (err) {
			isLoading.value = false;
			const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
			error.value = errorMessage;

			return {
				success: false,
				error: errorMessage
			};
		}
	};

	/**
   * Сохранение дизайна
   * @param design - Объект дизайна для сохранения
   * @param fileName - Имя файла
   * @returns Promise с результатом операции
   */
	const saveDesign = async (design: DesignData, fileName: string): Promise<FileOperationResult> => {
		isLoading.value = true;
		error.value = null;

		try {
			// Валидация входных данных
			if (!design || typeof design !== 'object') {
				throw new Error('Некорректные данные дизайна');
			}

			if (!fileName || typeof fileName !== 'string') {
				throw new Error('Некорректное имя файла');
			}

			// Очистка имени файла
			const cleanFileName = fileName.replace(/[^a-zA-Zа-яА-Я0-9_-]/g, '_');
			const finalFileName = cleanFileName.endsWith('.json') ? cleanFileName : `${cleanFileName}.json`;

			// Создание и скачивание файла
			const jsonString = JSON.stringify(design, null, 2);
			const blob = new Blob([jsonString], { type: 'application/json' });

			// Создание временной ссылки для скачивания
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = finalFileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);

			isLoading.value = false;
			return {
				success: true,
				data: { fileName: finalFileName }
			};
		} catch (err) {
			isLoading.value = false;
			const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
			error.value = errorMessage;

			return {
				success: false,
				error: errorMessage
			};
		}
	};

	/**
   * Экспорт в HTML
   * @param html - HTML контент для экспорта
   * @param fileName - Имя файла
   * @returns Promise с результатом операции
   */
	const exportHtml = async (html: string, fileName: string): Promise<FileOperationResult> => {
		isLoading.value = true;
		error.value = null;

		try {
			// Валидация входных данных
			if (!html || typeof html !== 'string') {
				throw new Error('Некорректный HTML контент');
			}

			if (!fileName || typeof fileName !== 'string') {
				throw new Error('Некорректное имя файла');
			}

			// Очистка имени файла
			const cleanFileName = fileName.replace(/[^a-zA-Zа-яА-Я0-9_-]/g, '_');
			const finalFileName = cleanFileName.endsWith('.html') ? cleanFileName : `${cleanFileName}.html`;

			// Создание и скачивание файла
			const blob = new Blob([html], { type: 'text/html' });

			// Создание временной ссылки для скачивания
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = finalFileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);

			isLoading.value = false;
			return {
				success: true,
				data: { fileName: finalFileName }
			};
		} catch (err) {
			isLoading.value = false;
			const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
			error.value = errorMessage;

			return {
				success: false,
				error: errorMessage
			};
		}
	};

	return {
		isLoading,
		error,
		uploadFile,
		saveDesign,
		exportHtml
	};
}
