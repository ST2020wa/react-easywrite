import './InputArea.css';
import WordCount from './WordCount';
import Timer from './Timer';

const InputArea = ()=>{
    return (
        <div className='inputarea-container'>
            <textarea placeholder="Enter your text here" className="inputarea" />
            <WordCount />
        </div>
    );
}

export default InputArea;