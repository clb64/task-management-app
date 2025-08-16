# Task Management App

A full-stack task management application built with React, TypeScript, Node.js, and PostgreSQL.

## Features

- 🔐 **Authentication**: Secure user registration and login with JWT
- 📝 **Task Management**: Create, edit, and delete tasks with priorities and due dates
- 📊 **Project Organization**: Group tasks by projects
- 👥 **Team Collaboration**: Team-based task assignment
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Updates**: Instant UI updates for better user experience

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **TypeScript** - Type safety for backend
- **Prisma** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Testing & Development
- **Jest** - Testing framework
- **React Testing Library** - React component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a PostgreSQL database
   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your database credentials
   - Update the `JWT_SECRET` with a secure random string

4. **Initialize the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (port 3000) and backend (port 5000) concurrently.

## Available Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run dev:client` - Start only the frontend development server
- `npm run dev:server` - Start only the backend development server
- `npm run build` - Build the project for production
- `npm run test` - Run the test suite
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run typecheck` - Check TypeScript types
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client

## Project Structure

```
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Route components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API service layer
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
├── server/
│   ├── routes/         # Express routes
│   ├── models/         # Database models
│   └── middleware/     # Express middleware
└── prisma/
    └── schema.prisma   # Database schema
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Projects
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/taskflow_db"
JWT_SECRET="your-super-secure-jwt-secret"
PORT=5000
NODE_ENV=development
VITE_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.