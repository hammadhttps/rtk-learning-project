## Redux Toolkit Learning Project (React + Vite + Tailwind)

This is a simple learning project to practice state management with Redux Toolkit. It shows how to use `configureStore`, `createSlice`, reducers, actions, and selectors in a small React app.

### What this project demonstrates
- **configureStore**: Combines slice reducers in `src/store/store.js`.
- **Slices**: Feature-based state using `createSlice`.
  - `src/app/features/auth/authSlice.js`
  - `src/app/features/posts/postSlice.js`
  - `src/app/features/stories/storiesSlice.js`
- **Reducers & actions**: Defined in each slice and exported for use in components.
- **Selectors**: Simple functions to read from the store (e.g., `selectCurrentUser`, `selectAllposts`, `selectAllStories`).
- **UI**: React components styled with Tailwind CSS.

### Tech stack
- React + Vite
- Redux Toolkit + React Redux
- Tailwind CSS

### Run locally
1. Install dependencies
   - `npm install`
2. Start the dev server
   - `npm run dev`
3. Build for production (optional)
   - `npm run build`
4. Preview production build (optional)
   - `npm run preview`

### Project structure (key files)
- `src/store/store.js`: Creates the Redux store with `configureStore` and registers slice reducers.
- `src/app/features/auth/authSlice.js`: Auth slice and `selectCurrentUser` selector.
- `src/app/features/posts/postSlice.js`: Posts slice with actions like `postAdded`, `postLiked`, `commentAdded`.
- `src/app/features/stories/storiesSlice.js`: Stories slice and `selectAllStories` selector.
- `src/main.jsx`: Wraps the app in `<Provider store={store}>`.

### How to add a new slice (simple steps)
1. Create a new file under `src/app/features/<feature>/<feature>Slice.js`.
2. Use `createSlice({ name, initialState, reducers })` and export the actions and reducer.
3. Register the reducer in `src/store/store.js` under `reducer: { ... }`.
4. Create selectors to read data from the slice state.

That’s it — this project is just for learning Redux Toolkit basics with a small, readable setup.
