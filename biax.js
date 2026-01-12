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
<script>
const floatBtn = document.getElementById("biax-float-btn");
const panel = document.getElementById("biax-panel");
const closeBtn = document.getElementById("biax-close");
const expandBtn = document.getElementById("biax-expand");

floatBtn.onclick = () => panel.classList.add("active");
closeBtn.onclick = () => panel.classList.remove("active");

expandBtn.onclick = () => {
  window.location.href = "biax.html";
};
</script>
