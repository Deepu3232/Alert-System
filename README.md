# Alert System

This is an alert system project with a client, server, and script integration. Follow the instructions below to set up and run the project locally.

## Project Structure

- **client/**: Contains the frontend client code (React-based).
- **server/**: Contains the FastAPI backend server code.
- **scripts/**: Contains the `alert.html` script file for testing alerts.

---

## Prerequisites

Make sure the following tools are installed on your system:
- **Node.js** (v16+)
- **Python** (v3.8+)

---

## Setup Instructions

### 1. Start the Client
Navigate to the `client` directory and start the development server:

```bash
cd client
npm install    # Install dependencies (first time only)
npm run dev    # Start the client development server
```

The client will be available at `http://localhost:3000` (default Vite port).

### 2. Start the Server
Navigate to the `server` directory and start the FastAPI backend server:

```bash
cd server
./fastapi dev main.py    # Start the FastAPI server
```

The server will be available at `http://127.0.0.1:8000` (default FastAPI port).

### 3. Start the Alert Script
Navigate to the `scripts` directory and open the `alert.html` file:

```bash
cd scripts
open alert.html    # Or manually open alert.html in a browser
```

Once the script is started, you can set alerts using the provided interface.

---

## Note
- Currently, the username is **hardcoded** inside workflows for testing purposes.
- Once the project is live, the username will be dynamically fetched from `localStorage`. The username is already stored in `localStorage` for convenience.

---

## Workflow
1. Start the client (`npm run dev`).
2. Start the server (`./fastapi dev main.py`).
3. Run the `alert.html` script.
4. Test the alert system interface.
