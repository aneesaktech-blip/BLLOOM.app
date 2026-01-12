function sendMessage() {
  const input = document.getElementById("biax-text");
  const messages = document.getElementById("biax-messages");
  const text = input.value.trim();

  if (!text) return;

  messages.innerHTML += `<div class="user-msg">${text}</div>`;
  input.value = "";

  setTimeout(() => {
    messages.innerHTML += `<div class="bot-msg">biAX is getting smarter 👀</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 600);
}
