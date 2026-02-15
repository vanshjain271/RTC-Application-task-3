
// ----------------------------------------------
// Real-Time Chat Application with JWT Auth
// Author: Vansh Jain
// ----------------------------------------------

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const SECRET_KEY = "super_secret_chat_key";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// In-memory user store (for demo purposes)
const users = {};

// ----------- AUTH ROUTES -----------

// Login endpoint to generate JWT
app.post("/login", (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username required" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "2h" });

    res.json({ token });
});

// ----------- SOCKET AUTH -----------

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Authentication error"));
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        socket.username = decoded.username;
        next();
    } catch (err) {
        next(new Error("Authentication error"));
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.username);

    socket.on("joinRoom", (room) => {
        socket.join(room);
        users[socket.id] = { username: socket.username, room };

        socket.to(room).emit("message", {
            user: "System",
            text: `${socket.username} joined the room`,
            time: new Date().toLocaleTimeString()
        });
    });

    socket.on("chatMessage", (msg) => {
        const user = users[socket.id];

        if (user) {
            io.to(user.room).emit("message", {
                user: user.username,
                text: msg,
                time: new Date().toLocaleTimeString()
            });
        }
    });

    socket.on("disconnect", () => {
        const user = users[socket.id];

        if (user) {
            io.to(user.room).emit("message", {
                user: "System",
                text: `${user.username} left the room`,
                time: new Date().toLocaleTimeString()
            });
        }

        delete users[socket.id];
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
