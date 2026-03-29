export const SUPPORTED_LOCALES = ['en', 'pl', 'es', 'pt'] as const;

export type Locale = typeof SUPPORTED_LOCALES[number];