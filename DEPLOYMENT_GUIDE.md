# Deploying to Render (The Right Way)

You previously deployed the app but likely configured it to run as a **development server**, which tries to use port `5173` (Vite's default) instead of the properly built backend.

To fix your deployment and have a proper production site (API + Frontend on one URL), follow these steps strictly:

---

### Step 1: Create a "Web Service" on Render

Do not use "Static Site" unless you only want the frontend. We want both.

1.  Connect your GitHub repository.
2.  **Name:** `hindusthan-bedding` (or any name).
3.  **Language:** `Node` (it should auto-detect).
4.  **Branch:** `main`
5.  **Region:** Choose closest to you (e.g., Singapore).

### Step 2: Configure Build & Start Commands (CRITICAL)

Render will ask for these commands. Enter exactly this:

- **Root Directory:** `.` (Leave it empty, or enter `.` to mean the main folder).
- **Build Command:** `npm install && npm run build`
  - _Why?_ This installs backend dependencies AND builds your React frontend into the `dist` folder.
- **Start Command:** `npm start`
  - _Why?_ This runs `node server/index.js`, which starts your API _and_ serves the built React app from `dist`.

### Step 3: Environment Variables

Go to the **Environment** tab in your Render service and add these:

| Key                     | Value                                                                                               |
| :---------------------- | :-------------------------------------------------------------------------------------------------- |
| `MONGO_URI`             | `mongodb+srv://aswinrajr07_db_user:Sx3yCXhDsRdd85Eo@cluster0.sw388jl.mongodb.net/hindusthanbedding` |
| `CLOUDINARY_CLOUD_NAME` | `dnafggv6f`                                                                                         |
| `CLOUDINARY_API_KEY`    | `675926826556394`                                                                                   |
| `CLOUDINARY_API_SECRET` | `PsimoRFmp3kZWomUm4Jpew7EG7c`                                                                       |

_Note: You do NOT need `VITE_API_BASE_URL` anymore because the frontend is served from the same domain as the backend._

---

### Why were you seeing port 5173?

Because you likely had the "Start Command" set to `npm run dev` or a default that triggered Vite. Using **`npm start`** with my updated code will make it run on Render's assigned port (usually 10000) and serve everything perfectly.
