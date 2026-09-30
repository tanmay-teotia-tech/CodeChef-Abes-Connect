# </> CodeChef ABES Connect

**Event Management Website for the CodeChef Chapter at ABES Engineering College, Ghaziabad**

> A recruitment task submission — student/user facing website for the college's competitive programming and tech club.
> 
> **Live Demo:** Coming soon

---

## 🚀 Features

| Page | What it does |
|------|-------------|
| **Home** `/` | Hero with code window, about section, stats, upcoming events, featured event |
| **Events** `/events` | All events in a responsive grid, live search + category filter |
| **Register** `/register` | Registration form with validation, pre-selection via `?event=ID`, localStorage persistence |

- **Live search + category filter** — both work together, with a friendly empty state
- **Event pre-selection** — clicking "Register" on any event card opens the form with that event pre-selected
- **Client-side validation** — inline red error messages for all required fields
- **Duplicate check** — blocks re-registering the same email for the same event
- **Registrations saved** in `localStorage` under the key `registrations`
- **Fully responsive** — tested at 360px, 768px, 1280px+
- **Hamburger menu** on mobile
- **ScrollToTop** — every route change opens at the top
- **SPA redirects** — `public/_redirects` (Netlify) + `vercel.json` prevent 404s on page refresh

---

## 🛠 Tech Stack

| Tool | Why |
|------|-----|
| React + Vite | Fast dev server, simple setup |
| react-router-dom | Client-side routing (BrowserRouter) |
| Plain CSS | Full control, no external UI library |
| Google Fonts | JetBrains Mono (headings) + Inter (body) |
| localStorage | Zero-backend registration storage |

---

## 📁 Folder Structure

```
src/
  components/
    Navbar.jsx        ← sticky nav with hamburger collapse
    Footer.jsx        ← dark footer with quick links
    EventCard.jsx     ← reusable card for any event
    SearchFilter.jsx  ← search input + category dropdown
    ScrollToTop.jsx   ← resets scroll on route change
  pages/
    Home.jsx          ← landing page (hero, about, stats, upcoming, featured)
    Events.jsx        ← full events grid with search + filter
    Register.jsx      ← registration form with validation
  data/
    events.js         ← ⭐ all event data lives here — edit this file
  utils/
    helpers.js        ← date formatting, localStorage helpers
  App.jsx             ← BrowserRouter + Routes
  main.jsx            ← React entry point
  index.css           ← CSS design system (variables, all component styles)
public/
  _redirects          ← Netlify SPA redirect
vercel.json           ← Vercel SPA rewrite
index.html            ← HTML entry point
```

---

## ⚡ How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ✏️ What You Should Customise

### 1. Events — `src/data/events.js`
Edit the events array to add real upcoming events. Each event has:
```js
{
  id: 1,                         // unique number
  name: "Event Name",
  date: "2026-10-05",            // YYYY-MM-DD
  time: "10:00 AM – 1:00 PM",
  venue: "Computer Lab 3, Block C",
  description: "Short 1–2 line description.",
  category: "Bootcamp",          // Contest | Hackathon | Workshop | Seminar | Bootcamp
  featured: false,               // exactly ONE event should be true
}
```

### 2. Stats — `src/pages/Home.jsx`
At the top of the file, update the `STATS` array:
```js
const STATS = [
  { number: "350+", label: "Club Members" },
  // ...
];
```

### 3. Colours — `src/index.css`
All colours are CSS variables in the `:root` block at the top of `index.css`.
The main ones to change:
```css
--clr-brand:      #e07b39;  /* primary orange accent */
--clr-brand-dark: #c4622a;  /* hover state */
--clr-hero-bg:    #1a1008;  /* dark hero background */
```

### 4. Club name / college — `src/components/Navbar.jsx` and `Footer.jsx`
Update the logo text and college name in both files.

---

## 🧪 Tested Scenarios

- [x] All navbar links work on desktop and mobile
- [x] Hamburger opens and closes mobile nav
- [x] Live search filters events (case-insensitive)
- [x] Category dropdown filters events
- [x] Search + filter work together
- [x] "No events found" empty state with Clear Filters button
- [x] Register button on any card pre-selects that event
- [x] `/register?event=4` opens with correct event pre-selected
- [x] `/register?event=999` opens safely with no pre-selection and no crash
- [x] All validation rules (name, email, college, year, phone, event, handle)
- [x] Successful registration saves to localStorage and shows success banner
- [x] Duplicate registration (same email + event) is blocked with a clear message
- [x] Page refresh on `/`, `/events`, `/register` — no 404 (with `_redirects` / `vercel.json`)
- [x] Layouts at 360px, 768px, 1280px — no overflow or broken elements
- [x] `npm run build` — zero errors and zero warnings

---

## 🎨 Design Decisions

- **Warm brown + orange palette** — coding club "terminal meets chef" vibe without being corporate
- **JetBrains Mono** for headings and logo — monospace gives the coder aesthetic
- **`// comment`-style section labels** — a fun coding-culture touch throughout
- **Category colour strips** — each card has a thin coloured top border matching its category
- **No external images** — all visuals use CSS, gradients and emoji (no broken image risks)
- **Code window in hero** — shows a simple factorial snippet with syntax highlighting via `<span>` coloured classes
