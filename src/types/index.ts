// Определения типов для приложения mail-editor

export interface AppState {
	listInputFileName: {
		include: string[];
		exclude: string[];
	};
	isSaveDate: boolean;
	nameFile: string;
	loadedFile: string;
	appearance: AppearanceConfig;
}

export interface AppearanceConfig {
	theme: 'dark' | 'light' | 'modern';
	panels?: PanelConfig;
}

export interface PanelConfig {
	tools?: {
		dock?: 'left' | 'right';
	};
}

export interface EditorOptions {
	devices: ('mobile' | 'desktop' | 'tablet')[];
	defaultDevice: 'mobile' | 'desktop' | 'tablet';
	features: FeatureFlags;
}

export interface FeatureFlags {
	audit: boolean;
	beta: boolean;
	devTab: boolean;
	stockImages: boolean;
	undoRedo: boolean;
	ai: boolean;
}

export interface FileOperationResult {
	success: boolean;
	error?: string;
	data?: any;
}

export interface ImageUploadData {
	attachments?: File[];
	progress?: number;
	url?: string;
}

export interface ImageUploadCallback {
	(file: ImageUploadData, done: (payload: { progress: number; url?: string }) => void): void;
}

export interface DesignData {
	[key: string]: any;
}

export interface ExportHtmlData {
	html: string;
}

export interface EditorInstance {
	editor: {
		loadDesign: (design: DesignData) => void;
		saveDesign: (callback: (design: DesignData) => void) => void;
		exportHtml: (callback: (data: ExportHtmlData) => void) => void;
		setBodyValues: (values: Record<string, any>) => void;
		registerCallback: (type: 'image', callback: ImageUploadCallback) => void;
	};
}