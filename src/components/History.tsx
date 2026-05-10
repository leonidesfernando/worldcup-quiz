// src/components/History.tsx
import { useState, useEffect } from "react";
import { useTranslation } from "../useTranslation";
import { HistoryService, type HistoryEntry } from "../service/HistoryService";
import { format } from "date-fns";
import { ptBR, pl, fr, es, de, enUS } from "date-fns/locale";
import ConfirmDialog from "./ConfirmDialog";
import worldCupTrophy from "../assets/world-cup-trophy.png";
import silverMedal from "../assets/silver-medal.png";
import bronzeMedal from "../assets/bronze-medal.png";
import ReactCountryFlag from "react-country-flag";

interface Props {
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

const locales = {
  en: enUS,
  "pt-BR": ptBR,
  pl,
  fr,
  es,
  de,
};

const dateFormats = {
  en: "MMM dd, yyyy • HH:mm",
  "pt-BR": "dd MMM, yyyy • HH:mm",
  pl: "dd MMM, yyyy • HH:mm",
  fr: "dd MMM, yyyy • HH:mm",
  es: "dd MMM, yyyy • HH:mm",
  de: "dd MMM, yyyy • HH:mm",
};

export default function History({ onClose }: Props) {
  const { t, lang } = useTranslation();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [showClearAllDialog, setShowClearAllDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const dateFormat =
    dateFormats[lang as keyof typeof dateFormats] ?? "dd MMM yyyy • HH:mm";
  const locale = locales[lang as keyof typeof locales] ?? enUS;

  const loadHistory = async () => {
    setLoading(true);
    const data = await HistoryService.getAll();
    setHistory(data);
    setLoading(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Pagination
  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = history.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ── Percentage colour helper — mirrors results screen tiers ──
  const percentageClass = (pct: number) => {
    if (pct === 100) return "history-pct history-pct--gold";
    if (pct >= 80) return "history-pct history-pct--silver";
    if (pct >= 70) return "history-pct history-pct--bronze";
    return "history-pct history-pct--low";
  };

  const getMedal = (percentage: number) => {
    if (percentage === 100) return worldCupTrophy;
    if (percentage >= 80) return silverMedal;
    if (percentage >= 70) return bronzeMedal;
    return null;
  };

  const getCountryCode = (lang: string): string => {
    const map: Record<string, string> = {
      en: "US",
      "pt-BR": "BR",
      es: "ES",
      fr: "FR",
      de: "DE",
      pl: "PL",
    };
    return map[lang] || "UN";
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await HistoryService.deleteById(itemToDelete);
      await loadHistory();
    }
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };

  const confirmClearAll = async () => {
    await HistoryService.clearAll();
    setHistory([]);
    setShowClearAllDialog(false);
  };

  if (loading) return <div className="history-screen">Loading...</div>;

  return (
    <div className="history-screen">
      <div className="history-header">
        <h2 className="history-title">{t("history.title")}</h2>
        <div className="history-actions">
          {history.length > 0 && (
            <button
              onClick={() => setShowClearAllDialog(true)}
              className="history-clear-btn"
            >
              {t("history.clearAll")}
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__text">{t("history.empty")}</p>
        </div>
      ) : (
        <>
          <div className="history-list">
            {currentItems.map((entry) => {
              const medal = getMedal(entry.percentage);
              return (
                <div key={entry.id} className="history-item">
                  <div className="history-flag-topright">
                    <ReactCountryFlag
                      countryCode={getCountryCode(entry.language)}
                      svg
                    />
                  </div>

                  <div className="history-left">
                    <div className="history-meta">
                      <div className="history-date">
                        {format(new Date(entry.date), dateFormat, { locale })}
                      </div>
                    </div>
                    <div className="history-score">
                      <span className="history-score-correct"><strong>{entry.correct}</strong></span>
                      <span className="history-score__separator"> / </span>
                      {entry.total}
                    </div>
                  </div>

                  <div className="history-right">
                    {medal && (
                      <img src={medal} alt="medal" className="history-medal" />
                    )}
                    <span className={percentageClass(entry.percentage)}>
                      {entry.percentage}%
                    </span>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="delete-btn"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ← {t("history.previous") || "Previous"}
              </button>

              <span className="pagination-info">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                {t("history.next") || "Next"} →
              </button>
            </div>
          )}
        </>
      )}

      <button onClick={onClose} className="close-settings-btn">
        {t("settings.close")}
      </button>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={showClearAllDialog}
        titleKey="history.clearConfirmTitle"
        messageKey="history.clearConfirmMessage"
        confirmTextKey="history.clearAll"
        confirmVariant="danger"
        onConfirm={confirmClearAll}
        onCancel={() => setShowClearAllDialog(false)}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        titleKey="history.deleteConfirmTitle"
        messageKey="history.deleteConfirmMessage"
        confirmTextKey="dialog.delete"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteDialog(false);
          setItemToDelete(null);
        }}
      />
    </div>
  );
}
