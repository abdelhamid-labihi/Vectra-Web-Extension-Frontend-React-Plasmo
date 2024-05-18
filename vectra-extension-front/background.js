function authenticate() {
  // Clear the isAuthentified value from the local storage
  chrome.storage.local.set({isAuthentified: false}, () => {
    chrome.storage.local.get(["isAuthentified"], (result) => {
      const isAuthenticated = result.isAuthentified || false;
      if (isAuthenticated) {
        // If the user is already authenticated, start directly with your extension's page
        chrome.tabs.create({
          url: chrome.runtime.getURL("/tabs/ResumeUploader")
        });
      } else {
        // If the user is not authenticated, create the sign-in tab
        chrome.tabs.create({
          url: "https://sharp-newt-79.accounts.dev/sign-in"
        }, function(tab) {
          // After the sign-in tab is created, listen for it to be updated
          chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, updatedTab) {
            if (tabId === tab.id && changeInfo.url === "https://sharp-newt-79.accounts.dev/default-redirect") {
              // The sign-in tab was redirected to the sign-in redirect URL, so close it
              chrome.tabs.remove(tabId);
              // And create a new tab with the URL of your extension's page
              chrome.tabs.create({
                url: chrome.runtime.getURL("/tabs/ResumeUploader.html")
              });
              // Remove this listener now that we've created the new tab
              chrome.tabs.onUpdated.removeListener(listener);
            }
          });
        });
      }
    });
  });
}


chrome.runtime.onInstalled.addListener(function() {
  authenticate();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'authenticate') {
    authenticate();
  }
});