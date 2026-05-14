// src/components/Header.tsx
import { useTranslation } from "../useTranslation";
import logo from "../assets/logo.png";
import settingsImg from "../assets/settings.png";
import shareIcon from "../assets/share.png";

interface Props {
  onSettingsClick?: () => void;
  onShareClick?: () => void;
}

export default function Header({
  onSettingsClick,
  onShareClick,
}: Readonly<Props>) {
  const { t } = useTranslation();

  return (
    <header className="app-header">
      {onShareClick && (
        <button
          onClick={onShareClick}
          className="header-share-btn"
          aria-label="Share score"
        >
          <img src={shareIcon} alt="Share" />
        </button>
      )}

      <img src={logo} alt={t("app.title")} className="app-logo" />
      {onSettingsClick && (
        <button
          onClick={onSettingsClick}
          className="settings-btn"
          aria-label="Settings"
        >
          <img src={settingsImg} />
        </button>
      )}
    </header>
  );
}
