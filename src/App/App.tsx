import React, { useRef, useState } from 'react';
import './App.css';
import Panel from '../components/Panel/Panel';
import InputArea from '../components/InputArea/InputArea';
import WordCount from '../components/WordCount/WordCount';

const App = () => {
  const inputAreaRef = useRef<{getTextContent: () => string}>(null);
  const [showWordCount, setShowWordCount]=useState(true);
  const wordcountToggle = () => {
    setShowWordCount(prev => !prev);
  }

  return (
    <div className="App">
      <div className="bg-blue-500 text-white p-4">
  Tailwind测试
</div>
      <Panel wordcountToggle={wordcountToggle} inputAreaRef={inputAreaRef} />
      <InputArea ref={inputAreaRef} showWordCount={showWordCount}/>
    </div>
  );
};

export default App;
