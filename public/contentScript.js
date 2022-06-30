// HAS ACCESS TO THE CURRENT PAGE -> NEED TO SEND THE SELECTED TEXT TO THE EXTENSION

// async function setPageBackgroundColor() {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: function changeColor() {
//       chrome.storage.sync.get("color", ({ color }) => {
//         document.body.style.backgroundColor = color;
//         // const customBtn = document.createElement('button');
//         // customBtn.style.backgroundColor = 'red';
//         // document.body.appendChild(customBtn);
//       });
//     },
//   });
// };
let result;
document.body.addEventListener('mouseup', () => {
  console.log(window.getSelection().toString());
  result = window.getSelection().toString();
  chrome.runtime.sendMessage({ msg: result });
});