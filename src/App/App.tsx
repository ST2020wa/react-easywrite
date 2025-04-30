import React, { useRef, useCallback } from 'react';
import './App.css';
import Panel from '../components/Panel/Panel';
import InputArea from '../components/InputArea/InputArea';
import useLocalStorage from '../hooks/useLocalStorage';

const App = () => {
  const inputAreaRef = useRef<{getTextContent: () => string}>(null);
  const [showWordCount, setShowWordCount] = useLocalStorage<boolean>('showWordCount', true);
  const [showTimer, setShowTimer] = useLocalStorage<boolean>('showTimer', true);

  const wordcountToggle = useCallback(() => {
    setShowWordCount(prev => !prev);
  }, [setShowWordCount]);

  const timerToggle = useCallback(() => {
    setShowTimer(prev => !prev);
  }, [setShowTimer]);

  return (
    <div className="App dark:bg-gray-700 rounded transition">
      <Panel 
        wordcountToggle={wordcountToggle} 
        timerToggle={timerToggle} 
        inputAreaRef={inputAreaRef} 
      />
      <InputArea 
        ref={inputAreaRef} 
        showWordCount={showWordCount} 
        showTimer={showTimer}
      />
    </div>
  );
};

export default App;
