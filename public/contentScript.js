// HAS ACCESS TO THE CURRENT PAGE -> NEED TO SEND THE SELECTED TEXT TO THE EXTENSION

// sending message to the background.js file
document.body.addEventListener('mouseup', () => {
  if (window.getSelection().toString().length != 0) {
    chrome.runtime.sendMessage({ msg: window.getSelection().toString() });
  }
});

// *://mail.google.com/* -> to work only with gmail
// ["http://*/*", "https://*/*"]