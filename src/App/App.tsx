import React, { useRef, useState } from 'react';
import './App.css';
import Panel from '../components/Panel/Panel';
import InputArea from '../components/InputArea/InputArea';

const App = () => {
  const inputAreaRef = useRef<{getTextContent: () => string}>(null);
  const [showWordCount, setShowWordCount]=useState(true);
  const [showTimer, setShowTimer]=useState(true);
  const wordcountToggle = () => {
    //TODO: let localstorage remember the state
    setShowWordCount(prev => !prev);
  }
  const timerToggle = () => {
    setShowTimer(prev => !prev);
    //TODO: let localstorage remember the state
  }

  return (
    <div className="App dark:bg-gray-700 rounded transition">
      <Panel wordcountToggle={wordcountToggle} timerToggle={timerToggle} inputAreaRef={inputAreaRef} />
      <InputArea ref={inputAreaRef} showWordCount={showWordCount} showTimer={showTimer}/>
    </div>
  );
};

export default App;
