import React, { useEffect, useState } from 'react';
import './Panel.css';
import { useTranslation } from 'react-i18next';

interface PanelProps {
  wordcountToggle: () => void;
  timerToggle: () => void;
  inputAreaRef: React.RefObject<{getTextContent: () => string} | null>;
}

const Panel = ({wordcountToggle, timerToggle, inputAreaRef}:PanelProps) => {
  const {t, i18n} = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [deepFocus, setDeepFocus] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(()=>{
    const isDark = localStorage.getItem('darkMode')==='true' || (window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  },[]);

  const switchDarkMode = ()=>{
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.documentElement.classList.toggle('dark', newMode);
  }

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
    setShowDeleteConfirm(true);
  }

  const confirmDelete = () => {
    localStorage.setItem('textInput', '');
    inputAreaRef.current?.getTextContent();
    setShowDeleteConfirm(false);
    window.location.reload();
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  }

  const switchLanguage = ()=>{
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  }

  const deepfocusToggle = () => {
    setDeepFocus(!deepFocus);
    // Pass the deep focus state to InputArea through localStorage
    localStorage.setItem('deepFocus', (!deepFocus).toString());
  };

  return (
    <>
      <div className={`panel-icons ${darkMode ? 'dark' : ''}`}>
        <button 
          onClick={fullscreenToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label={t('fullScreen.ariaLabel')}
          title={t('fullScreen.title')}
        >🔲</button>
        <button
          onClick={switchDarkMode}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label={t('darkMode.ariaLabel')}
          title={t('darkMode.title')}
        >🌓</button>
        <button
          onClick={exportToFile}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label={t('exportTxt.ariaLabel')}
          title={t('exportTxt.title')}
        >💾</button>
        <button
          onClick={wordcountToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label={t('wordCount.ariaLabel')}
          title={t('wordCount.title')}
        >📈</button>
        <button
          onClick={timerToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label={t('timer.ariaLabel')}
          title={t('timer.title')}
        >⏳</button>
        <button
          onClick={switchLanguage}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label={t('languageSwitch.ariaLabel')}
          title={t('languageSwitch.title')}
        >🌏</button>
        <button
          onClick={deleteInput}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label={t('deleteAll.ariaLabel')}
          title={t('deleteAll.title')}
        >🗑️</button>
        <button
          onClick={deepfocusToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
          aria-label={t('deepFocus.ariaLabel')}
          title={t('deepFocus.title')}
        >💡</button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
              {t('deleteAll.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('deleteAll.confirmMessage', 'Are you sure you want to delete all your writing? This action cannot be undone.')}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
              >
                {t('deleteAll.cancel', 'Cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
              >
                {t('deleteAll.confirm', 'Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Panel;