chrome.browserAction.onClicked.addListener((() => {
    chrome.browserAction.setPopup({
        popup: './index.html'
    })
}))