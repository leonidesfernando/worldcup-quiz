// src/components/Settings.tsx
import { useTranslation } from "../useTranslation";
import LanguageSelector from "./LanguageSelector";
import { useSettings } from "../components/SettingsContext";

interface Props {
  onClose: () => void;
}

export default function Settings({ onClose }: Readonly<Props>) {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useSettings();

  const toggleAnimations = () => {
    // TODO: We'll connect this to a global settings context later
    alert(t("settings.comingSoon") || "Animations toggle coming soon!");
  };

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

        {/* Animations Section */}
        <div className="settings-section">
          <h4 className="section-title">{t("settings.animations")}</h4>
          <div className="settings-toggle-row">
            <span>{t("settings.enableAnimations")}</span>
            <button onClick={toggleAnimations} className="toggle-btn">
              {t("settings.on")} / {t("settings.off")}
            </button>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="settings-section">
          <h3 className="section-title">{t("settings.appearance")}</h3>
          <div className="settings-toggle-row">
            <span>{t("settings.darkMode")}</span>
            <button
              onClick={toggleDarkMode}
              className={`toggle-switch ${isDarkMode ? "active" : ""}`}
            >
              <span className="toggle-knob"></span>
            </button>
          </div>
        </div>

        {/* Future settings can be added here easily */}

        <button onClick={onClose} className="close-settings-btn">
          {t("settings.close")}
        </button>
      </div>
    </div>
  );
}
