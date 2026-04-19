export const SUPPORTED_LOCALES = ['en', 'pl', 'es', 'pt', 'de', 'fr'] as const;

export type Locale = typeof SUPPORTED_LOCALES[number];