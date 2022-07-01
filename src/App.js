/*global chrome*/
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("Result");
  const [text, setText] = useState("");
  // getting selected text from storage in background.js file and assigning it to the text state
  chrome.storage.sync.get("textToSum", ({ textToSum }) => {
    setText(textToSum);
  });

  useEffect(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: function addBtn() {
        // checking if the button exists to prevent from creating another button 
        if (!document.getElementById('custom-btn')) {
          let node = document.getElementsByClassName('G-tF'); // an array of elements with the given class name
          let btn = document.createElement('div');
          btn.setAttribute('id', 'custom-btn');
          btn.style.backgroundColor = '#57cc99';
          btn.style.width = '20px';
          btn.style.height = '20px';
          btn.style.borderRadius = '5px';
          for (let i = 0; i < node.length; i++) {
            node[i].appendChild(btn);
          }
        }
      }
    });
  }, []);

  const handleTextToSummarize = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleSummarizeText = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("key", "6b08e93b581ef423fd9001035f019564");
    formdata.append("txt", text); // passing selected text from background.js
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

  // const handleMouseUp = (event) => {
  //   event.preventDefault();
  //   console.log(`Selected text: ${window.getSelection().toString()}`);
  // };

  async function setPageBackgroundColor(event) {
    event.preventDefault();
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

  // const summarizeSelectedText = (event) => {
  //   event.preventDefault();
  //   chrome.storage.sync.get("textToSum", ({ textToSum }) => {
  //     console.log(textToSum);
  //     setText(textToSum);
  //   });
  // };

  return (
    <div className="App">
      <h1>Email Summarizer</h1>
      {/* <form className='input-form'>
        <textarea 
          value={inputValue} 
          className="input-text" 
          type='text' 
          placeholder='put your text here' 
          data-gramm="false" 
          onChange={handleTextToSummarize}>
        </textarea>
        <button className="input-button" type='submit' onClick={handleSummarizeText}>Summarize</button>
        // <button className="input-button" type='submit' onClick={summarizeSelectedText}>Selected</button>
        <button className="input-button" type='submit' onClick={setPageBackgroundColor}>MAKE GREEN</button>
      </form> */}
      <button className="input-button" onClick={handleSummarizeText}>Summarize</button>
      <h3 className='result'>{result}</h3>
      {/* <h3>{text}</h3> */}
      {/* <h3 onMouseUp={handleMouseUp}>Text aoiea wgoiw egwogi wgoiw gwg wog</h3> */}
    </div>
  );
}

export default App;
