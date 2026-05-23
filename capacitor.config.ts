import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourname.worldcupquiz',
  appName: 'World Cup Quiz',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,           // how long to show splash (ms)
      launchAutoHide: true,
      backgroundColor: "#f8fafc",
      androidSplashResourceName: "splash", // name of your image
      androidScaleType: "CENTER_INSIDE",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    }

  }
};

export default config;