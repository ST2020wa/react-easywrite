import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Panel.css';
import { useTranslation } from 'react-i18next';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import { RootState } from '../../store';
import { 
  toggleWordCount, 
  toggleTimer, 
  toggleDarkMode, 
  toggleDeepFocus 
} from '../../store/slices/settingsSlice';
import { clearText } from '../../store/slices/textSlice';

interface PanelProps {
  inputAreaRef: React.RefObject<{getTextContent: () => string} | null>;
}

interface ButtonConfig {
  onClick: () => void;
  ariaLabel: string;
  title: string;
  icon: string;
}

const Panel = ({ inputAreaRef }: PanelProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { darkMode, deepFocus } = useSelector((state: RootState) => state.settings);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fullscreenToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .catch(err => console.error('Fullscreen error:', err));
    } else {
      document.exitFullscreen();
    }
  }, []);

  const exportToFile = useCallback(() => {
    if(!inputAreaRef.current) return;
    const content = inputAreaRef.current.getTextContent();
    const blob = new Blob([content], { type: 'text/plain' });

    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `writing_${new Date().toISOString().slice(0,10)}.txt`;
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  }, [inputAreaRef]);

  const deleteInput = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const confirmDelete = useCallback(() => {
    dispatch(clearText());
    setShowDeleteConfirm(false);
    window.location.reload();
  }, [dispatch]);

  const cancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  const switchLanguage = useCallback(() => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  }, [i18n]);

  const buttons: ButtonConfig[] = useMemo(() => [
    {
      onClick: fullscreenToggle,
      ariaLabel: t('fullScreen.ariaLabel'),
      title: t('fullScreen.title'),
      icon: '🔲'
    },
    {
      onClick: () => dispatch(toggleDarkMode()),
      ariaLabel: t('darkMode.ariaLabel'),
      title: t('darkMode.title'),
      icon: '🌓'
    },
    {
      onClick: exportToFile,
      ariaLabel: t('exportTxt.ariaLabel'),
      title: t('exportTxt.title'),
      icon: '💾'
    },
    {
      onClick: () => dispatch(toggleWordCount()),
      ariaLabel: t('wordCount.ariaLabel'),
      title: t('wordCount.title'),
      icon: '📈'
    },
    {
      onClick: () => dispatch(toggleTimer()),
      ariaLabel: t('timer.ariaLabel'),
      title: t('timer.title'),
      icon: '⏳'
    },
    {
      onClick: switchLanguage,
      ariaLabel: t('languageSwitch.ariaLabel'),
      title: t('languageSwitch.title'),
      icon: '🌏'
    },
    {
      onClick: deleteInput,
      ariaLabel: t('deleteAll.ariaLabel'),
      title: t('deleteAll.title'),
      icon: '🗑️'
    },
    {
      onClick: () => dispatch(toggleDeepFocus()),
      ariaLabel: t('deepFocus.ariaLabel'),
      title: t('deepFocus.title'),
      icon: '💡'
    }
  ], [
    fullscreenToggle,
    exportToFile,
    switchLanguage,
    deleteInput,
    dispatch,
    t
  ]);

  return (
    <>
      <div className={`panel-icons ${darkMode ? 'dark' : ''}`}>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
            aria-label={button.ariaLabel}
            title={button.title}
          >
            {button.icon}
          </button>
        ))}
      </div>

      {showDeleteConfirm && (
        <DeleteConfirmModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default React.memo(Panel);