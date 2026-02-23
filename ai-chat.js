document.addEventListener("DOMContentLoaded", () => {

  /* ===== Inject CSS ===== */
  const style = document.createElement("style");
  style.innerHTML = `
  #ai-chat-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    background: black;
    color: white;
    font-size: 22px;
    cursor: pointer;
    z-index: 9999;
  }

  #ai-chatbox {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 320px;
    height: 420px;
    background: white;
    border-radius: 14px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    display: none;
    flex-direction: column;
    overflow: hidden;
    z-index: 9999;
    font-family: Arial, sans-serif;
  }

  #ai-header {
    background: black;
    color: white;
    padding: 12px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #close-ai {
    cursor: pointer;
    font-size: 18px;
  }

  #ai-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background: #f6f6f6;
  }

  .ai-message {
    padding: 8px 10px;
    margin: 6px 0;
    border-radius: 10px;
    max-width: 80%;
    font-size: 14px;
  }

  .user {
    background: black;
    color: white;
    margin-left: auto;
  }

  .bot {
    background: white;
    border: 1px solid #ddd;
  }

  #ai-input-area {
    display: flex;
    border-top: 1px solid #ddd;
  }

  #ai-input {
    flex: 1;
    border: none;
    padding: 10px;
    outline: none;
  }

  #send-ai {
    border: none;
    background: black;
    color: white;
    padding: 10px 14px;
    cursor: pointer;
  }
  `;
  document.head.appendChild(style);

  /* ===== Elements ===== */
  const chatBtn = document.getElementById("ai-chat-btn");
  const chatBox = document.getElementById("ai-chatbox");
  const closeBtn = document.getElementById("close-ai");
  const sendBtn = document.getElementById("send-ai");
  const input = document.getElementById("ai-input");
  const messages = document.getElementById("ai-messages");

  if (!chatBtn) return;

  chatBtn.onclick = () => chatBox.style.display = "flex";
  closeBtn.onclick = () => chatBox.style.display = "none";

  sendBtn.onclick = sendMessage;
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
  });

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const typing = addMessage("Typing...", "bot");

    try {
      const response = await fetchAI(text);
      typing.remove();
      addMessage(response, "bot");
    } catch (err) {
      typing.remove();
      addMessage("Error connecting to AI.", "bot");
      console.error(err);
    }
  }

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `ai-message ${type}`;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  async function fetchAI(prompt) {
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await res.json();
    return data.output[0].content[0].text;
  }
});
