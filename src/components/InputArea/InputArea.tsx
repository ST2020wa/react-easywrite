import './InputArea.css';
import Timer from '../Timer/Timer';
import WordCount from '../WordCount/WordCount';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface InputAreaProps {
    showWordCount: boolean;
}

const InputArea = forwardRef<{getTextContent: () => string}, InputAreaProps>(({showWordCount}, ref) => {
    const [textLength, setTextLength]=useState(0);
    const [text, setText]=useState('');

    const isCJK = (char: string) => {
        return /[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/.test(char);
    };

    const countWords = (text: string)=>{
        const englishWords = text.split(/[\s]+/).filter(w => w.length > 0 && !isCJK(w));
        const cjkWords = Array.from(text).filter(word => isCJK(word));
        return englishWords.length + cjkWords.length;
    };

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextLength(countWords(e.target.value));
        setText(e.target.value);
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        getTextContent: () => text || '',
    }));

    return (
        <div className='inputarea-container'>
            <textarea ref={textareaRef} value={text} onChange={onInputChange} placeholder="Go for a write." className="inputarea" />
            {showWordCount && <WordCount count={textLength}/>}
        </div>
    );
});

export default InputArea;