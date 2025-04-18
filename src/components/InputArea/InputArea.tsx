import './InputArea.css';
import Timer from '../Timer/Timer';
import WordCount from '../WordCount/WordCount';

const InputArea = ({showWordCount}:any) => {
    return (
        <div className='inputarea-container'>
            <textarea placeholder="Go for a write." className="inputarea" />
            {showWordCount && <WordCount/>}
        </div>
    );
}

export default InputArea;