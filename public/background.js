// STORES INFO THAT CAN BE ACCESS BY APP.JS

let color = '#80ed99';
let textToSum = '';

// getting message from contentscript file 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // if (message.type == 'from_content_script') {
  //   messageQueue.push(message);
  // } else if (message.type == 'from_popup') {
  //   sendResponse(messageQueue);
  // }
  textToSum = message.msg;
  chrome.storage.sync.set({ textToSum });
  console.log(textToSum);
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  // console.log('Default background color set to %cgreen', `color: ${color}`);
});