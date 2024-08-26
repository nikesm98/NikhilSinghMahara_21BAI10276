# NikhilSinghMahara_21BAI10276

# Multiplayer Game with React and WebSocket

This project is a multiplayer turn-based game implemented with React, Node.js, and WebSocket. The game features a 5x5 board, supports real-time gameplay, and provides move validation on both the client and server sides.

## Project Structure

The project is organized into a single repository with clear separation between client and server code:


## Features

### Server-side Implementation

- **Core Game Logic**: Implements the core game logic based on the rules described in the Game Rules section.
- **WebSocket Server**: Handles client connections and manages game events.
- **Move Commands Processing**: Processes move commands and updates the game state accordingly.
- **Move Validation**: Implements thorough server-side move validation to ensure fairness and correctness.

### Client-side Implementation

- **Web Interface**: A basic web interface that displays a 5x5 game board for player interactions.
- **WebSocket Communication**: Establishes and maintains real-time communication with the server.
- **Move Validation**: Mirrors server-side validation on the client to provide immediate feedback to players.
- **Move Display**: Shows valid moves for the selected character and prevents invalid actions.

### WebSocket Communication

- **Event Handling**: Manages events for game initialization, player moves, and game state updates.
- **Real-time Synchronization**: Ensures that the game state is consistently synchronized between the server and all connected clients.

### Move Validation (Client and Server-Side)

- **Opponent's Pieces**: Prevents the selection or movement of the opponent's pieces.
- **Grid Boundaries**: Ensures all moves remain within the 5x5 grid boundaries.
- **Character Movement Rules**: Validates moves according to each character type's movement rules.
- **Friendly Fire**: Prevents moving onto or through spaces occupied by friendly characters.
- **Invalid Move Handling**: Communicates invalid move attempts to the user clearly and effectively.

### Edge Cases Handling

- **Simultaneous Moves**: Manages simultaneous move attempts by multiple clients to avoid conflicts.
- **Disconnection/Reconnection**: Handles client disconnections and reconnections during an ongoing game.
- **Out-of-Turn Moves**: Prevents players from making moves out of turn.
- **Mid-Game Quits**: Properly manages game state when a player quits mid-game.
- **Game Termination**: Ensures proper game termination when all opponent's pieces are eliminated.

### Game Flow

- **Turn-Based Gameplay**: Implements turn-based gameplay with clear indications of the current player's turn.
- **Piece Elimination**: Correctly handles piece elimination upon valid capture moves.
- **Game End Detection**: Detects the end of the game and announces the winner.

### Code Quality

- **Clean Code**: The code is clean, well-commented, and follows best practices for the chosen technologies.
- **Error Handling**: Implements robust error handling and logging mechanisms for both client and server.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nikesm98/NikhilSinghMahara_21BAI10276.git
   cd your-repo-name

### Install Dependencies for Both Client and Server

```bash
cd game
npm install
cd ../hitwicket_game
npm install
