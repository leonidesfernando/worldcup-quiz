// src/components/Header.tsx
//import { useTranslation } from '../useTranslation';
import logo from '../assets/logo.png';
import settingsImg from '../assets/settings.png'

interface Props {
  onSettingsClick?: () => void;
}

export default function Header({ onSettingsClick }: Props) {
  //const { t } = useTranslation();

  return (
    <header className="app-header">
      <img src={logo} alt="World Cup Quiz" className="app-logo" />

      {onSettingsClick && (
        <button onClick={onSettingsClick} className="settings-btn" aria-label="Settings">
          <img src={settingsImg} />
        </button>
      )}
    </header>
  );
}