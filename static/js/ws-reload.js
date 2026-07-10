function connectWebSocket() {
  ws = new WebSocket("ws://" + location.host + "/ws");
  globalThis.wsSend = (data) => ws.send(data);

  ws.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    
    if (data.type === "reload-page") {
      location.reload();
    };
  };
};

connectWebSocket()