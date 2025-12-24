document.addEventListener("DOMContentLoaded", () => {
  const chatBtn = document.getElementById("ai-chat-btn");
  const chatBox = document.getElementById("ai-chatbox");
  const closeBtn = document.getElementById("close-ai");
  const sendBtn = document.getElementById("send-ai");
  const input = document.getElementById("ai-input");
  const messages = document.getElementById("ai-messages");

  if (!chatBtn) return; // safety check

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
      addMessage("Sorry, something went wrong.", "bot");
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
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    return data.choices[0].message.content;
  }
});
