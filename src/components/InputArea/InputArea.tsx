import './InputArea.css';
import Timer from '../Timer/Timer';
import WordCount from '../WordCount/WordCount';

const InputArea = ()=>{
    return (
        <div className='inputarea-container'>
            <textarea placeholder="Enter your text here" className="inputarea" />
            <WordCount />
        </div>
    );
}

export default InputArea;