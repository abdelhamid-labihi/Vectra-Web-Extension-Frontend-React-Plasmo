function authenticate() {
  const token = chrome.storage.local.get("jwt-token")
  if (token) {
    const resume = chrome.storage.local.get("resume")
    if (!resume) {
      chrome.tabs.create({
        url: chrome.runtime.getURL("/tabs/ResumeUploader")
      })
    }
  } else {
    chrome.tabs.create({
      url: chrome.runtime.getURL("/tabs/login")
    })
  }
}

chrome.runtime.onStartup.addListener(function () {
  authenticate()
})

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.action === "authenticate") {
    authenticate()
  }
})
