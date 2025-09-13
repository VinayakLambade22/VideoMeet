# VideoMeet

A full-stack video conferencing application built with the MERN stack and Socket.io.

## Features

- **User Authentication:** Secure user registration and login.
- **Create & Join Meetings:** Easily create a new meeting or join an existing one with a meeting code.
- **Video & Audio Communication:** Real-time video and audio communication with other participants.
- **Meeting History:** View a history of the meetings you have joined.

## Technologies Used

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Material UI:** A popular React UI framework.
- **Socket.io-client:** For real-time communication with the backend.
- **Vite:** A fast build tool for modern web projects.

### Backend

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express:** A minimal and flexible Node.js web application framework.
- **MongoDB:** A NoSQL database for storing application data.
- **Mongoose:** An object data modeling (ODM) library for MongoDB and Node.js.
- **Socket.io:** For real-time, bidirectional and event-based communication.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm
- MongoDB

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username_/videomeet.git
    ```
2.  **Install backend dependencies**
    ```sh
    cd backend
    npm install
    ```
3.  **Install frontend dependencies**
    ```sh
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the backend server**
    ```sh
    cd backend
    npm run dev
    ```

## Project Structure

The project is organized into two main directories: `frontend` and `backend`.

### `frontend`

The frontend is a standard Vite-React application with the following structure:

```
frontend
├── src
│   ├── components
│   ├── contexts
│   ├── pages
│   ├── styles
│   └── utils
├── public
└── ...
```

### `backend`

The backend follows a standard MVC pattern:

```
backend
├── src
│   ├── controllers
│   ├── models
│   └── routes
└── ...
```
2.  **Start the frontend development server**
    ```sh
    cd frontend
    npm run dev
    ```
