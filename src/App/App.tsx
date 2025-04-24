import React, { useRef, useState } from 'react';
import './App.css';
import Panel from '../components/Panel/Panel';
import InputArea from '../components/InputArea/InputArea';

const App = () => {
  const inputAreaRef = useRef<{getTextContent: () => string}>(null);
  const [showWordCount, setShowWordCount]=useState(true);
  const wordcountToggle = () => {
    setShowWordCount(prev => !prev);
  }

  return (
    <div className="App dark:bg-gray-700 rounded transition">
      <Panel wordcountToggle={wordcountToggle} inputAreaRef={inputAreaRef} />
      <InputArea ref={inputAreaRef} showWordCount={showWordCount}/>
    </div>
  );
};

export default App;
