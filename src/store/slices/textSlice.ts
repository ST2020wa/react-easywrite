import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TextState } from '../types';

const initialState: TextState = {
  text: localStorage.getItem('textInput') || '',
  wordCount: 0
};

const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    updateText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
      // Count words (you can move this to a utility function later)
      state.wordCount = action.payload.trim().split(/\s+/).filter(Boolean).length;
    },
    clearText: (state) => {
      state.text = '';
      state.wordCount = 0;
    }
  }
});

export const { updateText, clearText } = textSlice.actions;
export default textSlice.reducer; 