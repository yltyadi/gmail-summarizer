/*global chrome*/
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("Summary will be here...");
  const [text, setText] = useState("");
  // getting selected text from storage in background.js file and assigning it to the text state
  // chrome.storage.sync.get("textToSum", ({ textToSum }) => {
  //   setText(textToSum);
  // });

  // chrome.storage.sync.set({ result }); // sending result to storage to access it with my custom button

  useEffect(async () => {
    // getting selected text from storage every time on reload
    chrome.storage.sync.get("textToSum", ({ textToSum }) => {
      setText(textToSum);
    });
    // sending result to storage when user opens the popup
    chrome.storage.sync.set({ result });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: function addBtn() {
        // checking if the button exists to prevent from creating another button 
        if (!document.getElementById('custom-btn')) {
          let node = document.querySelector('.gb_qe.gb_oe');
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
            if (document.getElementById('custom-result')) {
              document.getElementById('custom-result').remove();
            }
            let node = document.querySelector('.a3s.aiL ');
            let resultDiv = document.createElement('div');
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
            resultDiv.style.fontWeight = '600';
            node.insertBefore(resultDiv, node.children[0]);

            const formdata = new FormData();
            formdata.append("key", process.env.REACT_APP_API_KEY);
            formdata.append("txt", window.getSelection().toString()); // passing selected text from background.js OR inputValue
            formdata.append("sentences", "3");
            
            const requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://api.meaningcloud.com/summarization-1.0", requestOptions)
              .then(response => response.json())
              .then((data) => {
                resultDiv.innerHTML = data.summary;
              })
              .catch(error => console.log(error));

            // resultDiv.innerHTML = result;
            // chrome.storage.sync.get("result", ({ result }) => {
            //   resultDiv.innerHTML = result;
            // });
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
    formdata.append("key", process.env.REACT_APP_API_KEY);
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
      <h1>summarize.me</h1>
      <button className="input-button" onClick={handleSummarizeText}>Summarize</button>
      <h3 className='result'>{result}</h3>
    </div>
  );
}

export default App;
