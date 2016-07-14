chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
    chrome.tabs.insertCSS(null, {file: "shortcuts.css"});
    chrome.tabs.executeScript(null, {file: "models/Target.js"});
    chrome.tabs.executeScript(null, {file: "services/TargetCollector.js"});
    chrome.tabs.executeScript(null, {file: "services/ShortcutMapper.js"});
    chrome.tabs.executeScript(null, {file: "services/PopupGenerator.js"});
    chrome.tabs.executeScript(null, {file: "jquery-3.0.0.min.js"});
    chrome.tabs.executeScript(null, {file: "shortcuts.js"});
});
