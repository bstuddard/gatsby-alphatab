// In your layout or component file
import React, { useEffect, useRef } from 'react';

export const AlphaTabInit = ({ onApiReady }) => {
  const elementRefs = useRef([]);
  
  useEffect(() => {
    const atElements = document.querySelectorAll('.alphaTab');
    atElements.forEach((el, i) => {
      if (!el.dataset.initialized) {
        const file = el.dataset.file;
        const soundfontFile = el.dataset.soundfont;

        const settings = {
          file: file,
          player: {
            enablePlayer: true,
            enableCursor: true,
            enableUserInteraction: true,
            autoPlay: false,
            soundFont: soundfontFile,
            scrollElement: null
          }
        };

        const api = new alphaTab.AlphaTabApi(el, settings);
        el.alphaTabApi = api; // Store the API instance for later cleanup

        onApiReady(api, i);  // Notify parent component about the API
        el.dataset.initialized = 'true';

      }
    });

    // Clean up on unmount
    return () => {
      document.querySelectorAll('.alphaTab').forEach(el => {
        if (el.alphaTabApi) {
          el.alphaTabApi.destroy();
        }
      });
    };

  }, [onApiReady]);

  return null;
  
};
