import React from 'react';
import { useTranslation } from 'react-i18next';
import './WordCount.css';

interface WordCountProps {
  count: number;
}

const WordCount: React.FC<WordCountProps> = React.memo(({ count }) => {
  const { t } = useTranslation();

  return (
    <div className="word-count dark:bg-gray-700 rounded transition dark:text-gray-100">
      {count} {t('wordcountAmount.title')}
    </div>
  );
});

WordCount.displayName = 'WordCount';

export default WordCount;