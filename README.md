# CodeChef ABES Connect

CodeChef ABES Connect is a React + Vite website for the CodeChef technical and coding club at ABES Engineering College, Ghaziabad. It shows upcoming club events, lets students search and filter activities quickly, and includes a local registration form that saves entries in the browser.

## Features

- Home page with club intro, stats, upcoming events, and a featured event
- Events page with live search and category filtering
- Register page with event preselection using `?event=ID`
- Client-side validation and duplicate registration checks
- Registration persistence in localStorage (`registrations` key)
- Responsive layout with mobile navigation

## Tech Stack

- React
- Vite
- react-router-dom
- Plain CSS
- localStorage (no backend)

## Folder Structure

```text
src/
  components/
    EventCard.jsx
    Footer.jsx
    Navbar.jsx
    ScrollToTop.jsx
    SearchFilter.jsx
  data/
    events.js
  pages/
    Events.jsx
    Home.jsx
    Register.jsx
  utils/
    helpers.js
  App.jsx
  index.css
  main.jsx
public/
  _redirects
  favicon.svg
index.html
vercel.json
```

## How to Run

```bash
npm install
npm run dev
npm run build
```

Live Demo: coming soon

## What I learned

While building this, I got much better at structuring small React components and keeping routes simple. I also learned how small UX details—like focus states, validation messages, and responsive spacing—make a big difference for real users. Handling localStorage safely with fallbacks was another useful lesson for beginner-friendly frontend projects.
