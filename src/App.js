import './App.css';
import {useState} from 'react';
// import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("Result");

  const handleTextToSummarize = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleSummarizeText = (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("key", "6b08e93b581ef423fd9001035f019564");
    formdata.append("txt", inputValue);
    formdata.append("sentences", "3");
    
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://api.meaningcloud.com/summarization-1.0", requestOptions)
      .then(response => response.json())
      .then((data) => setResult(data.summary))
      .catch(error => setResult('error', error));
  };

  // document.querySelector(".ii").innerText

  return (
    <div className="App">
      <h1>Email Summary</h1>
      <form className='input-form'>
        <textarea 
          value={inputValue} 
          className="input-text" 
          type='text' 
          placeholder='put your text here' 
          data-gramm="false" 
          onChange={handleTextToSummarize}>
        </textarea>
        <button className="input-button" type='submit' onClick={handleSummarizeText}>Summarize</button>
      </form>
      <h3 className='result'>{result}</h3>
    </div>
  );
}

export default App;
