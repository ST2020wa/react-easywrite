import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import Panel from '../components/Panel/Panel';
import InputArea from '../components/InputArea/InputArea';

const App = () => {
  const inputAreaRef = useRef<{getTextContent: () => string}>(null);

  const [showWordCount, setShowWordCount]=useState(()=>{
    const savedState = localStorage.getItem('showWordCount');
    return savedState !== null ? savedState === 'true' : true;
  });

  const [showTimer, setShowTimer]=useState(() => {
    const savedState = localStorage.getItem('showTimer');
    return savedState !== null ? savedState === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('showTimer', showTimer.toString());
  }, [showTimer]);

  useEffect(() => {
    localStorage.setItem('showWordCount', showWordCount.toString());
  }, [showWordCount]);

  const wordcountToggle = () => {
    setShowWordCount(prev => !prev);
  }
  const timerToggle = () => {
    setShowTimer(prev => !prev);
  }

  return (
    <div className="App dark:bg-gray-700 rounded transition">
      <Panel wordcountToggle={wordcountToggle} timerToggle={timerToggle} inputAreaRef={inputAreaRef} />
      <InputArea ref={inputAreaRef} showWordCount={showWordCount} showTimer={showTimer}/>
    </div>
  );
};

export default App;
