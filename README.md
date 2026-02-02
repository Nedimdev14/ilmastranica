# Da li Ilma smrdi? 💖

A fun prank page — deploy it and send Ilma the link!

---

## Deploy and get a link (choose one)

### Option 1: Vercel (easiest, free, ~2 minutes)

1. **Push your project to GitHub**
   - Create a new repo on [github.com](https://github.com/new) (e.g. `ilmasmrad`).
   - In your project folder run:
   ```bash
   git init
   git add .
   git commit -m "Prank page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name.)

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub.
   - Click **Add New** → **Project**.
   - Select your repo and click **Import**.
   - Click **Deploy** (no settings to change).
   - When it finishes, you get a link like `https://ilmasmrad.vercel.app`.

3. **Send that link to Ilma.**

---

### Option 2: Netlify Drop (no GitHub, no account for first deploy)

1. **Build the site**
   ```bash
   npm install
   npm run build
   ```
   This creates an **`out`** folder.

2. **Upload**
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop).
   - Drag and drop the **`out`** folder onto the page.
   - Netlify will give you a link (e.g. `https://random-name-123.netlify.app`).

3. **Send that link to Ilma.**

---

## Run locally first

To test before deploying:

```bash
npm install
npm run build
npm run preview
```

Then open [http://localhost:3000](http://localhost:3000). You should see “Da li Ilma smrdi?” and the DA / ne buttons. If you see “To get started, edit the page.tsx file”, you’re in the wrong folder or wrong project — make sure you’re in the `ilmasmrad` project and ran the commands above.

---

## Summary

| Method        | Steps                          | You get                          |
|---------------|---------------------------------|----------------------------------|
| **Vercel**    | Push to GitHub → Import → Deploy | Link like `xxx.vercel.app`       |
| **Netlify**   | Build → Drag `out` to Netlify Drop | Link like `xxx.netlify.app`   |

Easiest: use **Vercel** with GitHub, then send Ilma the link.
