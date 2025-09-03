# EduConnect - Quality Education Platform

A full-stack educational platform supporting SDG 4: Quality Education with accessible, inclusive learning features.

## Features

- **User Authentication**: Secure login/signup with JWT
- **Course Management**: Browse and filter courses by tags
- **Progress Tracking**: Real-time progress calculation based on lesson completion
- **Accessibility**: Font scaling, theme switching, and ARIA support
- **Community**: Discussion forums for learners

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 18 + Vite
- React Router for navigation
- Context API for state management

## Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure environment variables
4. Deploy automatically on push

### Frontend (Vercel/Netlify)
1. Connect repository
2. Set build command: `npm run build`
3. Set output directory: `client/dist`
4. Configure environment variables

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_here
PORT=4000
NODE_ENV=production
```

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-app-name.onrender.com/api
```

## Local Development

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `GET /api/lessons/course/:courseId` - Get course lessons
- `POST /api/lessons/:courseId/:lessonId/complete` - Mark lesson complete
- `GET /api/progress` - Get user progress
- `GET /api/community/discussions` - Get community discussions

