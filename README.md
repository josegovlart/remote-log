# 🖥️ Remote Console

**Remote Console** is a lightweight application to visualize logs in real time in your browser.  
It uses **Express** + **WebSockets** on the backend and a minimal web interface on the frontend.  

---

## 📦 Installation

Clone the repository:
```bash
git clone https://github.com/<your-username>/remote-console.git
cd remote-console
```

Install dependencies:
```bash
npm install
```

## ⚙️ Configuration
We need to first set our server up by using your IP. In the `public/config.js` replace `YOUR_IP`.

## ▶️ Usage
1. Start the server
You can start the server simply by running `nodemon`, this way, changes you do in the `ws-server.js` file are going to be updated automatically.

2. Open the **Remote Console** huuuuuuge UI 😅
- Open in your browser: http://localhost:3001

## 📤 Sending Logs
You can send logs to the server via HTTP POST requests.

Example with curl:
```bash
curl -X POST http://localhost:3001/log \
  -H "Content-Type: application/json" \
  -d '{"level": "info", "message": "Hello Remote Console!"}'
```

Example with Node.js (via webSocket):
```bash
const WebSocket = require("ws");

const ws = new WebSocket("ws://YOUR_IP:3001");

ws.on("open", () => {
  console.log("Connected to Remote Console");

  setInterval(() => {
    const log = { level: "info", message: "teste via WS" };
    ws.send(JSON.stringify(log));
    console.log("Sent:", log);
  }, 500);
});

ws.on("error", (err) => {
  console.error("WebSocket error:", err);
});

ws.on("close", () => {
  console.log("Connection closed");
});
```

Example with Node.js (via HTTP request):
```bash
const sendLog = async (level, message) => {
  const consoleServerUrl = "http://localhost:3001/log";

  try {
    const response = await fetch(consoleServerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ level, message }),
    });

    if (!response.ok) {
      console.error(`Failed to send log. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Network error while sending log:", error);
  }
};

// Example usage
sendLog("info", "Server started successfully!");
sendLog("warn", "Memory usage is high!");
sendLog("error", "Critical processing error!");
```
# Updates are coming soon!

## 🤝 Contributing
Contributions are welcome!
To contribute:
1.	Fork the project
2.	Create a branch (git checkout -b feature/my-feature)
3.	Commit your changes (git commit -m "Add my feature")
4.	Push (git push origin feature/my-feature)
5.	Open a Pull Request
