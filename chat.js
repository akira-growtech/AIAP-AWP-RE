const chatContainer = document.getElementById("chat-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  // 表示
  const userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.textContent = "🧑‍💼 明良さん: " + message;
  chatContainer.appendChild(userDiv);

  messageInput.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    console.log("✅ sendMessage 関数が呼び出された");

    const response = await fetch("https://aiap-pwa.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    const aiDiv = document.createElement("div");
    aiDiv.className = "ai";
    aiDiv.textContent = "🤖 ゼウス: " + data.reply;
    chatContainer.appendChild(aiDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } catch (error) {
    console.error("❌ エラー発生", error);
    const errorDiv = document.createElement("div");
    errorDiv.className = "ai";
    errorDiv.textContent = "❌ ゼウスとの通信に失敗しました。";
    chatContainer.appendChild(errorDiv);
  }
}

sendButton.onclick = sendMessage;
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // 改行ではなく送信
    sendMessage();
  }
});
