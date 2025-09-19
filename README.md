# VideoMeet - Video Conferencing Application

A full-stack video conferencing application built with React, Express.js, and Socket.IO, providing real-time video calling capabilities similar to Zoom.

## 🚀 Features

- **Real-time Video Conferencing**: High-quality peer-to-peer video calls
- **User Authentication**: Secure login and registration system
- **Guest Access**: Join meetings without registration
- **Meeting History**: Track and view past meetings
- **Responsive Design**: Modern UI built with Material-UI
- **Real-time Communication**: Socket.IO for instant messaging and signaling

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern frontend framework
- **Material-UI** - Component library for consistent design
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time bidirectional communication
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcrypt** - Password hashing
- **dotenv** - Environment configuration

## 📁 Project Structure

```
VideoMeet/
├── backend/
│   ├── src/
│   │   ├── app.js              # Main server file
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # Database models
│   │   └── routes/             # API routes
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main React component
│   │   ├── pages/              # Page components
│   │   ├── components/         # Reusable components
│   │   └── contexts/           # React contexts
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VinayakLambade22/VideoMeet.git
   cd VideoMeet
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=8000
   MONGO_URL=mongodb://localhost:27017/videomeet
   # Add other environment variables as needed
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 🎯 Usage

1. **Landing Page**: Visit the home page to learn about the application
2. **Authentication**: Register or login to access full features
3. **Guest Access**: Join meetings without creating an account
4. **Home Dashboard**: Create or join meetings from the main dashboard
5. **Video Meeting**: Participate in real-time video conferences
6. **History**: View your meeting history and statistics

## 📦 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run prod` - Start with PM2 process manager

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Configuration

### Backend Configuration
- **Port**: Default 8000, configurable via `PORT` environment variable
- **Database**: MongoDB connection via `MONGO_URL` environment variable
- **CORS**: Enabled for cross-origin requests

### Frontend Configuration
- **Vite**: Modern build tool with hot module replacement
- **ESLint**: Code quality and style enforcement
- **Material-UI**: Theming and component customization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Vinayak** - *Initial work*

## 🙏 Acknowledgments

- React team for the amazing frontend framework
- Socket.IO for real-time communication capabilities
- Material-UI for beautiful, accessible components
- Express.js for the robust backend framework

## 📞 Support

If you have any questions or run into issues, please open an issue on the repository or contact the maintainer.

---

⭐ If you found this project helpful, please give it a star!
