import './InputArea.css';
import Timer from '../Timer/Timer';
import WordCount from '../WordCount/WordCount';
import { useState } from 'react';

const InputArea = ({showWordCount}:any) => {
    const [textLength, setTextLength]=useState(0);

    const isCJK = (char: string) => {
        // Unicode ranges for Chinese/Japanese/Korean characters
        return /[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/.test(char);
      };
    const countWords = (text: string)=>{
        const englishWords = text.split(/[\s]+/).filter(w => w.length > 0 && !isCJK(w));
        const cjkWords = Array.from(text).filter(word => isCJK(word));
        return englishWords.length + cjkWords.length;
    };

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextLength(countWords(e.target.value));
    };

    return (
        <div className='inputarea-container'>
            <textarea onChange={onInputChange} placeholder="Go for a write." className="inputarea" />
            {showWordCount && <WordCount count={textLength}/>}
        </div>
    );
}

export default InputArea;