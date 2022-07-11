// STORES INFO THAT CAN BE ACCESS BY APP.JS. ALL LOGS IN APP.JS

let color = '#80ed99';
let textToSum = '';
let resultTxt = '';

// getting message from contentscript file 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  textToSum = message.msg;
  chrome.storage.sync.set({ textToSum });
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
});