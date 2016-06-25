chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
    chrome.tabs.executeScript(null, {file: "jquery-3.0.0.min.js"});
    chrome.tabs.executeScript(null, {file: "shortcuts.js"});
});
