# Aliyah Zaizay — Portfolio

React + Vite portfolio with a journal hero, desktop Notes for About, and dark project playlists. Includes scroll pop-ins, photo tilt/flip, swipe navigation, and reduced-motion support.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Open the URL printed by Vite. React requires this development server; opening `index.html` directly will not run the app.

## Build and preview

```sh
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Editing

- `src/components/Hero.jsx`: intro, contact links, photo placeholder.
- `src/components/About.jsx`: About notes and work experience.
- `src/components/Projects.jsx`: playlist UI, swipe gestures, project details.
- `src/data/projects.js`: project descriptions, links, images, playlist ordering.
- `src/components/Navigation.jsx` and `Footer.jsx`: site navigation and contacts.
- `src/styles.css`: shared styles and responsive layouts.
- `src/motion.js`: animations and reduced-motion behavior.
- `public/assets/`: static files, including the current resume and project images.

The photo remains a placeholder. New static asset links should use `assetUrl()` so they work under the GitHub Pages repository path.

## GitHub Pages

Vite is configured with `/Portfolio-Website/` as the base URL. In repository **Settings → Pages → Source**, select **GitHub Actions** before deploying. The included workflow builds and publishes `dist/` on pushes to `main`, or on a manual workflow run.

Deployment URL: https://aliyahkzaizay.github.io/Portfolio-Website/

The root `assets/` directory retains older source files; the React application serves static files from `public/assets/`. `idk.html` is an existing draft and is not part of the app.
