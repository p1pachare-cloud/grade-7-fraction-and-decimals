import { useState, useCallback, useRef, useEffect } from 'react';
import { audioMap } from '../utils/audioMap.js';

let activeAudio = null;

export function useAudio(audioEnabled = true) {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTokenRef = useRef(0);

  const stopNarration = useCallback(() => {
    currentTokenRef.current += 1;
    if (activeAudio) {
      try {
        activeAudio.pause();
        activeAudio.currentTime = 0;
      } catch (e) {
        // ignore
      }
      activeAudio = null;
    }
    setIsPlaying(false);
  }, []);

  const getAudioUrl = (text) => {
    if (!text) return null;
    return audioMap[text] || null;
  };

  const playSingleAudio = (url, token) => {
    return new Promise((resolve) => {
      if (token !== currentTokenRef.current || !url) {
        resolve();
        return;
      }

      const audio = new Audio(url);
      activeAudio = audio;

      audio.onended = () => {
        if (activeAudio === audio) activeAudio = null;
        resolve();
      };
      audio.onerror = () => {
        if (activeAudio === audio) activeAudio = null;
        resolve();
      };

      audio.play().catch(() => {
        resolve();
      });
    });
  };

  const narrate = useCallback(async (segments) => {
    if (!audioEnabled || !segments || segments.length === 0) return;

    stopNarration();
    const token = currentTokenRef.current;
    setIsPlaying(true);

    for (let i = 0; i < segments.length; i++) {
      if (token !== currentTokenRef.current) break;
      const { text } = segments[i];
      const url = getAudioUrl(text);

      if (token !== currentTokenRef.current) break;

      await playSingleAudio(url, token);
    }

    if (token === currentTokenRef.current) {
      setIsPlaying(false);
    }
  }, [audioEnabled, stopNarration]);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [stopNarration]);

  return { narrate, stopNarration, isPlaying };
}

export default useAudio;
