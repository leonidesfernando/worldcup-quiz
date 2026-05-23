// src/hooks/useCacheBuster.ts
import { useEffect } from 'react';//import { useEffect, useState } from 'react';

const VERSION_KEY = 'worldcup_app_version';

export function useCacheBuster(): void {
  //const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    const currentVersion = __BUILD_VERSION__;

    //console.log('storedVersion: ', storedVersion)
    //console.log('currentVersion: ', currentVersion)
    if (storedVersion === null) {
      // First install — store version silently, no reload needed
      localStorage.setItem(VERSION_KEY, currentVersion);
      return;
    }

    if (storedVersion !== currentVersion) {
      localStorage.setItem(VERSION_KEY, currentVersion);
      console.log('Limpando cache')

      // Defer state update out of the synchronous effect body to avoid
      // cascading renders — the React Compiler forbids synchronous setState
      // inside useEffect. setTimeout(fn, 0) schedules it as a microtask,
      // allowing React to finish the current render cycle first.
      //setTimeout(() => {
        //setIsUpdating(true);

        // Give the update screen 800ms to render before triggering reload
        //setTimeout(() => {
          if ('caches' in window) {
            caches.keys()
              .then(keys => Promise.all(keys.map(key => caches.delete(key))))
              .then(() => globalThis.location.reload());
          } else {
            //window.location.reload();
            globalThis.location.reload();
          }
        //}, 800);
      //}, 0);
    }
  }, []);

  //return { isUpdating };
}