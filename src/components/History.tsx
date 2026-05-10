// src/components/History.tsx
import { useState, useEffect } from "react";
import { useTranslation } from "../useTranslation";
import { HistoryService, type HistoryEntry } from "../service/HistoryService";
import { format } from "date-fns";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  onClose: () => void;
}

export default function History({ onClose }: Props) {
  const { t } = useTranslation();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [showClearAllDialog, setShowClearAllDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const loadHistory = async () => {
    setLoading(true);
    const data = await HistoryService.getAll();
    setHistory(data);
    setLoading(false);
  };

  /*useEffect(() => {
    loadHistory();
  }, []);*/

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

  // ── Percentage colour helper — mirrors results screen tiers ──
  const percentageClass = (pct: number) => {
    if (pct === 100) return "history-pct history-pct--gold";
    if (pct >= 80)  return "history-pct history-pct--silver";
    if (pct >= 70)  return "history-pct history-pct--bronze";
    return "history-pct history-pct--low";
  };

  if (loading) return <div className="history-screen">Loading...</div>;

  return (
    <div className="history-screen">
      <div className="history-header">
        <h2 className="history-title">{t("history.title")}</h2>
        <div className="history-actions">
          {history.length > 0 && (
            <button onClick={() => setShowClearAllDialog(true)} className="history-clear-btn">
              {t("history.clearAll")}
            </button>
          )}
          <button onClick={onClose} className="history-close-btn">
            {t("settings.close")}
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
            <div className="empty-state__icon">📋</div>
            <p className="empty-state__text">{t("history.empty")}</p>
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
                <strong>{entry.correct}</strong>
                <span className="history-score__separator"> / </span>
                {entry.total}
                </div>
              </div>

              <div className="history-right">
                <span className={percentageClass(entry.percentage)}>{entry.percentage}%</span>
                <button onClick={() => handleDelete(entry.id)} className="delete-btn">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reusable Dialogs */}
      <ConfirmDialog
        isOpen={showClearAllDialog}
        title={t("history.clearConfirmTitle") || "Clear History?"}
        message={t("history.clearConfirmMessage") || "This action cannot be undone."}
        confirmText={t("history.clearAll")}
        confirmVariant="danger"
        onConfirm={confirmClearAll}
        onCancel={() => setShowClearAllDialog(false)}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title={t("history.deleteConfirmTitle") || "Delete Entry?"}
        message={t("history.deleteConfirmMessage") || "This entry will be permanently removed."}
        confirmText="Delete"
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