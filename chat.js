async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  const chat = document.getElementById("chat");

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = text;
  chat.appendChild(userMsg);

  const botMsg = document.createElement("div");
  botMsg.className = "message bot";
  botMsg.textContent = "考え中...";
  chat.appendChild(botMsg);

  try {
    const response = await fetch("https://aiap-pwa.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    if (data.reply) {
      botMsg.textContent = data.reply;
    } else {
      botMsg.textContent = "エラーが発生しました。";
      console.error(data.error);
    }
  } catch (err) {
    botMsg.textContent = "通信エラーが発生しました。";
    console.error(err);
  }

  input.value = "";
}