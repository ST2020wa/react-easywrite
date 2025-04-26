import './InputArea.css';
import Timer from '../Timer/Timer';
import WordCount from '../WordCount/WordCount';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
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
    const [deepFocus, setDeepFocus] = useState(localStorage.getItem('deepFocus') === 'true');
    const [lastCursorPosition, setLastCursorPosition] = useState(0);

    useEffect(() => {
        const handleStorageChange = () => {
            setDeepFocus(localStorage.getItem('deepFocus') === 'true');
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const isCJK = (char: string) => {
        return /[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af]/.test(char);
    };

    const countWords = (text: string)=>{
        const englishWords = text.split(/[\s]+/).filter(w => w.length > 0 && !isCJK(w));
        const cjkWords = Array.from(text).filter(word => isCJK(word));
        return englishWords.length + cjkWords.length;
    };

    const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (deepFocus) {
            const newText = e.target.value;
            
            
            // If the new text is shorter than the old text, prevent deletion
            if (newText.length < text.length) {
                //TODO: what does this do?
                e.target.value = text;
                e.target.selectionStart = e.target.selectionEnd = text.length;
                alert('Don\'t look back, keep writing.');
                return;
            }
            
            // If the new text starts differently from the old text, prevent editing
            if (!newText.startsWith(text)) {
                e.target.value = text;
                e.target.selectionStart = e.target.selectionEnd = text.length;
                alert('Don\'t look back, keep writing.');
                return;
            }
            
            setText(newText);
            setLastCursorPosition(newText.length);
        } else {
            setText(e.target.value);
        }
        setText(e.target.value);
        setTextLength(countWords(e.target.value));
        localStorage.setItem('textInput', e.target.value);
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!deepFocus) return;
        
        const textarea = e.currentTarget;
        const cursorPos = textarea.selectionStart;
        
        // Prevent arrow keys, home key, and mouse clicks from moving cursor backwards
        if (
            (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Home') ||
            (e.key === 'Backspace' && cursorPos < text.length)
        ) {
            e.preventDefault();
            textarea.selectionStart = textarea.selectionEnd = text.length;
            alert('Don\'t look back, keep writing.');
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        if (!deepFocus) return;
        
        const textarea = e.currentTarget;
        const cursorPos = textarea.selectionStart;
        
        if (cursorPos < text.length) {
            e.preventDefault();
            textarea.selectionStart = textarea.selectionEnd = text.length;
        }
    };

    useImperativeHandle(ref, () => ({
        getTextContent: () => text || '',
    }));

    return (
        <div className='inputarea-container'>
            <textarea 
                ref={textareaRef} 
                value={text} 
                onChange={onInputChange}
                onKeyDown={handleKeyDown}
                onMouseDown={handleMouseDown}
                placeholder={t('goForWrite.title')} 
                className="inputarea dark:bg-gray-700 rounded transition dark:text-gray-100" 
            />
            {showWordCount && <WordCount count={textLength}/>}
            <div className={showTimer ? '' : 'hidden'}><Timer /></div>
        </div>
    );
});

export default InputArea;