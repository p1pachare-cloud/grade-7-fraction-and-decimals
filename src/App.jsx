import React, { useReducer, useEffect } from 'react';
import ProgressMap from './components/ProgressMap.jsx';
import IntroScreen from './components/IntroScreen.jsx';
import WonderPhase from './components/phases/WonderPhase.jsx';
import StoryPhase from './components/phases/StoryPhase.jsx';
import SimulatePhase from './components/phases/SimulatePhase.jsx';
import PlayPhase from './components/phases/PlayPhase.jsx';
import ReflectPhase from './components/phases/ReflectPhase.jsx';
import XPTracker from './components/gamification/XPTracker.jsx';
import StreakCounter from './components/gamification/StreakCounter.jsx';

import { useLocalStorage } from './hooks/useLocalStorage.js';
import { useAudio } from './hooks/useAudio.js';
import { checkBadges } from './utils/badgeEngine.js';
import {
  getWonderNarration,
  getStoryNarration,
  getReflectNarration,
} from './utils/narration.js';

const initialState = {
  phase: 'intro', // 'intro' | 'wonder' | 'story' | 'simulate' | 'play' | 'reflect'
  storyPanel: 0,
  simStationsComplete: [false, false, false],
  currentWorld: 0,
  worldScores: Array(10).fill(null),
  xp: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  recentXP: 0,
  phaseComplete: { wonder: false, story: false, simulate: false, play: false, reflect: false },
  audioEnabled: true,
};

const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  SET_STORY_PANEL: 'SET_STORY_PANEL',
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  RECORD_ANSWER: 'RECORD_ANSWER',
  RECORD_WORLD_SCORE: 'RECORD_WORLD_SCORE',
  SET_WORLD: 'SET_WORLD',
  UNLOCK_BADGES: 'UNLOCK_BADGES',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESTART_SESSION: 'RESTART_SESSION',
};

function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_PHASE: {
      const nextPhase = action.payload;
      const updatedPhaseComplete = { ...state.phaseComplete };
      if (state.phase !== 'intro') {
        updatedPhaseComplete[state.phase] = true;
      }
      return {
        ...state,
        phase: nextPhase,
        phaseComplete: updatedPhaseComplete,
      };
    }

    case ACTIONS.SET_STORY_PANEL:
      return { ...state, storyPanel: action.payload };

    case ACTIONS.COMPLETE_SIM_STATION: {
      const updatedStations = [...state.simStationsComplete];
      updatedStations[action.payload] = true;
      const isAllSimDone = updatedStations.every(Boolean);
      return {
        ...state,
        simStationsComplete: updatedStations,
        phaseComplete: {
          ...state.phaseComplete,
          simulate: isAllSimDone ? true : state.phaseComplete.simulate,
        },
      };
    }

    case ACTIONS.RECORD_ANSWER: {
      const { isCorrect, xpEarned } = action.payload;
      const newStreak = isCorrect ? state.streak + 1 : 0;
      const newMaxStreak = Math.max(state.maxStreak, newStreak);
      const newXP = state.xp + xpEarned;

      return {
        ...state,
        xp: newXP,
        streak: newStreak,
        maxStreak: newMaxStreak,
        recentXP: xpEarned,
      };
    }

    case ACTIONS.RECORD_WORLD_SCORE: {
      const { worldId, score } = action.payload;
      const updatedScores = [...state.worldScores];
      updatedScores[worldId] = Math.max(updatedScores[worldId] || 0, score);
      return {
        ...state,
        worldScores: updatedScores,
      };
    }

    case ACTIONS.SET_WORLD:
      return { ...state, currentWorld: action.payload };

    case ACTIONS.UNLOCK_BADGES:
      return {
        ...state,
        badges: [...new Set([...state.badges, ...action.payload])],
      };

    case ACTIONS.TOGGLE_AUDIO:
      return { ...state, audioEnabled: !state.audioEnabled };

    case ACTIONS.RESTORE_SESSION:
      return { ...state, ...action.payload };

    case ACTIONS.RESTART_SESSION:
      return { ...initialState, audioEnabled: state.audioEnabled };

    default:
      return state;
  }
}

export function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { narrate, stopNarration } = useAudio(state.audioEnabled);

  // 24-hour localStorage persistence
  useLocalStorage(state, dispatch, ACTIONS);

  // Auto-check badges on state updates
  useEffect(() => {
    const newlyUnlocked = checkBadges(state);
    if (newlyUnlocked.length > 0) {
      dispatch({ type: ACTIONS.UNLOCK_BADGES, payload: newlyUnlocked });
    }
  }, [state.phaseComplete, state.simStationsComplete, state.worldScores, state.maxStreak]);

  // Audio narration handler on phase/panel change
  useEffect(() => {
    if (!state.audioEnabled) {
      stopNarration();
      return;
    }

    if (state.phase === 'wonder') {
      narrate(getWonderNarration());
    } else if (state.phase === 'story') {
      narrate(getStoryNarration(state.storyPanel));
    } else if (state.phase === 'reflect') {
      narrate(getReflectNarration());
    } else {
      stopNarration();
    }
  }, [state.phase, state.storyPanel, state.audioEnabled, narrate, stopNarration]);

  return (
    <div className="app-container">
      {/* Floating Decorative Geometry Numbers Background */}
      <div className="floating-numbers">
        <span className="floating-number" style={{ top: '10%', left: '8%' }}>r = d ÷ 2</span>
        <span className="floating-number" style={{ top: '65%', left: '85%' }}>d = 2r</span>
        <span className="floating-number" style={{ top: '30%', left: '80%' }}>3.14</span>
        <span className="floating-number" style={{ top: '75%', left: '15%' }}>2πr</span>
      </div>

      {/* Audio Mute / Unmute Floating Toggle Button */}
      <button
        type="button"
        className="audio-toggle-btn"
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_AUDIO })}
        title={state.audioEnabled ? 'Mute Narration' : 'Unmute Narration'}
      >
        {state.audioEnabled ? '🔊' : '🔇'}
      </button>

      {/* Top Header Journey Tracker Bar (Visible for all phases except intro) */}
      {state.phase !== 'intro' && (
        <>
          <button
            type="button"
            className="home-btn"
            onClick={() => dispatch({ type: ACTIONS.SET_PHASE, payload: 'intro' })}
          >
            🏠 Home
          </button>

          <ProgressMap
            currentPhase={state.phase}
            phaseComplete={state.phaseComplete}
            onSelectPhase={(phaseId) => dispatch({ type: ACTIONS.SET_PHASE, payload: phaseId })}
          />

          {/* HUD Stats bar */}
          <div style={{ position: 'fixed', top: '56px', right: '16px', zIndex: 95, display: 'flex', gap: '8px' }}>
            <XPTracker xp={state.xp} recentXP={state.recentXP} />
            <StreakCounter streak={state.streak} />
          </div>
        </>
      )}

      {/* Phase Router */}
      {state.phase === 'intro' && (
        <IntroScreen onStart={(targetPhase) => dispatch({ type: ACTIONS.SET_PHASE, payload: typeof targetPhase === 'string' ? targetPhase : 'wonder' })} />
      )}

      {state.phase === 'wonder' && (
        <WonderPhase onNext={() => dispatch({ type: ACTIONS.SET_PHASE, payload: 'story' })} />
      )}

      {state.phase === 'story' && (
        <StoryPhase
          onPanelChange={(panelIdx) => dispatch({ type: ACTIONS.SET_STORY_PANEL, payload: panelIdx })}
          onNext={() => dispatch({ type: ACTIONS.SET_PHASE, payload: 'simulate' })}
        />
      )}

      {state.phase === 'simulate' && (
        <SimulatePhase
          stationsComplete={state.simStationsComplete}
          onStationComplete={(idx) => dispatch({ type: ACTIONS.COMPLETE_SIM_STATION, payload: idx })}
          onNextPhase={() => dispatch({ type: ACTIONS.SET_PHASE, payload: 'play' })}
        />
      )}

      {state.phase === 'play' && (
        <PlayPhase
          worldScores={state.worldScores}
          currentWorld={state.currentWorld}
          xp={state.xp}
          streak={state.streak}
          onWorldSelect={(wId) => dispatch({ type: ACTIONS.SET_WORLD, payload: wId })}
          onRecordWorldScore={(worldId, score) => dispatch({ type: ACTIONS.RECORD_WORLD_SCORE, payload: { worldId, score } })}
          onAnswerResult={(res) => dispatch({ type: ACTIONS.RECORD_ANSWER, payload: res })}
          onNextPhase={() => dispatch({ type: ACTIONS.SET_PHASE, payload: 'reflect' })}
        />
      )}

      {state.phase === 'reflect' && (
        <ReflectPhase
          xp={state.xp}
          streak={state.streak}
          maxStreak={state.maxStreak}
          badges={state.badges}
          worldScores={state.worldScores}
          onRestart={() => dispatch({ type: ACTIONS.RESTART_SESSION })}
        />
      )}
    </div>
  );
}

export default App;
