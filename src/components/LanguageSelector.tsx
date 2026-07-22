import ReactCountryFlag from "react-country-flag"
import Select from 'react-select';
import { useTranslation } from "../useTranslation";
import { useSettings } from "../components/SettingsContext";

const languageOptions = [
  { value: 'de', label: 'Deutsch', flag: 'DE' },
  { value: 'en', label: 'English', flag: 'US' },
  { value: 'es', label: 'Español', flag: 'ES' },
  { value: 'fr', label: 'Français', flag: 'FR' },
  { value: 'hi', label: 'हिन्दी', flag: 'IN' },
  { value: 'pl', label: 'Polski', flag: 'PL' },
  { value: 'pt-BR', label: 'Português (BR)', flag: 'BR' }
];

export default function LanguageSelector() {
  const { lang, setLanguage } = useTranslation();
  const { isDarkMode } = useSettings();

  const customStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: '0.5rem',
      borderColor: isDarkMode ? '#3b4f7c' : '#d1d5db',
      backgroundColor: isDarkMode ? '#1e2d4a' : '#ffffff',
      boxShadow: isDarkMode
        ? '0 2px 8px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.1)',
      padding: '0.3rem',
      minWidth: '160px',
      color: isDarkMode ? '#f1f5f9' : '#1e293b',
      '&:hover': {
        borderColor: isDarkMode ? '#60a5fa' : '#93b4f8',
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDarkMode ? '#f1f5f9' : '#1e293b',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDarkMode ? '#1a2540' : '#ffffff',
      border: isDarkMode ? '1.5px solid #3b4f7c' : '1.5px solid #e2e8f0',
      borderRadius: '0.75rem',
      boxShadow: isDarkMode
        ? '0 8px 30px rgba(0,0,0,0.45)'
        : '0 8px 30px rgba(0,0,0,0.12)',
      overflow: 'hidden',
    }),
    menuList: (base: any) => ({
      ...base,
      padding: '0.25rem',
    }),
    option: (base: any, state: any) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      borderRadius: '0.5rem',
      backgroundColor: state.isSelected
        ? isDarkMode ? '#1e2d4a' : '#eff6ff'
        : state.isFocused
          ? isDarkMode ? '#263a5e' : '#f0f4ff'
          : 'transparent',
      color: state.isSelected
        ? isDarkMode ? '#60a5fa' : '#1d4ed8'
        : isDarkMode ? '#e2e8f0' : '#1e293b',
      fontWeight: state.isSelected ? 700 : 500,
      cursor: 'pointer',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: isDarkMode ? '#93b4f8' : '#64748b',
      '&:hover': {
        color: isDarkMode ? '#60a5fa' : '#2563eb',
      },
    }),
  };

  return (
    <Select
      options={languageOptions}
      value={languageOptions.find(opt => opt.value === lang)}
      onChange={(selected) => setLanguage(selected!.value as any)}
      formatOptionLabel={(option) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ReactCountryFlag countryCode={option.flag} svg />
          {option.label}
        </div>
      )}
      styles={customStyles}
      isSearchable={false}
      className=""
      classNamePrefix="lang"
    />
  );
}