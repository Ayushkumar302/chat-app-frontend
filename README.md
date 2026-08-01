# WhizChat Frontend 🌐

This is the frontend client for **WhizChat**, a highly secure, real-time, and beautifully designed chat application.

## 🛠️ Tech Stack
- **React.js** (UI Library)
- **Tailwind CSS v3** (Modern utility-first styling & responsiveness)
- **Socket.io-client** (Real-time updates & WebSockets)
- **Axios** (API requests configured for cross-origin credentials)
- **React Router Dom** (Client-side routing)
- **React Toastify** (Notifications)

## 🌟 Key Features
- **Sleek Dark Mode UI**: A completely custom, modern dark UI featuring glassmorphism (translucency and blur effects) and dynamic gradients.
- **Responsive Design**: Built mobile-first. The sidebar and chat area toggle seamlessly on smaller screens to ensure a native-app-like experience.
- **Global Secure Authentication**: Uses `axiosInstance` with `withCredentials: true` globally to handle seamless, secure authentication using `HttpOnly` cookies. No JWTs are stored in local storage!
- **Real-time Online Indicators**: Instantly see who is online via pulsing green dot badges.
- **Explore & Connect**: Dedicated pages to find new users and manage friend requests.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed
- The WhizChat Backend running on `http://localhost:5000`

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Ayushkumar302/chat-app-frontend.git
cd chat-app-frontend
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of the project.
*(Note: Because we use create-react-app, all environment variables must start with `REACT_APP_`)*
```env
REACT_APP_LOCALHOST_KEY="chat-app-current-user"
```

### 4. Running the App
```bash
npm start
```
The app will start on `http://localhost:3000`.

## 🎨 Design Philosophy
This app was completely refactored from raw CSS to Tailwind CSS to provide a highly scalable design system. We prioritized visual excellence, avoiding generic colors in favor of curated dark mode tokens and subtle micro-animations (like hover effects and smooth scrolling).

## 📄 License
This project is open-source and available under the MIT License.
