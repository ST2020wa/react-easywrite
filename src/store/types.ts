export interface TimerState {
  minutes: number;
  isRunning: boolean;
  timeLeft: number;
  showWarning: boolean;
}

export interface SettingsState {
  showWordCount: boolean;
  showTimer: boolean;
  darkMode: boolean;
  deepFocus: boolean;
}

export interface TextState {
  text: string;
  wordCount: number;
}

export interface RootState {
  timer: TimerState;
  settings: SettingsState;
  text: TextState;
} 