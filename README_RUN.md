# How to run

This project uses **Create React App (react-scripts 5)** and React 18.

## Steps

1. Ensure Node.js 18 LTS or 20+ is installed.
2. In the project folder, run:
   ```bash
   npm install
   npm start
   ```

The app will be available at http://localhost:3000

## Notes
- I updated `react` and `react-dom` to `18.2.0` to be compatible with `react-scripts@5`.
- `src/App.js` now renders your `Components/ArticlePage` component directly.
- Keep `src/Main.jsx` unused (CRA uses `src/index.js` as the entry). You can delete `src/Main.jsx` if you want.
