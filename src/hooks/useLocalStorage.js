import { useEffect } from 'react';

const SESSION_KEY = 'intellia_fractions_decimals_v1';
const EXPIRATION_MS = 86400000; // 24 hours

export function useLocalStorage(state, dispatch, ACTIONS) {
  // Load session on initial mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Date.now() - parsed.timestamp < EXPIRATION_MS) {
          dispatch({ type: ACTIONS.RESTORE_SESSION, payload: parsed });
        }
      }
    } catch (e) {
      console.warn('Failed to restore session from localStorage:', e);
    }
  }, []);

  // Save session on state changes
  useEffect(() => {
    if (!state) return;
    try {
      const payload = {
        phase: state.phase,
        storyPanel: state.storyPanel,
        simStationsComplete: state.simStationsComplete,
        currentWorld: state.currentWorld,
        currentQuestion: state.currentQuestion,
        xp: state.xp,
        streak: state.streak,
        maxStreak: state.maxStreak,
        badges: state.badges,
        worldScores: state.worldScores,
        phaseComplete: state.phaseComplete,
        timestamp: Date.now(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Failed to save session to localStorage:', e);
    }
  }, [state.phase, state.storyPanel, state.simStationsComplete, state.xp, state.streak, state.badges, state.worldScores, state.phaseComplete]);
}
