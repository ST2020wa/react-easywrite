import './InputArea.css';
import Timer from '../Timer/Timer';
import WordCount from '../WordCount/WordCount';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

interface InputAreaProps {
    showWordCount: boolean;
    showTimer: boolean;
}

const InputArea = forwardRef<{getTextContent: () => string}, InputAreaProps>(({showWordCount, showTimer}, ref) => {
    const {t, i18n} = useTranslation();
    const [textLength, setTextLength]=useState(0);
    const [text, setText]=useState(localStorage.getItem('textInput') ? localStorage.getItem('textInput') : '');

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
        localStorage.setItem('textInput',text);
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        getTextContent: () => text || '',
    }));

    return (
        <div className='inputarea-container'>
            <textarea ref={textareaRef} value={text} onChange={onInputChange} placeholder={t('goForWrite.title')} className="inputarea dark:bg-gray-700 rounded transition dark:text-gray-100" />
            {showWordCount && <WordCount count={textLength}/>}
            <div className={showTimer ? '' : 'hidden'}><Timer /></div>
        </div>
    );
});

export default InputArea;