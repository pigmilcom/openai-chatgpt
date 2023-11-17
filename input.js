// ------------------------------------------------------------------------------------------------------------------------
//
//  Description:    OpenAI ChatGPT (PHP + Curl)
//  Author:         PIGMIL 
//  Website:        https://pigmil.com
//
// ------------------------------------------------------------------------------------------------------------------------
 
var chatForm = document.getElementById("chatForm"); 

var generateBtn = document.getElementById('generate'); 
var generateLoading = document.getElementById('generateLoading');

let chatInput = document.getElementById('chatInp'); 
let chatImgMethod = document.getElementById('img-method');
let chat_content = document.getElementById("chatRes");
let chat_img_content = document.getElementById("chatResImg");

function HandleRequest(prompt, method){

  // Send the chat to server.
  fetch("prompt_request.php?prompt="+prompt+"&"+method, {
    method: "GET", 
  })
    .then((response) => {
      if (!response.ok) { 
        generateLoading.style.display = "none";
        generateBtn.style.display = "block";
        chatInput.disabled = false;
        throw new Error("HTTP error " + response.status); 
      } 
      return response.text(); // Return the response as text
    })
    .then((data) => {    
    // Process the chatgpt here
    let chat_received_data = JSON.parse(data);      

    if(method=='img'){
      chat_img_content.src=chat_received_data.data
      chat_content.style.display = 'none';
      chat_img_content.style.display = 'block'; 
    } else { 
      chat_content.textContent = chat_received_data.data
      chat_img_content.style.display = 'none'; 
      chat_content.style.display = 'block';
    }
      
    generateLoading.style.display = "none";
    generateBtn.style.display = "block";
    chatInput.disabled = false;

    })
    .catch(function (error) {
      console.error("Error sending chat request to server:", error);
      generateLoading.style.display = "none";
      generateBtn.style.display = "block";
      chatInput.disabled = false;
      return false;
    }); 

    return false;
}

chatForm.addEventListener("submit", function(e) { 
  e.preventDefault();
 
  let method = 'txt'; 

  generateBtn.style.display = "none";
  chat_img_content.style.display = 'none';
  generateLoading.style.display = "block";
  chat_content.textContent = '';
  chat_img_content.src = '';
  chatInput.disabled = true;

  if(chatImgMethod.checked == true){
    method = 'img';
  }
  console.log("Sending prompt to server...");
  HandleRequest(chatInput.value, method);

});
 
$("input:checkbox").on('click', function() { 
  var $box = $(this);
  if ($box.is(":checked")) { 
    var group = "input:checkbox[name='" + $box.attr("name") + "']"; 
    $(group).prop("checked", false);
    $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});
 