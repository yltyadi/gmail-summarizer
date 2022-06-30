/*global chrome*/
import './App.css';
import {useState} from 'react';
// document.querySelector(".ii").innerText 

function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("Result");
  const [test, setTest] = useState("TESTING");

  const handleTextToSummarize = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleSummarizeText = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("key", "6b08e93b581ef423fd9001035f019564");
    formdata.append("txt", test);
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

  const handleMouseUp = () => {
    console.log(`Selected text: ${window.getSelection().toString()}`);
  };

  async function setPageBackgroundColor() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: function changeColor() {
        chrome.storage.sync.get("color", ({ color }) => {
          document.body.style.backgroundColor = color;
        });
      },
    });
  };

  const summarizeSelectedText = (event) => {
    event.preventDefault();
    chrome.storage.sync.get("textToSum", ({ textToSum }) => {
      console.log(textToSum);
      setTest(textToSum);
    });
  };

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
        <button className="input-button" type='submit' onClick={summarizeSelectedText}>Selected</button>
        <button className="input-button" type='submit' onClick={setPageBackgroundColor}>MAKE GREEN</button>
      </form>
      <h3 className='result'>{result}</h3>
      <h3>{test}</h3>
      <h3 onMouseUp={handleMouseUp}>Text aoiea wgoiw egwogi wgoiw gwg wog</h3>
    </div>
  );
}

export default App;
