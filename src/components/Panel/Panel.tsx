import React from 'react';
import './Panel.css';

const Panel = () => {
  // Click handlers for each icon
  const handleIconAClick = () => console.log('Icon A clicked');
  const handleIconBClick = () => console.log('Icon B clicked'); 
  const handleIconCClick = () => console.log('Icon C clicked');

  return (
    <div className="panel-icons">
      <button 
        onClick={handleIconAClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action A"
      >🔲</button>
             <button
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
      >🎯</button>
      <button
        onClick={handleIconBClick}
        className="p-2 hover:bg-gray-100 rounded transition" 
        aria-label="Action B"
      >🌓</button>
      <button
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
      >💾</button>
      <button
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
      >📈</button>
      <button
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
      >⏳</button>


            <button
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
      >🌏</button>
      <button
        onClick={handleIconCClick}
        className="p-2 hover:bg-gray-100 rounded transition"
        aria-label="Action C"
      >🗑️</button>
    </div>
  );
};

export default Panel;