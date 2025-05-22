const chatHistoryKey = "zeus_chat_history"; // localStorageキー名

// 履歴読み込み
function loadChatHistory() {
  return JSON.parse(localStorage.getItem(chatHistoryKey)) || [];
}

// 履歴保存
function saveChatHistory(history) {
  localStorage.setItem(chatHistoryKey, JSON.stringify(history));
}

// 履歴リセット（オプション）
function clearChatHistory() {
  localStorage.removeItem(chatHistoryKey);
  document.getElementById("chat").innerHTML = "";
}

// チャット表示用
function appendMessage(role, content) {
  const chat = document.getElementById("chat");
  const roleClass = role === "user" ? "user" : "bot";
  chat.innerHTML += `<div class="msg ${roleClass}">${content}</div>`;
  chat.scrollTop = chat.scrollHeight;
}

// 送信関数（履歴対応）
async function sendMessage() {
  console.log("✅ sendMessage 関数が呼び出された");

  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  const chat = document.getElementById("chat");

  if (!userMessage) return;

  appendMessage("user", userMessage);
  appendMessage("bot", "ゼウス考え中...");

  input.value = "";

  // 履歴読み込みと更新
  const history = loadChatHistory();
  history.push({ role: "user", content: userMessage });

  // APIに送るメッセージ（systemを最初に含める）
  const messages = [
    { role: "system", content: "あなたは親切なAIアシスタントのゼウスです。" },
    ...history
  ];

  try {
    const response = await fetch("https://aiap-pwa.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }) // ← ここを変更
    });

    console.log("✅ fetch完了");

    const data = await response.json();
    const aiMessage = data.reply;

    // ダミー消す（"ゼウス考え中..."）
    const botThinking = document.querySelectorAll(".msg.bot");
    if (botThinking.length > 0) {
      botThinking[botThinking.length - 1].remove();
    }

    appendMessage("bot", aiMessage);

    history.push({ role: "assistant", content: aiMessage });
    saveChatHistory(history);
  } catch (err) {
    console.error("❌ エラー発生", err);
    appendMessage("bot", "⚠ エラーが発生しました");
  }
}

// ページ読み込み時に履歴表示
window.addEventListener("DOMContentLoaded", () => {
  const history = loadChatHistory();
  history.forEach(m => appendMessage(m.role, m.content));
});
