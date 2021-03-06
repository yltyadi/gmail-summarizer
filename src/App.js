/*global chrome*/
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("Summary will be here...");
  const [text, setText] = useState("");
  // getting selected text from storage in background.js file and assigning it to the text state
  chrome.storage.sync.get("textToSum", ({ textToSum }) => {
    setText(textToSum);
  });

  chrome.storage.sync.set({ result }); // sending result to storage to access it with my custom button

  // unpack handleSummarizeText here not in function
  // send to backgroundjs and store in storage
  // then access it in testFunc below

  useEffect(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: function addBtn() {
        // checking if the button exists to prevent from creating another button 
        if (!document.getElementById('custom-btn')) {
          let node = document.querySelector('.gb_qe.gb_oe'); // G-tF is inside the single letter header
          let btn = document.createElement('button');
          btn.setAttribute('id', 'custom-btn');
          btn.style.backgroundColor = '#80ed99';
          btn.style.width = '44px';
          btn.style.height = '44px';
          btn.style.border = 'none';
          btn.style.borderRadius = '10px';
          btn.style.marginRight = '20px';
          node.insertBefore(btn, node.children[0]);
          btn.addEventListener('click', () => {
            // create result div once the button is clicked
            let resultDiv;
            if (!document.getElementById('custom-result')) {
              let node = document.querySelector('.a3s.aiL ');
              resultDiv = document.createElement('div')
              resultDiv.setAttribute('id', 'custom-result');
              resultDiv.style.width = '98%';
              resultDiv.style.minHeight = '20px';
              resultDiv.style.overflow = 'hidden';
              resultDiv.style.backgroundColor = '#80ed99';
              resultDiv.style.borderRadius = '15px';
              resultDiv.style.textAlign = 'justify';
              resultDiv.style.padding = '5px';
              resultDiv.style.marginBottom = '5px';
              resultDiv.style.color = '#021311';
              resultDiv.style.fontWeight = 'bold';
              node.insertBefore(resultDiv, node.children[0]);
            }
            chrome.storage.sync.get("result", ({ result }) => {
              console.log(result);
              resultDiv.innerHTML = result;
            });
          });
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
    formdata.append("txt", text); // passing selected text from background.js OR inputValue
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
        <button className="input-button" type='submit' onClick={setPageBackgroundColor}>MAKE GREEN</button>
      </form> */}
      <button className="input-button" onClick={handleSummarizeText}>Summarize</button>
      <h3 className='result'>{result}</h3>
    </div>
  );
}

export default App;
