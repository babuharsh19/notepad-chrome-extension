document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("download-btn").addEventListener("click", testClick);
    document.getElementById("new-tab").addEventListener("click", newtab);
    document.getElementById("send-chat").addEventListener("click", sendChatMessage);
    loadData();
    detectFormChanges();
  function testClick() {
    // jQuery code to download the text file
        var notes = $("textarea[name='notes']").val();
        var filename = "my_notes.txt"; // You can customize the filename here

        // Create a temporary Data URI for the text file
        var blob = new Blob([notes], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
  }
  // Function to save data to Chrome storage
function saveData() {
  const data = $("#notes").val();
  chrome.storage.local.set({ data }, () => {
    $("#notes").val(data);
  });
}

// Function to load data from Chrome storage on popup open
function loadData() {
  chrome.storage.local.get('data', (data) => {
    if (data.data) {
      $("#notes").val(data.data);
    }
  });
}
  function newtab(){
    chrome.tabs.create({ url: "popup.html", active: true }, (newTab) => { // Create new tab with popup.html
      if (newTab) {
        chrome.tabs.sendMessage(newTab.id, { notes: notes }); // Send notes to newly created tab
      }
    });
  }

  function detectFormChanges(){
    // Get initial email form data
    let inputField = $("#notes").attr("data-val");

      // Detect changes in email form on UMI and do actions on buttons based on changes
      $("#notes").on("change keyup paste", function() {
        saveData();
      });
}

function sendChatMessage() {
  let webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAAAX9ZWBDs/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=k1dS7lf6g4SklKZUbJ0kN7-pDgAkZRquaKJU4ZbI4Ns'
  let message = $("#notes").val();
  const payload = JSON.stringify(message);

$.post(webhookUrl, payload)
 .done(function (payload) {
   alert('Chat message sent succefully');
 })
 .fail(function(){
   alert('Error occurred while sending chat message')
 });

}
});
