import { createSlice } from '@reduxjs/toolkit';
import { SettingsState } from '../types';

const initialState: SettingsState = {
  showWordCount: localStorage.getItem('showWordCount') !== 'false',
  showTimer: localStorage.getItem('showTimer') !== 'false',
  darkMode: localStorage.getItem('darkMode') === 'true',
  deepFocus: localStorage.getItem('deepFocus') === 'true'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleWordCount: (state) => {
      state.showWordCount = !state.showWordCount;
      localStorage.setItem('showWordCount', state.showWordCount.toString());
    },
    toggleTimer: (state) => {
      state.showTimer = !state.showTimer;
      localStorage.setItem('showTimer', state.showTimer.toString());
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString());
    },
    toggleDeepFocus: (state) => {
      state.deepFocus = !state.deepFocus;
      localStorage.setItem('deepFocus', state.deepFocus.toString());
    }
  }
});

export const { 
  toggleWordCount, 
  toggleTimer, 
  toggleDarkMode, 
  toggleDeepFocus 
} = settingsSlice.actions;

export default settingsSlice.reducer; 