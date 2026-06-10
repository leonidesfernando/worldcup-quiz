// src/hooks/useShareApp.ts
import { useCallback } from 'react';
import { Share } from '@capacitor/share';
import type { Translator } from '../i18n/i18n';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.leonidesfernandodeoliveira.worldcupquiz";

export function useShareApp() {
  const shareApp = useCallback(async (t: Translator) => {
    try {
      const shareText = `${t("share.inviteMessage")}\n\n` +
                       `${t("app.tryApp", { appName: t("app.title") })}\n`;

      await Share.share({
        title: t("app.appTitle"),
        text: shareText,
        url: PLAY_STORE_URL,
        dialogTitle: t("share.dialogTitle"),
      });

    } catch (error: any) {
      // Ignore user cancellation (most common case)
      if (
        error.message?.toLowerCase().includes('cancel') ||
        error.code === 'CANCELLED' ||
        error.name?.toLowerCase().includes('cancel')
      ) {
        console.log('User canceled share');
        return;
      }

      console.error('Share failed:', error);
      // Fallback: copy to clipboard
      const fallbackText = `${t("share.inviteMessage")}\n${PLAY_STORE_URL}`;
      await navigator.clipboard.writeText(fallbackText);
      alert(t("share.copiedToClipboard") || "Link copied to clipboard!");
    }
  }, []);

  return { shareApp };
}