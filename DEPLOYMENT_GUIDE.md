# Deployment Guide

## Problem
The app works locally but features (login, signup, posts) don't work on Netlify because:
- Frontend is deployed on Netlify but backend is not deployed
- Environment variables are not configured

## Solution

### Step 1: Deploy Backend (Choose One Option)

#### Option A: Deploy to Render (Recommended - Free Tier)

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: social-media-backend (or any name)
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string (from MongoDB Atlas)
   - `JWT_SECRET`: A random secret string (e.g., `your-super-secret-jwt-key-12345`)
   - `FRONTEND_URL`: Your Netlify URL (e.g., `https://your-app.netlify.app`)
   - `PORT`: 5000
6. Click "Create Web Service"
7. Wait for deployment (you'll get a URL like `https://your-backend.onrender.com`)

#### Option B: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables (same as Render)
5. Get your deployment URL

### Step 2: Set Up MongoDB Atlas (If Not Already Done)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for cloud deployment
5. Get your connection string

### Step 3: Configure Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site configuration** → **Environment variables**
3. Click "Add a variable" → "Add a single variable"
4. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend.onrender.com/api` (use your actual backend URL)
5. Click "Save"
6. **Important**: Redeploy your site
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

### Step 4: Verify Deployment

1. Open your Netlify site
2. Open browser DevTools (F12) → Console tab
3. Try to sign up/login
4. Check for any errors
5. If you see CORS errors, verify your backend `FRONTEND_URL` environment variable

## Quick Checklist

- [ ] Backend deployed (Render/Railway/etc)
- [ ] MongoDB Atlas set up with connection string
- [ ] Backend environment variables configured:
  - [ ] MONGO_URI
  - [ ] JWT_SECRET
  - [ ] FRONTEND_URL
- [ ] Netlify environment variable set:
  - [ ] VITE_API_URL
- [ ] Netlify site redeployed after adding env variable
- [ ] Test signup/login on production

## Troubleshooting

### Issue: Still getting errors after deployment

**Check 1: Network requests**
- Open DevTools → Network tab
- Try login/signup
- Check if requests go to correct backend URL
- If they go to `localhost:5000`, env variable wasn't applied

**Fix**: Redeploy Netlify site after adding env variable

**Check 2: CORS errors**
- Error message contains "CORS" or "Access-Control-Allow-Origin"
- Backend `FRONTEND_URL` doesn't match your Netlify URL

**Fix**: Update backend `FRONTEND_URL` environment variable to match your Netlify URL exactly

**Check 3: Backend not responding**
- Backend URL returns 404 or connection error
- Backend service might be sleeping (Render free tier)

**Fix**: Visit backend URL directly to wake it up, or upgrade to paid tier

### Issue: Environment variables not working

Make sure to:
1. Use `VITE_` prefix for Vite environment variables
2. Redeploy after adding variables
3. Clear cache during deployment

## Local Development

For local development, create a `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

And in the backend folder:

```env
MONGO_URI=mongodb://localhost:27017/socialmedia
JWT_SECRET=your-local-secret-key
FRONTEND_URL=http://localhost:5173
PORT=5000
```

**Note**: Don't commit `.env` files to git!
