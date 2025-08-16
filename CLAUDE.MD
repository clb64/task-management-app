  # Task Management App

  ## Project Overview
  A web-based task management application built with React and Node.js that allows users to
  create, organize, and track their tasks with team collaboration features.

  ## Tech Stack
  - Frontend: React 18, TypeScript, Tailwind CSS
  - Backend: Node.js, Express, TypeScript
  - Database: PostgreSQL with Prisma ORM
  - Authentication: JWT tokens
  - Testing: Jest, React Testing Library
  - Build: Vite
  - Linting: ESLint, Prettier

  ## Commands
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run test` - Run test suite
  - `npm run lint` - Run ESLint
  - `npm run typecheck` - Run TypeScript checks
  - `npm run db:migrate` - Run database migrations

  ## Project Structure
  src/
    components/     # Reusable UI components
    pages/         # Route components
    hooks/         # Custom React hooks
    services/      # API service layer
    types/         # TypeScript type definitions
    utils/         # Helper functions
  server/
    routes/        # Express routes
    models/        # Database models
    middleware/    # Express middleware

  ## Key Features
  1. User authentication and authorization
  2. Task CRUD operations
  3. Project organization
  4. Team collaboration
  5. Due date tracking
  6. Priority levels
  7. File attachments
  8. Activity notifications

  ## Database Schema
  - Users: id, email, password_hash, name, created_at
  - Projects: id, name, description, owner_id, created_at
  - Tasks: id, title, description, status, priority, due_date, project_id, assignee_id
  - Teams: id, name, description, created_at
  - UserTeams: user_id, team_id, role

  ## API Endpoints
  - POST /api/auth/login
  - POST /api/auth/register
  - GET /api/tasks
  - POST /api/tasks
  - PUT /api/tasks/:id
  - DELETE /api/tasks/:id
  - GET /api/projects
  - POST /api/projects

  ## Environment Variables
  - DATABASE_URL
  - JWT_SECRET
  - PORT
  - NODE_ENV

  ## Design Patterns
  - Component composition over inheritance
  - Custom hooks for state management
  - Service layer for API calls
  - Repository pattern for database access
  - Middleware pattern for request processing

  ## Testing Strategy
  - Unit tests for utility functions
  - Component tests for UI logic
  - Integration tests for API endpoints
  - E2E tests for critical user flows

  This CLAUDE.md provides comprehensive context about the project structure, conventions,
  commands, and technical decisions that would help Claude understand and work effectively
  with the codebase.