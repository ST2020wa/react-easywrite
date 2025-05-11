import './InputArea.css';
import Timer from '../Timer/Timer';
import WordCount from '../WordCount/WordCount';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';
import { updateText } from '../../store/slices/textSlice';
import useDebounce from '../../hooks/useDebounce';

interface InputAreaProps {
  showWordCount: boolean;
  showTimer: boolean;
}

interface InputAreaRef {
  getTextContent: () => string;
}

const InputArea = forwardRef<InputAreaRef, InputAreaProps>(({ showWordCount, showTimer }, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { text, wordCount } = useSelector((state: RootState) => state.text);
  const { deepFocus } = useSelector((state: RootState) => state.settings);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debouncedWordCount = useDebounce(wordCount, 300);

  const handleDeepFocusInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    
    // If the new text is shorter than the old text, prevent deletion
    if (newText.length < text.length) {
      e.target.value = text;
      e.target.selectionStart = e.target.selectionEnd = text.length;
      alert(t('deepFocus.dontlookback'));
      return;
    }
    
    // If the new text starts differently from the old text, prevent editing
    if (!newText.startsWith(text)) {
      e.target.value = text;
      e.target.selectionStart = e.target.selectionEnd = text.length;
      alert(t('deepFocus.dontlookback'));
      return;
    }
    
    dispatch(updateText(newText));
  }, [text, dispatch, t]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (deepFocus) {
      handleDeepFocusInput(e);
    } else {
      dispatch(updateText(e.target.value));
    }
  }, [deepFocus, handleDeepFocusInput, dispatch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!deepFocus) return;
    
    const textarea = e.currentTarget;
    const cursorPos = textarea.selectionStart;
    
    // Prevent arrow keys, home key, and mouse clicks from moving cursor backwards
    if (
      (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Home') ||
      (e.key === 'Backspace' && cursorPos < text.length)
    ) {
      e.preventDefault();
      textarea.selectionStart = textarea.selectionEnd = text.length;
      alert(t('deepFocus.dontlookback'));
    }
  }, [deepFocus, text.length, t]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (!deepFocus) return;
    
    const textarea = e.currentTarget;
    const cursorPos = textarea.selectionStart;
    
    if (cursorPos < text.length) {
      e.preventDefault();
      textarea.selectionStart = textarea.selectionEnd = text.length;
      alert(t('deepFocus.dontlookback'));
    }
  }, [deepFocus, text.length, t]);

  useImperativeHandle(ref, () => ({
    getTextContent: () => text || '',
  }));

  return (
    <div className='inputarea-container'>
      <textarea 
        ref={textareaRef} 
        value={text} 
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        placeholder={t('goForWrite.title')} 
        className="inputarea dark:bg-gray-700 rounded transition dark:text-gray-100"
      />
      {showWordCount && <WordCount count={debouncedWordCount}/>}
      <div className={showTimer ? '' : 'hidden'}><Timer /></div>
    </div>
  );
});

export default React.memo(InputArea);