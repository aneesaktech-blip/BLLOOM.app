document.addEventListener("DOMContentLoaded", () => {
  const icon = document.createElement("div");
  icon.id = "biax-icon";
  icon.innerText = "AI";

  icon.onclick = () => {
    window.location.href = "biax.html";
  };

  document.body.appendChild(icon);
});
