import { count } from 'console';
import './WordCount.css';

interface WordCountProps {
  count: number;
}

const WordCount = ({count}: WordCountProps) => {
    return (
      <div className='word-count dark:bg-gray-700 rounded transition dark:text-gray-100'>{count} Words</div>
    );
  };

export default WordCount;