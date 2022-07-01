// HAS ACCESS TO THE CURRENT PAGE -> NEED TO SEND THE SELECTED TEXT TO THE EXTENSION

// let result = '';
// sending message to the background.js file
document.body.addEventListener('mouseup', () => {
  console.log(window.getSelection().toString());
  // result = window.getSelection().toString();
  chrome.runtime.sendMessage({ msg: window.getSelection().toString() });
});

// const createCustomBtn = () => {
//   let node = document.getElementsByClassName('G-tF')[0];
//   let btn = document.createElement('div');
//   btn.style.backgroundColor = 'red';
//   btn.style.width = '20px';
//   btn.style.height = '20px';
//   node.appendChild(btn);
// };

// createCustomBtn();