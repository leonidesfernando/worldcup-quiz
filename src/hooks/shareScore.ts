// src/hooks/shareScore.ts
/*
import html2canvas from 'html2canvas';
import { Share } from '@capacitor/share';

export async function shareScore(
  resultsCardElement: HTMLElement,
  finalScore: number,
  total: number,
  percentage: number
): Promise<void> {
  try {
    const isDark = document.documentElement.classList.contains('dark');
    const backgroundColor = isDark ? '#1e2937' : '#ffffff';

    const canvas = await html2canvas(resultsCardElement, {
      scale: 2,
      backgroundColor,
      logging: false,
      useCORS: true,
    });

    const imageDataUrl = canvas.toDataURL('image/png');

    const shareText = `I scored ${finalScore}/${total} (${percentage}%) on World Cup Quiz! 🔥\n\nCan you beat my score? Try the app!`;

    // Try native share first (works on Android/iOS)
    try {
      await Share.share({
        title: 'My World Cup Quiz Score',
        text: shareText,
        url: imageDataUrl,
        dialogTitle: 'Share your score',
      });
      return; // Success → exit
    } catch (nativeError) {
      console.log('Native share not available, using browser fallback');
    }

    // Browser fallback
    await browserShareFallback(imageDataUrl, shareText);

  } catch (error) {
    console.error('Share failed:', error);
    await fallbackToClipboard(finalScore, total);
  }
}

// Browser: Download image + copy text
async function browserShareFallback(imageDataUrl: string, shareText: string) {
  try {
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'worldcup-quiz-score.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    await navigator.clipboard.writeText(shareText);
    alert("Image downloaded!\nScore copied to clipboard. You can share it manually.");
  } catch (err) {
    console.error(err);
    alert("Couldn't share automatically.\nPlease take a screenshot instead.");
  }
}

// Simple clipboard fallback
async function fallbackToClipboard(finalScore: number, total: number) {
  const text = `I scored ${finalScore}/${total} on World Cup Quiz! Can you beat me?`;
  await navigator.clipboard.writeText(text);
  alert("Score copied to clipboard!");
}
  */