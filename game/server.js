
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 4000 });

let gameState = {
  board: Array(5).fill(null).map(() => Array(5).fill(null)),
  moveHistory: [],
  turn: "A",
  gameOver: false,
  winner: null,
};

wss.on("connection", (ws) => {
  console.log("A player connected");

  // Send the current game state to the newly connected client
  ws.send(JSON.stringify(gameState));

  ws.on("message", (message) => {
    const { player, character, move } = JSON.parse(message);
    // Implement game logic for move validation, state updates, winner checks, etc.
    console.log(`Player ${player} moved ${character} with ${move}`);

    // Broadcast updated game state to all connected clients
    gameState.moveHistory.push(`${player}: ${character} -> ${move}`);
    gameState.turn = gameState.turn === "A" ? "B" : "A";
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(gameState));
      }
    });
  });

  ws.on("close", () => {
    console.log("A player disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:4000");