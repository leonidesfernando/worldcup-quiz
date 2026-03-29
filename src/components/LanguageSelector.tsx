import ReactCountryFlag from "react-country-flag"
import Select from 'react-select';
import { useTranslation } from "../useTranslation";

const languageOptions = [
  { value: 'de', label: 'Deutsch', flag: 'DE' },
  { value: 'en', label: 'English', flag: 'US' },
  { value: 'es', label: 'Español', flag: 'ES' },
  { value: 'fr', label: 'Français', flag: 'FR' },
  { value: 'pl', label: 'Polski', flag: 'PL' },
  { value: 'pt-BR', label: 'Português (BR)', flag: 'BR' },
];

const customStyles = {
  control: (base: any) => ({
    ...base,
    borderRadius: '0.5rem',
    borderColor: '#d1d5db',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '0.3rem',
    minWidth: '160px',
  }),
  option: (base: any) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),
};

export default function LanguageSelector() {

    const { lang, setLanguage } = useTranslation();

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
          classNamePrefix="lang"/>
    )
}