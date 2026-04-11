// src/hooks/useShareScore.ts
import { useCallback } from 'react';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import html2canvas from 'html2canvas';
import write_blob from 'capacitor-blob-writer';
import type { Translator } from '../i18n/i18n';

function canvasToBlob(canvas: HTMLCanvasElement, quality = 0.95): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
      'image/png',
      quality,
    ),
  );
}

/*function buildShareText2Old(finalScore: number, total: number, percentage: number): string {

  return percentage === 100
    ? `I'm the World Cup Quiz Champion! I scored ${finalScore}/${total} 🔥`
    : `I scored ${finalScore}/${total} (${percentage}%) on World Cup Quiz! 🔥\n\nCan you beat my score? Try the app!`;
}*/

  function buildShareText(
    finalScore: number,
    total: number,
    percentage: number,
    t: Translator
  ): string {
    let positionMesage = "";
    if (percentage === 100) {
      positionMesage = t("share.champion") + "🏆 " + t("share.myScore", {finalScore, total}) +" 🔥";
    } else if (percentage >= 80) {
      positionMesage = t("share.runnerUp") + "🥈 " + t("share.myScoreAndPercentage", {finalScore, total}) +" 🔥";
    } else if (percentage >= 70) {
      positionMesage = t("share.thirdPlace") + "🥉 " + t("share.myScoreAndPercentage", {finalScore, total}) +" 🔥";
    }else{
      positionMesage = t("share.myScore", {finalScore, total}) +" 🔥";
    }

    const tryApp = t("app.tryApp");
    const beatScore = t("share.beatScore");
    console.log('buildShareText:', `${positionMesage} \n\n${beatScore} ${tryApp}`);
    return `${positionMesage} \n\n${beatScore} ${tryApp}`;
  }


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

        /*const canvas = await html2canvas(resultsCardElement, {
          scale: 2,
          backgroundColor: isDark ? '#1e2937' : '#ffffff',
          logging: false,
          useCORS: true,
        });*/

// Force a clean, safe background and disable problematic features
        const canvas = await html2canvas(resultsCardElement, {
          scale: 2,
          backgroundColor: isDark ? '#1e2937' : '#ffffff',
          logging: false,
          useCORS: true,
          allowTaint: true,
          // These options help avoid color parsing errors
          ignoreElements: (element) => 
            element.tagName === 'STYLE' || 
            element.classList.contains('lawn-layer'), // skip complex backgrounds if needed
          onclone: (_document, element) => {
            // Force Tailwind colors to safe values during capture
            element.style.setProperty('--tw-bg-opacity', '1', 'important');
          },
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
          title: 'My World Cup Quiz Score',
          text:  buildShareText(finalScore, total, percentage, t),//'I am the best',
          files: [uri],
          dialogTitle: 'Share your score',
        });
      } catch (error) {
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