import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimerState } from '../types';

const MAX_MINUTES = 240;

const initialState: TimerState = {
  minutes: Number(localStorage.getItem('timerMinutes')) || 25,
  isRunning: false,
  timeLeft: (Number(localStorage.getItem('timerMinutes')) || 25) * 60,
  showWarning: false
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setMinutes: (state, action: PayloadAction<number>) => {
      const minutes = action.payload;
      if (minutes > MAX_MINUTES) {
        state.showWarning = true;
        state.minutes = MAX_MINUTES;
        state.timeLeft = MAX_MINUTES * 60;
      } else {
        state.showWarning = false;
        state.minutes = minutes;
        state.timeLeft = minutes * 60;
      }
      localStorage.setItem('timerMinutes', state.minutes.toString());
    },
    startTimer: (state) => {
      if (state.minutes > 0) {
        state.isRunning = true;
        state.timeLeft = state.minutes * 60;
      }
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    updateTimeLeft: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
      if (state.timeLeft <= 0) {
        state.isRunning = false;
        state.timeLeft = 0;
      }
    },
    clearWarning: (state) => {
      state.showWarning = false;
    },
    resetTimer: (state) => {
      state.isRunning = false;
      state.timeLeft = state.minutes * 60;
    }
  }
});

export const { 
  setMinutes, 
  startTimer, 
  stopTimer, 
  updateTimeLeft,
  clearWarning,
  resetTimer
} = timerSlice.actions;

export default timerSlice.reducer; 