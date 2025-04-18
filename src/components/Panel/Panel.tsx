import React from 'react';
import './Panel.css';

//Define the props interface
interface PanelProps {
  wordcountToggle: () => void;
}

const Panel:React.FC<PanelProps> = ({wordcountToggle}) => {
  const fullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .catch(err => console.error('Fullscreen error:', err));
    } else {
      document.exitFullscreen();
    }
  };
  const handleIconBClick = () => console.log('Icon B clicked'); 
  const handleIconCClick = () => console.log('Icon C clicked');

  return (
    <div className="panel-icons">
      <button 
        onClick={fullscreenToggle}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action A"
        title="Toggle Fullscreen"
      >🔲</button>
      <button
        onClick={handleIconBClick}
        className="p-2 hover:bg-gray-100 rounded transition" 
        aria-label="Action B"
        title="Dark Mode"
      >🌓</button>
      <button
        onClick={handleIconCClick}
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
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Timer"
      >⏳</button>
      <button
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Switch Language"
      >🌏</button>
      <button
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Delete All"
      >🗑️</button>
            <button
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
        title="Deep Focus Mode"
      >TODO</button>
    </div>
  );
};

export default Panel;