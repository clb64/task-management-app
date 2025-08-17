# Multi-stage Dockerfile for Task Management App

# Stage 1: Build the frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production=false
COPY . .
RUN npm run build

# Stage 2: Build the backend
FROM node:18-alpine AS backend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production=false
COPY . .
RUN npm run build:server
RUN npx prisma generate

# Stage 3: Production image
FROM node:18-alpine AS production
WORKDIR /app

# Install OpenSSL and other dependencies
RUN apk add --no-cache openssl

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built frontend from frontend-builder stage
COPY --from=frontend-builder /app/dist ./dist

# Copy built backend from backend-builder stage
COPY --from=backend-builder /app/dist ./dist
COPY --from=backend-builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=backend-builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy prisma schema for migrations
COPY prisma ./prisma

# Create non-root user and set permissions
RUN addgroup -g 1001 -S nodejs
RUN adduser -S taskflow -u 1001
RUN chown -R taskflow:nodejs /app
USER taskflow

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "dist/index.js"]