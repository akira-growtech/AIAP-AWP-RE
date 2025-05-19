document.getElementById("sendButton").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  const chatBox = document.getElementById("chatBox");

  // ユーザーメッセージ表示
  chatBox.innerHTML += "👤: " + text + "\n";

  // AI応答プレースホルダー
  chatBox.innerHTML += "🤖: 考え中...\n";

  // 最新のボットメッセージ箇所を取得
  const messages = chatBox.innerHTML.split("\n");
  const botIndex = messages.lastIndexOf("🤖: 考え中...");

  try {
    const response = await fetch("https://aiap-proxy.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.reply || "エラー: 返答がありません";

    messages[botIndex] = "🤖: " + reply;
    chatBox.innerHTML = messages.join("\n");
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    messages[botIndex] = "🤖: エラーが発生しました。";
    chatBox.innerHTML = messages.join("\n");
    chatBox.scrollTop = chatBox.scrollHeight;
    console.error(error);
  }

  input.value = "";
  input.focus();
}