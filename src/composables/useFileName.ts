import { ref, computed } from 'vue';

export function useFileName(initialName: string = 'name') {
	const nameFile = ref(initialName);
	const isSaveDate = ref(false);

	/**
   * Конфигурация для фильтрации ввода имени файла
   */
	const listInputFileName = ref({
		include: ['-', '_'],
		exclude: ['.', ',']
	});

	/**
   * Получение текущей даты в формате локали
   * @returns Строка с текущей датой
   */
	const getDate = (): string => {
		return (new Date().toLocaleDateString()).replace(/\./g, '-');
	};

	/**
   * Вычисляемое свойство для получения полного имени файла
   */
	const getFileName = computed(() => {
		return isSaveDate.value ? `${nameFile.value}_${getDate()}` : nameFile.value;
	});

	/**
   * Получение имени файла с опциональным добавлением даты
   * @param name - Базовое имя файла
   * @param addDate - Флаг добавления даты
   * @returns Полное имя файла
   */
	const getFileNameWithDate = (name: string, addDate: boolean): string => {
		if (!name || typeof name !== 'string') {
			return 'untitled';
		}

		// Очистка имени файла от недопустимых символов
		const cleanName = name.replace(/[^a-zA-Zа-яА-Я0-9_-]/g, '_');

		return addDate ? `${cleanName}_${getDate()}` : cleanName;
	};

	/**
   * Фильтрация ввода имени файла
   * @param event - Событие нажатия клавиши
   */
	const filterInputFileName = (event: KeyboardEvent): void => {
		const key = event.key;

		// Проверка на недопустимые символы
		const isInvalidSymbol = (
			(/^\W$/.test(key) && !/^[ЁёА-я]$/.test(key) && !listInputFileName.value.include.includes(key)) ||
      listInputFileName.value.exclude.includes(key)
		);

		if (isInvalidSymbol) {
			event.preventDefault();
		}
	};

	/**
   * Установка имени файла
   * @param name - Новое имя файла
   */
	const setFileName = (name: string): void => {
		if (typeof name === 'string') {
			// Очистка имени файла от недопустимых символов
			const cleanName = name.replace(/[^a-zA-Zа-яА-Я0-9_-]/g, '_');
			nameFile.value = cleanName || 'untitled';
		}
	};

	/**
   * Установка флага добавления даты
   * @param value - Значение флага
   */
	const setSaveDate = (value: boolean): void => {
		isSaveDate.value = Boolean(value);
	};

	/**
   * Переключение флага добавления даты
   */
	const toggleSaveDate = (): void => {
		isSaveDate.value = !isSaveDate.value;
	};

	/**
   * Сброс имени файла к значению по умолчанию
   */
	const resetFileName = (): void => {
		nameFile.value = initialName;
		isSaveDate.value = false;
	};

	/**
   * Валидация имени файла
   * @param name - Имя файла для валидации
   * @returns Результат валидации
   */
	const validateFileName = (name: string): { isValid: boolean; error?: string } => {
		if (!name || typeof name !== 'string') {
			return { isValid: false, error: 'Имя файла не может быть пустым' };
		}

		if (name.length > 255) {
			return { isValid: false, error: 'Имя файла слишком длинное (максимум 255 символов)' };
		}

		// Проверка на недопустимые символы
		const invalidChars = /[<>:"/\\|?*]/;
		if (invalidChars.test(name)) {
			return { isValid: false, error: 'Имя файла содержит недопустимые символы' };
		}

		return { isValid: true };
	};

	return {
		nameFile,
		isSaveDate,
		listInputFileName,
		getFileName,
		getFileNameWithDate,
		filterInputFileName,
		setFileName,
		setSaveDate,
		toggleSaveDate,
		resetFileName,
		validateFileName
	};
}