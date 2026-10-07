const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");


// Add message to chat
function addMessage(text, type) {

  const message = document.createElement("div");

  if (type === "user") {

    message.className = "message user-message";

    message.innerHTML = `
      <div class="bubble">${escapeHTML(text)}</div>
    `;

  } else {

    message.className = "message ai-message";

    message.innerHTML = `
      <div class="avatar">🤖</div>
      <div class="bubble">${escapeHTML(text)}</div>
    `;
  }

  chatBox.appendChild(message);

  chatBox.scrollTop = chatBox.scrollHeight;
}


// Prevent HTML injection
function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}


// AI reply
function getAIReply(message) {

  const text = message.toLowerCase().trim();


  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {

    return "Hello Parbez! 👋 Main Parbez AI hoon. Batao, main tumhari kya help karun?";

  }


  if (text.includes("tumhara naam") || text.includes("your name")) {

    return "Mera naam Parbez AI hai 🤖";

  }


  if (text.includes("kaise ho") || text.includes("how are you")) {

    return "Main bilkul ready hoon 😄 Tum batao, kya kaam karna hai?";

  }


  if (text.includes("time")) {

    return "Abhi ka time tumhare phone ke according check kar sakte ho. ⏰";

  }


  if (text.includes("who are you") || text.includes("tum kaun ho")) {

    return "Main tumhara personal AI assistant hoon. 🤖";

  }


  return "Main samajh gaya 👍 Lekin abhi mera real AI brain connect nahi hua hai. Agle step mein hum mujhe actual AI API se connect karenge.";
}


// Send message
function sendMessage() {

  const message = userInput.value.trim();

  if (!message) return;


  // User message
  addMessage(message, "user");


  // Clear input
  userInput.value = "";


  // Small delay for AI reply
  setTimeout(() => {

    const reply = getAIReply(message);

    addMessage(reply, "ai");

  }, 500);
}


// Send button
sendBtn.addEventListener("click", sendMessage);


// Enter key
userInput.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {

    event.preventDefault();

    sendMessage();

  }

});


// Voice input
micBtn.addEventListener("click", function() {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


  if (!SpeechRecognition) {

    alert("Tumhare browser mein voice recognition supported nahi hai.");

    return;

  }


  const recognition = new SpeechRecognition();

  recognition.lang = "hi-IN";

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;


  micBtn.textContent = "🔴";


  recognition.start();


  recognition.onresult = function(event) {

    const voiceText = event.results[0][0].transcript;

    userInput.value = voiceText;

    sendMessage();

  };


  recognition.onerror = function() {

    alert("Voice input mein problem hui.");

  };


  recognition.onend = function() {

    micBtn.textContent = "🎤";

  };

});
