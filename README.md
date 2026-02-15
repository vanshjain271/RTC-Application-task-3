# Real-Time Chat Application with JWT Authentication

## Overview

This project is a secure real-time chat application built using:

-   Node.js
-   Express
-   Socket.io
-   JWT Authentication

Users must log in to receive a JWT token before joining the chat room.

------------------------------------------------------------------------

## Features

-   Real-time messaging (WebSockets)
-   JWT-based authentication
-   Secure socket connection
-   Modern UI
-   Room-based chat
-   Live message updates (no page reload)

------------------------------------------------------------------------

## Installation

1.  Download the project.

2.  Navigate into the folder.

3.  Install dependencies:

    npm install

4.  Start server:

    npm start

5.  Open browser:

    http://localhost:3000

------------------------------------------------------------------------

## How It Works

1.  User enters username.
2.  Server generates JWT token.
3.  Client connects to Socket.io with token.
4.  Server verifies token before allowing connection.
5.  Users exchange messages in real time.

------------------------------------------------------------------------

## Future Improvements

-   Database persistence (MongoDB)
-   Private messaging
-   User list sidebar
-   Message encryption
-   Deployment on cloud (Render / Railway / AWS)

------------------------------------------------------------------------

Built by Vansh Jain
