const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app); 
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      broadcast(data);
    } catch (e) {
      console.error('Invalid WS message:', msg.toString());
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

app.post('/log', (req, res) => {
  broadcast(req.body);
  res.status(200).send({ status: 'Log received' });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
