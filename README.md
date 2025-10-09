# Task Management App

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Features

### User Authentication
- ✅ User signup with name, email, and password
- ✅ User login with email and password
- ✅ Secure logout functionality
- ✅ Form validation and error handling
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ "Remember me" functionality (JWT tokens)

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- express-validator for input validation
- Socket.io for real-time features

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- shadcn/ui components
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- pnpm (recommended) or npm

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
pnpm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Update the `.env` file with your MongoDB connection string and JWT secret:
```env
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

5. Start the server:
```bash
pnpm dev
```

The server will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The client will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Sign in with email and password
- `POST /api/auth/logout` - Sign out (client-side token removal)
- `GET /api/auth/me` - Get current user information
- `PUT /api/auth/me` - Update user profile

### Request/Response Examples

#### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

## User Stories Implemented

### Epic 1: User Authentication ✅

#### Sign Up
- ✅ As a new user, I want to sign up with my name, email, and password so that I can create my account and start managing my tasks.
- ✅ As a user, I want to receive validation messages (e.g., "email already in use," "password too short") so that I can understand and fix errors during signup.

#### Sign In
- ✅ As a registered user, I want to sign in using my email and password so that I can access my personal tasks.
- ✅ As a user, I want to stay signed in (remember me) so that I don't need to re-enter my credentials every time.

#### Sign Out
- ✅ As a user, I want to sign out securely so that I can protect my account when using shared devices.

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT tokens with expiration (7 days)
- Input validation and sanitization
- CORS configuration
- Secure password requirements (uppercase, lowercase, numbers)
- Email format validation

## Development

### Backend Development
- The server uses ES modules
- MongoDB connection with Mongoose
- Express middleware for authentication
- Error handling and validation

### Frontend Development
- React with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- shadcn/ui component library
- Responsive design

## Next Steps

The authentication system is now complete and ready for use. The next phase would include:

1. Task management features
2. Real-time updates with Socket.io
3. File uploads for task attachments
4. Email notifications
5. Advanced user settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
