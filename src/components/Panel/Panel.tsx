import React from 'react';
import './Panel.css';
import { log } from 'console';

//Define the props interface
interface PanelProps {
  wordcountToggle: () => void;
  inputAreaRef: React.RefObject<{getTextContent: () => string} | null>;
}

const Panel = ({wordcountToggle, inputAreaRef}:PanelProps) => {
  const fullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .catch(err => console.error('Fullscreen error:', err));
    } else {
      document.exitFullscreen();
    }
  };
  const exportToFile = () => {
    if(!inputAreaRef.current)return;
    const content= inputAreaRef.current.getTextContent();
    const blob = new Blob([content], { type: 'text/plain' });

    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `writing_${new Date().toISOString().slice(0,10)}.txt`;
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  }
  const deleteInput = () => {
    console.log('Delete all clicked');
  }
  const switchLanguage = ()=>{
    console.log('Switch language clicked');
  }
  const switchDarkMode = ()=>{
    console.log('Switch dark mode clicked');
  }
  const timerToggle = () => {
    console.log('Timer clicked');
  };
  const deepfocusToggle = () => {
    console.log('deep focus toggled');
  };

  return (
    <div className="panel-icons">
      <button 
        onClick={fullscreenToggle}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action A"
        title="Toggle Fullscreen"
      >🔲</button>
      <button
        onClick={switchDarkMode}
        className="p-2 hover:bg-gray-100 rounded transition" 
        aria-label="Action B"
        title="Dark Mode"
      >🌓</button>
      <button
        onClick={exportToFile}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Save As"
      >💾</button>
      <button
        onClick={wordcountToggle}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Word Count"
      >📈</button>
      <button
        onClick={timerToggle}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Timer"
      >⏳</button>
      <button
        onClick={switchLanguage}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Switch Language"
      >🌏</button>
      <button
        onClick={deleteInput}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Delete All"
      >🗑️</button>
      <button
        onClick={deepfocusToggle}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Deep Focus Mode"
      >TODO</button>
    </div>
  );
};

export default Panel;