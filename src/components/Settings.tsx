// src/components/Settings.tsx
import { useTranslation } from "../useTranslation";
import LanguageSelector from "./LanguageSelector";
import { useSettings } from "../components/SettingsContext";

interface Props {
  onClose: () => void;
}

export default function Settings({ onClose }: Readonly<Props>) {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode, isTimerEnabled, toggleTimer } = useSettings();

  return (
    <div className="settings-screen">
      <div className="settings-container">
        <h2 className="settings-title">{t("settings.title")}</h2>

        {/* Language */}
        <div className="settings-section">
          <h4 className="section-title">{t("settings.language")}</h4>
          <div className="language-selector-wrapper">
            <LanguageSelector />
          </div>
        </div>

        {/* Appearance — Dark Mode */}
        <div className="settings-section">
          <h3 className="section-title">{t("settings.appearance")}</h3>
          <div className="settings-toggle-row">
            <span>{t("settings.darkMode")}</span>
            <button
              onClick={toggleDarkMode}
              className={`toggle-switch ${isDarkMode ? "active" : ""}`}
              aria-pressed={isDarkMode}
              aria-label={t("settings.darkMode")}
            >
              <span className="toggle-knob"></span>
            </button>
          </div>
        </div>

        {/* Gameplay — Timer */}
        <div className="settings-section">
          <h3 className="section-title">{t("settings.gameplay")}</h3>
          <div className="settings-toggle-row">
            <div className="settings-toggle-label">
              <span>{t("settings.timer")}</span>
              <span className="settings-toggle-hint">{t("settings.timerHint")}</span>
            </div>
            <button
              onClick={toggleTimer}
              className={`toggle-switch ${isTimerEnabled ? "active" : ""}`}
              aria-pressed={isTimerEnabled}
              aria-label={t("settings.timer")}
            >
              <span className="toggle-knob"></span>
            </button>
          </div>
        </div>

        <button onClick={onClose} className="close-settings-btn">
          {t("settings.close")}
        </button>
      </div>
    </div>
  );
}