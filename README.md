# Shreyas Boutique

Full-stack boutique shop: React frontend + Express + MongoDB backend.

## Run locally

### Backend
```bash
cd backend
cp .env.example .env   # edit MONGO_URI
npm install
npm run seed           # optional: load sample products
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

The frontend uses a **dev proxy** to `http://localhost:5000` (see `frontend/package.json`).  
For production, set `REACT_APP_API_URL` to your API base URL.

## Push to GitHub

1. **Do not commit secrets** — keep `backend/.env` local only (listed in `.gitignore`).

2. Stage and commit:
   ```bash
   git add .
   git status
   git commit -m "Describe your changes"
   ```

3. **First time** — create a repo on GitHub, then:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

4. **Already have `origin`** — push updates:
   ```bash
   git push origin main
   ```

If `backend/.env` was committed before, remove it from Git history:
```bash
git rm --cached backend/.env
git commit -m "Stop tracking .env"
```
