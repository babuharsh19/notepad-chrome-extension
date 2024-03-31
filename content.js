// Send message to background script on download click
document.addEventListener("DOMContentLoaded", () => {
document.getElementById("download-btn").addEventListener("click", function() {
    var notes = document.querySelector("textarea[name='notes']").value;
    chrome.runtime.sendMessage({ action: "save_notes", text: notes });
  });
  
  // Get notes from background script and set textarea value
  chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "get_notes" && message.notes) {
      document.querySelector("textarea[name='notes']").value = message.notes;
    }
  });
  
  // Get notes on script load (optional)
  window.onload = function() {
    chrome.runtime.sendMessage({ action: "get_notes" });
  };
});