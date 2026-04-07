// src/services/AdMobService.ts
import { AdMob, type BannerAdOptions, BannerAdPosition, BannerAdSize, type RewardAdOptions, RewardAdPluginEvents, type AdMobRewardItem } from '@capacitor-community/admob';

const isTesting = true; // Set to false before production release

const PRODUCTION_REWARD_ID = "ca-app-pub-1678598187483548~7814389951";

//const TEST_BANNER_ID = "ca-app-pub-3940256099942544/6300978111",
//const TEST_REWARD_ID = "ca-app-pub-3940256099942544/5224354917"

const BANNER_ID = isTesting 
  ? 'ca-app-pub-3940256099942544/6300978111' 
  : PRODUCTION_REWARD_ID;

const REWARDED_ID = isTesting 
  ? 'ca-app-pub-3940256099942544/5224354917' 
  : PRODUCTION_REWARD_ID;

export class AdMobService {
  private static bannerShown = false;
  private static rewardListenerAdded = false;

  /** Initialize AdMob once when the app starts */
  static async initialize() {
    try {
      await AdMob.initialize();
      console.log('AdMob initialized');
    } catch (e) {
      console.warn('AdMob init failed', e);
    }
  }

  // ==================== BANNER ADS ====================
  static async showBanner() {
    if (this.bannerShown) return;

    const options: BannerAdOptions = {
      adId: BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    };

    try {
      await AdMob.showBanner(options);
      this.bannerShown = true;
      console.log('Banner shown');
    } catch (e) {
      console.warn('Failed to show banner', e);
    }
  }

  static async hideBanner() {
    try {
      await AdMob.hideBanner();
      this.bannerShown = false;
    } catch (e) {
      // silent
    }
  }

  // ==================== REWARDED VIDEO ====================
  static async loadRewarded() {
    const options: RewardAdOptions = {
      adId: REWARDED_ID,
    };

    try {
      await AdMob.prepareRewardVideoAd(options);
      console.log('Rewarded ad preloaded');
    } catch (e) {
      console.warn('Failed to preload rewarded ad', e);
    }
  }

  /** Show rewarded video and give reward when user completes the video */
  static async showRewarded(onReward: () => void) {
    try {
      // Show the ad
      //const rewardItem = await AdMob.showRewardVideoAd();
        await AdMob.showRewardVideoAd();
      // Listen for successful reward (user watched until the end)
      if (!this.rewardListenerAdded) {
        AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward: AdMobRewardItem) => {
          console.log('User earned reward:', reward);
          onReward();                    // ← Give bonus points, extra life, etc.
        });

        this.rewardListenerAdded = true;
      }

      console.log('ewarded video shown');
    } catch (e) {
      console.warn('Failed to show rewarded ad', e);
      // Optional: show a friendly message to the user
      // alert("Ad not available right now. Try again later.");
    }
  }
}