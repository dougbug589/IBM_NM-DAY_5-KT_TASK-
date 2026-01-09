# Social Media App

A full-stack web application that allows users to create, view, and delete short text posts. Built with React (Vite) and Express.js with MongoDB.

## Features

✅ User Authentication (Sign up / Login with JWT)  
✅ Create Posts (Max 280 characters)  
✅ View Public Feed (No auth required)  
✅ Delete Posts (Owner only)  
✅ Password Hashing (bcryptjs)  
✅ Responsive UI  
✅ Error Handling & Validation  
✅ Environment Configuration  

## Technology Stack

### Frontend
- React (Vite)
- Axios
- React Router
- CSS-in-JS (Inline Styling)
- Netlify (Deployment)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs (Password Hashing)

## Project Structure

```
social-media-app/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Home.jsx
│   │   ├── CreatePost.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── package.json
│   └── .env
└── PROJECT_REPORT.md
```

## Installation

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=mongodb://localhost:27017/socialmedia
JWT_SECRET=your-secret-key
PORT=5000
```

Start backend:
```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file (optional, defaults to localhost):
```
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/verify` | Verify token |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (public) |
| POST | `/api/posts` | Create post (authenticated) |
| DELETE | `/api/posts/:id` | Delete post (owner only) |

## Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Login with email and password
3. **Create Post**: Share a post (max 280 characters)
4. **View Feed**: See all posts from the community
5. **Delete Post**: Remove your own posts

## Deployment

### Frontend (Netlify)
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=<backend-api-url>`

### Backend (Render/Heroku/Railway)
- Runtime: Node.js
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`

## Environment Variables

### Backend (.env)
```
MONGO_URI=<mongodb-connection-string>
JWT_SECRET=<secret-key>
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=<backend-api-url>
```

## Running Locally

```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

Open browser: `http://localhost:5173`

## Testing Credentials

After signing up, you can login with your credentials.
