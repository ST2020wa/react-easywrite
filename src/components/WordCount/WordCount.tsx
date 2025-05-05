import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './WordCount.css';

interface WordCountProps {
  count: number;
}

const WordCount: React.FC<WordCountProps> = React.memo(({ count }) => {
  const { t } = useTranslation();

  const containerClasses = useMemo(() => 
    'word-count dark:bg-gray-700 rounded transition dark:text-gray-100',
    []
  );

  return (
    <div className={containerClasses}>
      {count} {t('wordcountAmount.title')}
    </div>
  );
});

WordCount.displayName = 'WordCount';

export default WordCount;