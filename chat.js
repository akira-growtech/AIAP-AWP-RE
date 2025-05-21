async function sendMessage() {
  console.log("✅ sendMessage 関数が呼び出された");

  const input = document.getElementById("userInput");
  const userMessage = input.value;
  const chat = document.getElementById("chat");

  chat.innerHTML += `<div class="msg user">${userMessage}</div>`;
  chat.innerHTML += `<div class="msg bot">ゼウス考え中...</div>`;

  input.value = "";

  try {
    const response = await fetch("https://aiap-pwa.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    console.log("✅ fetch完了");

    const data = await response.json();

    chat.innerHTML += `<div class="msg bot">${data.reply}</div>`;
  } catch (err) {
    console.error("❌ エラー発生", err);
    chat.innerHTML += `<div class="msg bot">⚠ エラーが発生しました</div>`;
  }
}
