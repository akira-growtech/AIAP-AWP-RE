async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  const chat = document.getElementById("chat");

  const userDiv = document.createElement("div");
  userDiv.className = "msg user";
  userDiv.textContent = "👤 明良: " + text;
  chat.appendChild(userDiv);

  const botDiv = document.createElement("div");
  botDiv.className = "msg bot";
  botDiv.textContent = "🤖 Zeus: 考え中...";
  chat.appendChild(botDiv);

  try {
    const response = await fetch("https://aiap-proxy.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    botDiv.textContent = "🤖 Zeus: " + data.reply;
  } catch (err) {
    botDiv.textContent = "🤖 Zeus: エラーが発生しました。";
    console.error(err);
  }

  input.value = "";
}