
let socket;
let token = "";

async function login() {
    const username = document.getElementById("username").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    });

    const data = await res.json();
    token = data.token;

    document.querySelector(".auth-container").classList.add("hidden");
    document.querySelector(".chat-container").classList.remove("hidden");

    socket = io({
        auth: { token }
    });

    socket.emit("joinRoom", "main");

    socket.on("message", (data) => {
        const messages = document.getElementById("messages");
        const div = document.createElement("div");
        div.innerHTML = `<strong>${data.user}</strong>: ${data.text} (${data.time})`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    });
}

function sendMessage() {
    const msg = document.getElementById("msg").value;
    socket.emit("chatMessage", msg);
    document.getElementById("msg").value = "";
}
