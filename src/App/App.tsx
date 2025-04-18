import React, { useState } from 'react';
import './App.css';
import Panel from '../components/Panel/Panel';
import InputArea from '../components/InputArea/InputArea';
import WordCount from '../components/WordCount/WordCount';

const App = () => {
  return (
    <div className="App">
      <Panel />
      <InputArea />
    </div>
  );
};

export default App;
