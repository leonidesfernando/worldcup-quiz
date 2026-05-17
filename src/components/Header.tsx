// src/components/Header.tsx
import { useTranslation } from "../useTranslation";
import logo from "../assets/logo.png";
import settingsImg from "../assets/settings.png";
import shareIcon from "../assets/share.png";
import Loader from "./Loader";

interface Props {
  onSettingsClick?: () => void;
  onShareClick?: () => void;
  isSharing?: boolean;
  currentScreen?: string;        // ← Added for better control
}

export default function Header({
  onSettingsClick,
  onShareClick,
  isSharing = false,
  currentScreen,
}: Readonly<Props>) {
  const { t } = useTranslation();

  const showSettings = onSettingsClick && currentScreen !== "results";

  return (
    <header className="app-header">
      <img src={logo} alt={t("app.title")} className="app-logo" />

      <div className="header-actions">
        {/* Share Button - Only on Results */}
        {onShareClick && (
          <button
            onClick={onShareClick}
            className="header-share-btn"
            disabled={isSharing}
            aria-label="Share score"
          >
            {isSharing ? <Loader size={22} /> : <img src={shareIcon} alt="Share" />}
          </button>
        )}

        {/* Settings Button - Hide on Results screen */}
        {showSettings && (
          <button
            onClick={onSettingsClick}
            className="settings-btn"
            aria-label="Settings"
          >
            <img src={settingsImg} alt="Settings" />
          </button>
        )}
      </div>
    </header>
  );
}