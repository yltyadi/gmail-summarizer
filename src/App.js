import './App.css';
import {useState} from 'react';

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleTextToSummarize = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>Email Summary</h1>
      <form className='input-form'>
        <input value={inputValue} className="input-text" type='text' placeholder='put your text here' align='center' onChange={handleTextToSummarize}></input>
        <button className="input-button" type='submit'>Summarize</button>
      </form>
    </div>
  );
}

export default App;
