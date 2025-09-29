const logContainer = document.getElementById('log-container');
let isPaused = false;

document.getElementById('clear-btn').onclick = () => logContainer.innerHTML = '';

const connectWS = () => {
  const socket = new WebSocket(`ws://${window.APP_CONFIG.WS_IP}:3001`);

  socket.onopen = () => console.log('Connected!');
  socket.onclose = () => {
    console.log('Disconnected, retrying...');
    setTimeout(connectWS, 3000);
  };
  socket.onerror = (err) => console.error('WS error:', err);
  socket.onmessage = handleMessage;
};

const handleMessage = (event) => {
  const logData = JSON.parse(event.data);
  const logElement = document.createElement('div');
  const isScrolledToBottom = logContainer.scrollHeight - logContainer.clientHeight <= logContainer.scrollTop + 5;

  logElement.classList.add('log-item', `log-${logData.level || 'info'}`);

  const timestamp = document.createElement('span');
  timestamp.classList.add('timestamp');
  timestamp.textContent = `[${new Date().toLocaleTimeString()}] `;

  let messageNode;
  if (typeof logData.message === 'object' && logData.message !== null) {
    messageNode = document.createElement('pre');
    messageNode.textContent = JSON.stringify(logData.message, null, 2);
  } else {
    messageNode = document.createElement('span');
    messageNode.classList.add('message');
    messageNode.textContent = logData.message;
  }

  logElement.appendChild(timestamp);
  logElement.appendChild(messageNode);

  logContainer.appendChild(logElement);

  if (isScrolledToBottom) logContainer.scrollTop = logContainer.scrollHeight;
};

const buildWsUrl = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}`;
};

const socket = new WebSocket(buildWsUrl());

connectWS();

