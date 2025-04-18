import { count } from 'console';
import './WordCount.css';

interface WordCountProps {
  count: number;
}

const WordCount = ({count}: WordCountProps) => {
    return (
      <div className='word-count'>{count} Words</div>
    );
  };

export default WordCount;