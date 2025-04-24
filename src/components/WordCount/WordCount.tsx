import { count } from 'console';
import './WordCount.css';
import { useTranslation } from 'react-i18next';

interface WordCountProps {
  count: number;
}

const WordCount = ({count}: WordCountProps) => {
  const {t, i18n} = useTranslation();
    return (
      <div className='word-count dark:bg-gray-700 rounded transition dark:text-gray-100'>{count} {t('wordcountAmount.title')}</div>
    );
  };

export default WordCount;