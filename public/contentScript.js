// HAS ACCESS TO THE CURRENT PAGE -> NEED TO SEND THE SELECTED TEXT TO THE EXTENSION

// let btnInsertion = '(' + function() {
//   console.log('custom btn');
// } + ')();';
// let script = document.createElement('script');
// script.textContent = btnInsertion;
// (document.head||document.documentElement).appendChild(script);
// script.remove();

// sending message to the background.js file
document.body.addEventListener('mouseup', () => {
  if (window.getSelection().toString().length != 0) {
    chrome.runtime.sendMessage({ msg: window.getSelection().toString() });
  }
});


// *://mail.google.com/* -> to work only with gmail
// ["http://*/*", "https://*/*"]