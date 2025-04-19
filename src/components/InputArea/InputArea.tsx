import './InputArea.css';
import Timer from '../Timer/Timer';
import WordCount from '../WordCount/WordCount';
import React, { useImperativeHandle, useRef, useState } from 'react';

interface InputAreaProps {
    showWordCount: boolean;
    ref?: React.RefObject<{getTextContent: ()=>string}>;
}

const InputArea = ({showWordCount, ref}:InputAreaProps) => {
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

    const [text, setText]=useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    //expose method via ref
    useImperativeHandle(ref, ()=>({
        getTextContent: () => textareaRef.current?.value || ''
    }));

    return (
        <div className='inputarea-container'>
            <textarea ref={textareaRef} value={text} onChange={onInputChange} placeholder="Go for a write." className="inputarea" />
            {showWordCount && <WordCount count={textLength}/>}
        </div>
    );
}

export default InputArea;