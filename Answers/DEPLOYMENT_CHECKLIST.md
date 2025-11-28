# 📋 MERN Stack Deployment Checklist

Complete this checklist to ensure a successful deployment of your MERN application.

## Pre-Deployment Checklist

### ✅ Code Quality & Testing

- [ ] All tests passing (backend and frontend)
- [ ] Code linted and formatted
- [ ] No console.log statements in production code
- [ ] Error handling implemented for all API routes
- [ ] Input validation on all forms
- [ ] API rate limiting configured
- [ ] Security headers configured (Helmet.js)

### ✅ Environment Configuration

- [ ] `.env.example` files created for both frontend and backend
- [ ] All environment variables documented
- [ ] Sensitive data removed from code
- [ ] MongoDB connection string uses environment variable
- [ ] API URLs use environment variables
- [ ] Different configurations for dev/staging/prod

### ✅ Database Setup

- [ ] MongoDB Atlas account created
- [ ] Database cluster provisioned
- [ ] Database user created with appropriate permissions
- [ ] IP whitelist configured (0.0.0.0/0 for production)
- [ ] Connection pooling configured
- [ ] Database backup strategy planned

### ✅ Security

- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Helmet.js security headers set
- [ ] No sensitive data in client-side code
- [ ] Authentication implemented (if required)
- [ ] Input sanitization in place
- [ ] HTTPS will be enforced

## Backend Deployment Checklist

### Using Render

- [ ] Render account created and verified
- [ ] GitHub repository connected
- [ ] New Web Service created
- [ ] Build command configured: `cd backend && npm install`
- [ ] Start command configured: `cd backend && npm start`
- [ ] Environment variables set in Render dashboard:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `MONGODB_URI`
  - [ ] `FRONTEND_URL`
- [ ] Health check endpoint configured (`/health`)
- [ ] Auto-deploy from GitHub enabled
- [ ] Deployment successful and tested
- [ ] Backend URL documented

### Alternative: Railway

- [ ] Railway account created
- [ ] Railway CLI installed
- [ ] Project initialized: `railway init`
- [ ] Environment variables configured
- [ ] Deployed successfully: `railway up`

### Alternative: Heroku

- [ ] Heroku account created
- [ ] Heroku CLI installed
- [ ] App created: `heroku create app-name`
- [ ] Config vars set: `heroku config:set KEY=value`
- [ ] Deployed: `git push heroku main`

## Frontend Deployment Checklist

### Using Vercel

- [ ] Vercel account created and verified
- [ ] GitHub repository connected
- [ ] Project imported to Vercel
- [ ] Framework preset set to "Create React App"
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Environment variables configured:
  - [ ] `REACT_APP_API_URL` (backend URL)
- [ ] Build successful
- [ ] Deployment tested
- [ ] Frontend URL documented
- [ ] Custom domain configured (optional)

### Alternative: Netlify

- [ ] Netlify account created
- [ ] Site created from GitHub repo
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Deployed successfully

### Alternative: GitHub Pages

- [ ] `gh-pages` package installed
- [ ] Deploy script added to package.json
- [ ] `homepage` field set in package.json
- [ ] Deployed: `npm run deploy`

## CI/CD Pipeline Setup

### GitHub Actions

- [ ] `.github/workflows/ci-cd.yml` created
- [ ] Workflow triggers configured (push/PR to main)
- [ ] Backend test job configured
- [ ] Frontend test job configured
- [ ] Deploy jobs configured (after tests pass)
- [ ] GitHub secrets configured:
  - [ ] `MONGODB_URI`
  - [ ] `TEST_MONGODB_URI`
  - [ ] `REACT_APP_API_URL`
  - [ ] `RENDER_DEPLOY_HOOK_BACKEND`
  - [ ] `VERCEL_TOKEN`
  - [ ] `VERCEL_ORG_ID`
  - [ ] `VERCEL_PROJECT_ID`
- [ ] Pipeline tested with a commit
- [ ] All jobs passing
- [ ] Auto-deployment working

## Post-Deployment Checklist

### Testing

- [ ] Frontend loads correctly
- [ ] Backend API accessible
- [ ] Database connection working
- [ ] All CRUD operations functional
- [ ] Forms validation working
- [ ] Error handling displays properly
- [ ] Loading states appear correctly
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing done
- [ ] Performance acceptable (<3s load time)

### Monitoring Setup

- [ ] Health check endpoints tested
- [ ] Uptime monitoring configured (UptimeRobot/Pingdom)
- [ ] Error tracking set up (Sentry - optional)
- [ ] Log aggregation configured
- [ ] Alert notifications set up
- [ ] Performance monitoring enabled

### Documentation

- [ ] README.md updated with:
  - [ ] Live URLs (frontend & backend)
  - [ ] Setup instructions
  - [ ] Deployment instructions
  - [ ] Environment variables documented
  - [ ] API endpoints documented
  - [ ] Screenshots included
- [ ] API documentation created (optional)
- [ ] Architecture diagram added (optional)
- [ ] Troubleshooting guide added

### Maintenance Plan

- [ ] Backup strategy documented
- [ ] Update schedule planned
- [ ] Rollback procedure documented
- [ ] Team access configured
- [ ] Support process defined
- [ ] Cost monitoring set up

## Environment URLs

Record your deployment URLs here:

```
Development:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

Staging (optional):
- Frontend: https://staging-app.vercel.app
- Backend: https://staging-api.onrender.com

Production:
- Frontend: https://your-app.vercel.app
- Backend: https://your-backend.onrender.com
- Database: [MongoDB Atlas cluster]
```

## Emergency Contacts

```
Team Lead: [Name] - [Email] - [Phone]
DevOps: [Name] - [Email] - [Phone]
Database Admin: [Name] - [Email] - [Phone]
```

## Common Issues & Solutions

### Issue: "MongoNetworkError"
**Solution:** Check MongoDB Atlas IP whitelist and connection string

### Issue: "CORS Error"
**Solution:** Verify FRONTEND_URL environment variable in backend

### Issue: "Module not found"
**Solution:** Clear cache and reinstall: `rm -rf node_modules && npm install`

### Issue: "Build failed"
**Solution:** Check build logs for specific errors, verify all dependencies

### Issue: "API not responding"
**Solution:** Check health endpoint, verify environment variables

## Rollback Procedure

If deployment fails:

1. **Via Git:**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Via Platform UI:**
   - Go to deployment history
   - Select last stable version
   - Click "Redeploy" or "Promote to Production"

3. **Notify Team:**
   - Send alert to team
   - Document the issue
   - Create incident report

## Performance Benchmarks

Target metrics:
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Database query time < 100ms
- [ ] Uptime > 99.9%
- [ ] Error rate < 0.1%

## Compliance & Security

- [ ] GDPR compliance reviewed (if applicable)
- [ ] Privacy policy added (if collecting user data)
- [ ] Terms of service added
- [ ] Security audit completed
- [ ] SSL/TLS certificate active

## Sign-off

- [ ] Development team approved
- [ ] Testing team approved
- [ ] Product owner approved
- [ ] Deployment completed by: ________________
- [ ] Date: ________________
- [ ] All checks verified: ✅

---

**Notes:**
- Review this checklist before every deployment
- Update as your deployment process evolves
- Keep a copy for incident response
