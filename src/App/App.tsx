import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Panel from '../components/Panel/Panel';
import InputArea from '../components/InputArea/InputArea';
import { RootState } from '../store';

const App = () => {
  const inputAreaRef = useRef<{getTextContent: () => string}>(null);
  const { showWordCount, showTimer } = useSelector((state: RootState) => state.settings);

  return (
    <div className="App dark:bg-gray-700 rounded transition">
      <Panel 
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
