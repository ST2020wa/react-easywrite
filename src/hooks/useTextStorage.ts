import { useState, useEffect, useCallback } from 'react';

const isCJK = (char: string) => {
  return /[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/.test(char);
};

const countWords = (text: string) => {
  const englishWords = text.split(/[\s]+/).filter(w => w.length > 0 && !isCJK(w));
  const cjkWords = Array.from(text).filter(word => isCJK(word));
  return englishWords.length + cjkWords.length;
};

const useTextStorage = () => {
  const [text, setText] = useState(() => {
    return localStorage.getItem('textInput') || '';
  });
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('textInput', text);
    setWordCount(countWords(text));
  }, [text]);

  const updateText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  return {
    text,
    wordCount,
    updateText,
  };
};

export default useTextStorage; 