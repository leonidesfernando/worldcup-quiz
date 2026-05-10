// src/components/ConfirmDialog.tsx
import { useTranslation } from "../useTranslation";

interface Props {
  isOpen: boolean;
  title?: string;           // fallback if no key
  titleKey?: string;        // preferred: i18n key
  message?: string;
  messageKey?: string;
  confirmText?: string;
  confirmTextKey?: string;
  cancelText?: string;
  cancelTextKey?: string;
  confirmVariant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  titleKey = "dialog.confirmTitle",
  message,
  messageKey = "dialog.confirmMessage",
  confirmText,
  confirmTextKey = "dialog.confirm",
  cancelText,
  cancelTextKey = "dialog.cancel",
  confirmVariant = "default",
  onConfirm,
  onCancel,
}: Readonly<Props>) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true">
      <div className="confirm-dialog">
        <p className="confirm-dialog__title">
          {title || t(titleKey)}
        </p>
        <p className="confirm-dialog__message">
          {message || t(messageKey)}
        </p>

        <div className="confirm-dialog__actions">
          <button
            onClick={onCancel}
            className="confirm-dialog__btn confirm-dialog__btn--cancel"
          >
            {cancelText || t(cancelTextKey)}
          </button>

          <button
            onClick={onConfirm}
            className={`confirm-dialog__btn confirm-dialog__btn--confirm ${
              confirmVariant === "danger" ? "danger" : ""
            }`}
          >
            {confirmText || t(confirmTextKey)}
          </button>
        </div>
      </div>
    </div>
  );
}