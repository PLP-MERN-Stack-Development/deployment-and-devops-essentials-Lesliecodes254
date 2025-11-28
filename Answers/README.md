# 🚀 MERN Stack Task Manager - Production Deployment Guide

A full-stack task management application built with MongoDB, Express.js, React, and Node.js, featuring complete CI/CD pipelines and production-ready deployment configurations.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development Setup](#local-development-setup)
- [Deployment Guide](#deployment-guide)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Variables](#environment-variables)
- [Monitoring & Maintenance](#monitoring--maintenance)

## ✨ Features

- ✅ Create, read, update, and delete tasks
- 🎯 Priority levels (Low, Medium, High)
- ✔️ Mark tasks as complete/incomplete
- 📱 Responsive design for all devices
- 🔒 Secure API with rate limiting
- 🚀 Production-ready with Docker support
- 🔄 Automated CI/CD pipelines
- 📊 Health check endpoints
- 🎨 Modern UI with smooth animations

## 🛠️ Tech Stack

### Frontend
- React 18
- CSS3 with modern animations
- Fetch API for HTTP requests

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- Helmet for security headers
- Morgan for logging
- Express Rate Limit

### DevOps
- Docker & Docker Compose
- GitHub Actions for CI/CD
- Nginx for frontend serving

## 📁 Project Structure

```
mern-deployment/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .env.example
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── docker-compose.yml
└── README.md
```

## 💻 Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas account)
- Git
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd mern-deployment
```

### Step 2: Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/mern_app
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env

# Edit .env
# REACT_APP_API_URL=http://localhost:5000

# Start frontend
npm start
```

Frontend will run on `http://localhost:3000`

### Step 4: Using Docker (Alternative)

```bash
# From project root
docker-compose up --build

# Access application:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

## 🌐 Deployment Guide

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user with read/write permissions
4. Get connection string
5. Whitelist IP addresses (0.0.0.0/0 for all IPs in production)

### Backend Deployment (Render)

1. **Create Render Account**
   - Go to [Render](https://render.com)
   - Connect your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect repository
   - Configure:
     - Name: `mern-backend`
     - Environment: `Node`
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`
     - Plan: Free

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your-mongodb-atlas-uri>
   FRONTEND_URL=<your-frontend-url>
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the deployment URL

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com)
   - Connect GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your repository
   - Configure:
     - Framework Preset: `Create React App`
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`

3. **Set Environment Variables**
   ```
   REACT_APP_API_URL=<your-backend-url>
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Note the deployment URL

### Alternative: Railway Deployment

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy backend
cd backend
railway init
railway up

# Deploy frontend
cd ../frontend
railway init
railway up
```

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically:

1. **On Push/PR to main or develop:**
   - Runs linting on backend and frontend
   - Executes test suites
   - Builds the application

2. **On Push to main:**
   - Deploys backend to Render
   - Deploys frontend to Vercel
   - Sends deployment notifications

### Setup GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```
MONGODB_URI
TEST_MONGODB_URI
REACT_APP_API_URL
RENDER_DEPLOY_HOOK_BACKEND
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

### Trigger Deployment

```bash
# Push to main branch
git add .
git commit -m "Deploy to production"
git push origin main
```

## 🔐 Environment Variables

### Backend (.env)

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (.env)

```bash
REACT_APP_API_URL=https://your-backend.onrender.com
```

## 📊 Monitoring & Maintenance

### Health Check Endpoints

- **Backend Health**: `GET /health`
  ```json
  {
    "status": "OK",
    "timestamp": "2025-01-15T10:30:00.000Z",
    "uptime": 3600,
    "environment": "production"
  }
  ```

### Monitoring Tools Setup

1. **Uptime Monitoring** (UptimeRobot)
   - Sign up at [UptimeRobot](https://uptimerobot.com)
   - Add monitors for:
     - Frontend URL
     - Backend `/health` endpoint
   - Set alert contacts

2. **Error Tracking** (Sentry)
   ```bash
   # Install Sentry
   npm install @sentry/node @sentry/react
   
   # Add to backend/server.js
   const Sentry = require("@sentry/node");
   Sentry.init({ dsn: process.env.SENTRY_DSN });
   
   # Add to frontend/src/index.js
   import * as Sentry from "@sentry/react";
   Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
   ```

3. **Performance Monitoring**
   - Use Render/Vercel built-in metrics
   - Monitor response times
   - Track error rates
   - Monitor database connections

### Maintenance Checklist

#### Daily
- [ ] Check application uptime
- [ ] Review error logs
- [ ] Monitor API response times

#### Weekly
- [ ] Review and address errors in Sentry
- [ ] Check database performance
- [ ] Review CI/CD pipeline runs

#### Monthly
- [ ] Update dependencies
- [ ] Review security advisories
- [ ] Backup database
- [ ] Performance optimization review

### Database Backups

**MongoDB Atlas Automatic Backups:**
1. Go to Atlas dashboard
2. Navigate to Backup tab
3. Enable continuous backups
4. Configure retention policy

**Manual Backup:**
```bash
# Export database
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/db" --out=./backup

# Import database
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/db" ./backup
```

### Rollback Procedure

1. **Via Git:**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Via Render:**
   - Go to Render dashboard
   - Select service
   - Click "Manual Deploy"
   - Select previous successful deployment

3. **Via Vercel:**
   - Go to Vercel dashboard
   - Select deployment
   - Click "Promote to Production" on stable version

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd frontend
npm test
```

### Run All Tests in CI/CD
Tests run automatically on every push/PR via GitHub Actions.

## 📸 Screenshots

### Application UI
![Task Manager Interface](docs/screenshots/app-preview.png)

### CI/CD Pipeline
![GitHub Actions Pipeline](docs/screenshots/cicd-pipeline.png)

### Monitoring Dashboard
![Monitoring Setup](docs/screenshots/monitoring.png)

## 🔗 Live Demo

- **Frontend URL**: https://your-app.vercel.app
- **Backend API**: https://your-backend.onrender.com
- **API Health**: https://your-backend.onrender.com/health

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors


## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render for backend hosting
- Vercel for frontend hosting
- GitHub Actions for CI/CD

---

Made with ❤️ for PLP Academy
