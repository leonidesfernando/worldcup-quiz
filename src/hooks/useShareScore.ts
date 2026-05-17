// src/hooks/useShareScore.ts
import { useCallback } from 'react';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import html2canvas from 'html2canvas';
import write_blob from 'capacitor-blob-writer';
import type { Translator } from '../i18n/i18n';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.leonidesfernandodeoliveira.worldcupquiz";

function canvasToBlob(canvas: HTMLCanvasElement, quality = 0.95): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
      'image/png',
      quality,
    ),
  );
}

//function buildShareText(finalScore: number, total: number, percentage: number, t:Translator): string {
const buildShareText = (finalScore: number, total: number, percentage: number, t: Translator): string => {
    let positionMesage = "";
    if (percentage === 100) {
      positionMesage = t("share.champion") + "🏆\n";
    } else if (percentage >= 80) {
      positionMesage = t("share.runnerUp") + "🥈\n";
    } else if (percentage >= 70) {
      positionMesage = t("share.thirdPlace") + "🥉\n";
    }else{
      positionMesage = t("share.player") + " ⚽︎\n";
    }

    positionMesage += t("share.myScoreAndPercentage", {finalScore, total, percentage}) +" 🔥";
    const appName = t('app.title');
    const tryApp = t("app.tryApp", {appName});
    const beatScore = t("share.beatScore");

    return `${positionMesage} \n\n${beatScore}\n${tryApp}\n\n`;
};

export function useShareScore() {

  const shareScore = useCallback(
    async (
      resultsCardElement: HTMLElement,
      finalScore: number,
      total: number,
      percentage: number,
      t: Translator
    ) => {
      try {
        const isDark = document.documentElement.classList.contains('dark');

        const canvas = await html2canvas(resultsCardElement, {
          scale: 2,
          backgroundColor: isDark ? '#1e2937' : '#ffffff',
          logging: false,
          useCORS: true,
        });

        const blob = await canvasToBlob(canvas);
        const fileName = `worldcup-score-${Date.now()}.png`;

        // Step 1: write the blob to disk
        await write_blob({
          path: fileName,
          directory: Directory.Cache,
          blob,
          fast_mode: true,
          on_fallback(error) {
            console.warn('write_blob fell back to chunk mode:', error);
          },
        });

        // Step 2: resolve via getUri — this gives the content:// URI that
        // Android's FileProvider exposes, which WhatsApp/Instagram can actually read.
        // write_blob's returned string is a raw file:// path, which social apps reject.
        const { uri } = await Filesystem.getUri({
          path: fileName,
          directory: Directory.Cache,
        });

        // Step 3: share image only in `files`, text separately — mixing both in
        // the same payload causes WhatsApp to drop the image
        await Share.share({
          title: t('share.quizScore'),//'My World Cup Quiz Score',
          text: buildShareText(finalScore, total, percentage, t),
          files: [uri],
          url: PLAY_STORE_URL,
          dialogTitle: t('share.dialogueTitle')//'Share your score',
        });
      } catch (error: any) {

        // IMPORTANT: Ignore user cancellation (most common case)
        if (
          error.message?.includes('cancel') ||
          error.message?.includes('dismiss') ||
          error.code === 'CANCELLED' ||
          error.name === 'CanceledError' ||
          String(error).toLowerCase().includes('cancel')
        ) {
          console.log('User canceled share dialog - ignoring');
          return;   // Silent exit - no alert
        }

        console.error('Share failed:', error);
        const fallbackText = `I scored ${finalScore}/${total} on World Cup Quiz! Can you beat me?`;
        await navigator.clipboard.writeText(fallbackText);
        
        alert("Couldn't open share sheet.\nScore copied to clipboard. You can paste it manually.");
      }
    },
    [],
  );

  return { shareScore };
}