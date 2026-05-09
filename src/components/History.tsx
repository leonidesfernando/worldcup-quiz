// src/components/History.tsx
import { useState, useEffect } from "react";
import { useTranslation } from "../useTranslation";
import { HistoryService, type HistoryEntry } from "../service/HistoryService";
import { format } from "date-fns";

interface Props {
  onClose: () => void;
}

export default function History({ onClose }: Readonly<Props>) {
  const { t } = useTranslation();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await HistoryService.getAll();
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const deleteEntry = async (id: string) => {
    await HistoryService.deleteById(id);
    const updated = await HistoryService.getAll();
    setHistory(updated);
  };

  const clearAll = async () => {
    if (!confirm(t("history.clearConfirm") || "Clear all history?")) return;
    await HistoryService.clearAll();
    setHistory([]);
  };

  if (loading) {
    return <div className="history-screen">Loading history...</div>;
  }

  return (
    <div className="history-screen">
      <div className="history-header">
        <h2>{t("history.title")}</h2>
        <div className="history-actions">
          {history.length > 0 && (
            <button onClick={clearAll} className="clear-all-btn">
              {t("history.clearAll")}
            </button>
          )}
          <button onClick={onClose} className="close-btn">
            {t("settings.close")}
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <p>{t("history.empty")}</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((entry) => (
            <div key={entry.id} className="history-item">
              <div className="history-left">
                <div className="history-date">
                  {format(new Date(entry.date), "dd MMM yyyy • HH:mm")}
                </div>
                <div className="history-score">
                  <strong>{entry.correct}</strong> / {entry.total}
                </div>
              </div>

              <div className="history-right">
                <span className="percentage">{entry.percentage}%</span>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="delete-btn"
                  aria-label="Delete entry"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}